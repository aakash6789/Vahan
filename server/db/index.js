import mysql from 'mysql2/promise';
import {DB_NAME} from '../constants.js'
import dotenv from 'dotenv'
import path from 'path'
const __dirname = path.dirname(new URL(import.meta.url).pathname);
// const envPath = path.join(__dirname, '../.env');
const envPath = '../.env';
dotenv.config({ path: envPath });
const connection =  mysql.createPool({
    host: `${process.env.MYSQL_HOST}`,
    user: `${process.env.MYSQL_USER}`,
    password: `${process.env.MYSQL_PASSWORD}`,
    database: `${DB_NAME}`
})

// const result=await connection.query("SELECT * FROM bonus");
const result=connection.execute(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`)
.then(([rows, fields]) => {
    console.log('Database created or already exists');
})
.catch((err) => {
    console.error('Error creating database:', err);
})


// console.log(result);
// const result= await connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL database:', err);
//         return;
//     }
//     console.log('Connected to MySQL database');
// });
process.on('SIGINT', () => {
    connection.end();
    process.exit();
});

export default connection;