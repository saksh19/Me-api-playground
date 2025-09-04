import mysql from "mysql2/promise";

// Railway already injects vars, no need for .env path override
const cfg = {
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT || 3306,
};

if (!cfg.host) {
  console.error("❌ MySQL env vars missing! Check Railway Variables tab.");
}

export const pool = mysql.createPool({
  ...cfg,
  waitForConnections: true,
  connectionLimit: 10,
});
