'use strict';
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nutech_integrasi_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }

    console.log('Connected to the database with ID : ', connection.threadId);
});

module.exports = connection;