const mysql = require('mysql2')
const db = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "username", // Enter your local server username here
    password: "password", // Enter your local server password here
    database: "database_name",
  });

module.exports = db;
