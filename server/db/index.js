const mysql = require("mysql");

const con = mysql.createConnection({
  //TODO env variable !!
  host: "localhost",
  user: "root",
  password: "root",
  database: "matcha"
});

module.exports = con;
