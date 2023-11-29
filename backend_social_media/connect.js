const mysql = require('mysql2');

 const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '28072001@Abc',
    database: 'social_media'
})

module.exports = db;