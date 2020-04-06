require("dotenv").config();
const mysql = require("mysql");

const pool = mysql.createPool({
  multipleStatements: true,
  connectionLimit: process.env.DB_POOL_LIMIT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  // charset: "utf8mb4_unicode_ci",
});

module.exports = pool;
