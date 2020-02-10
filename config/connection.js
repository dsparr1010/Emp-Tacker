const mysql = require('mysql');

let connection;

require('dotenv').config();

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE
    });
}
  
  connection.connect((err) => {
    if (err) throw err;
     console.log("connected as id " + connection.threadId + "\n");
  });

  module.exports = connection;