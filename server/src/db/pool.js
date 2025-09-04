import dotenv from 'dotenv';
import mysql from "mysql2/promise";

dotenv.config({ path: '../.env' });



const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

export const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER ,
  password: process.env.DB_PASS ,
  database: process.env.DB_NAME || 'me_api',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
