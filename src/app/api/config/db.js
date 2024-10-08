import mysql from 'mysql2'; // Import mysql2 instead of mysql

// Create a connection using mysql2
const DB = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

// Connect to the MySQL database and handle connection errors
DB.connect(err => {
    if (err) {
        console.error("Error connecting to MySql database:", err.message); // Improved error message
    } else {
        console.log("Connected to MySql Database");
    }
});

export default DB;
