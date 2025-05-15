const mysql = require('mysql2/promise');
require('dotenv').config();

let pool;

const connectDB = async () => {
    try {
        pool = mysql.createPool({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB,
            waitForConnections: true,      // Wait for available connection when all are busy
            connectionLimit: 10,           // Max number of connections allowed in the pool
            queueLimit: 0                  // Unlimited queue length
        });
        const [rows] = await pool.execute('SELECT 1');
        console.log(' MySQL connected (plain)');
    } catch (err) {
        console.error(' MySQL connection failed:', err.message);
        process.exit(1);
    }
};

const getPool = () => pool;

module.exports = { connectDB, getPool };