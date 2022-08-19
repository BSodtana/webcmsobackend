const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.DB_HOST || "172.29.25.167",
    user: process.env.DB_USERNAME || "cmsomed",
    password: process.env.DB_PASSWORD || "7NXaYmF8hiviH",
    database: process.env.DB_NAME || "e_cmso",
    connectionLimit: 5
});



// Connect and check for errors
pool.getConnection((err, connection) => {
    if(err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Database connection lost');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Database has too many connection');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('Database connection was refused');
        }
    }
    if(connection) connection.release();

    return;
});

module.exports = pool;