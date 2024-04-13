const mysql = require('mysql2')
const db = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root", // Enter your local server username here
    password: "CFG2023!", // Enter your local server password here
    database: "pipdb",
  });

module.exports = db;