const mysql = require('mysql');
const db = require('./db.config');

let connection;

require('dotenv').config();

connection = mysql.createConnection({
    host: db.HOST,
    user: db.USER,
    password: db.PASSWORD,
    database: db.DB
});

  
connection.connect((err) => {
if (err) throw err;
});

module.exports = connection;