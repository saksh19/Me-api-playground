import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config(); // default root/.env read karega

// Railway provides MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT
const cfg = {
  host: process.env.MYSQLHOST || "127.0.0.1",
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "",
  database: process.env.MYSQLDATABASE || "me_api",
  port: process.env.MYSQLPORT || 3306,
};

export const pool = mysql.createPool({
  host: cfg.host,
  user: cfg.user,
  password: cfg.password,
  database: cfg.database,
  port: cfg.port,
  waitForConnections: true,
  connectionLimit: 10,
});
