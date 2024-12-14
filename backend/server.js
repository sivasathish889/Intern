const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const db = require("./db")
const Routes = require("./routes")
const cors = require("cors")
const Logger = require("./middleware/logger")

// PORT
const PORT = process.env.PORT || 5000

// environment data
dotenv.config({path: "./.env"})

// CORS
const corsOptions ={
    origin:'http://localhost:5174', 
    credentials:true,         
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// db Connection
db

// middleware
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// custom middleware for activity logging
app.use(Logger)


// Routes
app.use("/", Routes)


app.listen(PORT, ()=>{
    console.log(`Server is running http://localhost:${PORT} `)
})