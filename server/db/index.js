require("dotenv").config();
const mysql = require("mysql");

const con = mysql.createConnection({
  //TODO env variable !!
  multipleStatements: true,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME
});

module.exports = con;
