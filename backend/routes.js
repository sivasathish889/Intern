const express = require("express");
const Router = express.Router();

const db = require("./db");
const LoginController = require("./controllers/LoginController");
const HomeController = require("./controllers/HomeController");
const TicketPostController = require("./controllers/TicketController");
const Webauthn_Intial_Register = require("./controllers/Webauthn_Register/webauthn_Intial_Register");
const Verify_RegisterController = require("./controllers/Webauthn_Register/Verify_RegisterController");
// const Webauthn_Intial_Login = require("./controllers/Webauthn_Login/Webauthn_inital_Login")
// const Verify_loginController = require("./controllers/Webauthn_Login/Verify_loginController")
require("dotenv").config()
const {generateAuthenticationOptions} = require("@simplewebauthn/server")

Router.get("/", HomeController)
Router.post("/login", LoginController);
Router.post("/",TicketPostController)
Router.post("/init-register", Webauthn_Intial_Register)
Router.post("/verify-register", Verify_RegisterController)
// Router.post("/inital_login", Webauthn_Intial_Login)
// Router.post("/verify-login", Verify_loginController)

let RP_ID = "localhost"

Router.post("/init-login",(req,res)=>{
    try {
    
        let { username, password } = req.body
 
      db.query('select * from admin where name = ?',[username],async (err,result)=>{
         if(err) throw err
         if(result.length < 0){
             return res.status(400).json({"messsage" : "Invalid Username", "success" : false})
         }
         else{
            let db_data = JSON.parse(JSON.stringify(result))[0]
            const options = await generateAuthenticationOptions({
                rpID : RP_ID,
                allowCredentials : [{
                    id : db_data.creditional_id,
                    transports : db_data.transport
                }]
            })
             let payload = {
                 username,
                 password
             }
                res.cookie("authInfo",JSON.stringify( {
                     userId : options.allowCredentials.id,
                     username,
                     challenge : options.challenge
                 }),{maxAge :60000})

                res.cookie("login-user",JSON.stringify(payload) ,{maxAge :60000} )
                 return res.json(options)
         }
     })
 
    } catch (error) {
         console.log(error)
    }

})

Router.post("/verify-login",(req,res)=>{
    const {LoginJson} = req.body
    console.log(LoginJson)
    console.log(req.body)
})

module.exports = Router;
