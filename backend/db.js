const mysql = require("mysql")

const dotenv = require("dotenv")
dotenv.config()

const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
})
db.connect((err)=>{
    if(err){
        throw err
    }
    else{     
        console.log("DB is connected")
    }
})

// table creation
db.query('CREATE TABLE IF NOT EXISTS admin (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), password VARCHAR(100) )')
db.query('CREATE TABLE IF NOT EXISTS developers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), password VARCHAR(100) )')
db.query(
    'CREATE TABLE IF NOT EXISTS JIRA_ticket ( id INT AUTO_INCREMENT PRIMARY KEY, ticket_name VARCHAR(100), jira_id int unique, iris_id int unique, description VARCHAR(200), status int default 0, created_at date,developer_id int,foreign key(developer_id) references developers(id));'
)


module.exports = db
