// backend/db/init.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runSqlFile(connection, fileName) {
  const filePath = path.join(__dirname, fileName);
  const sql = fs.readFileSync(filePath, "utf-8");

  const statements = sql
    .split(";")
    .map((stmt) => stmt.trim())
    .filter((stmt) => stmt.length > 0);

  for (const stmt of statements) {
    try {
      await connection.query(stmt);
      console.log(`✅ Executed: ${stmt.substring(0, 60)}...`);
    } catch (err) {
      console.error(`❌ Error executing: ${stmt.substring(0, 60)}...`, err.message);
    }
  }
}

async function main() {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

  // Step 1: connect WITHOUT database
  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT || 3306,
    user: DB_USER,
    password: DB_PASS || "",
    multipleStatements: true,
  });

  try {
    console.log(`🔹 Ensuring database "${DB_NAME}" exists...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    await connection.query(`USE \`${DB_NAME}\`;`);

    console.log("🔹 Running schema.sql...");
    await runSqlFile(connection, "schema.sql");

    console.log("🔹 Running seed.sql...");
    await runSqlFile(connection, "seed.sql");

    console.log("🎉 Database initialized successfully");
  } catch (err) {
    console.error("❌ Error initializing database:", err.message);
  } finally {
    await connection.end();
    process.exit(0);
  }
}

main();
