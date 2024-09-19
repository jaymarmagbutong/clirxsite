import mysql from 'mysql'

const DB = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});


DB.connect(err => {
    if(err){
        console.log("Error connecting to MySql database", err);
    } else {
        console.log("Connected to MySql Database");
    }
})

export default DB