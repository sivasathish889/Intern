const express = require("express");
const Router = express.Router();

const db = require("./db");
const LoginController = require("./controllers/LoginController");
const HomeController = require("./controllers/HomeController");
const RegisterController = require("./controllers/RegisterController");
const TicketPostController = require("./controllers/TicketController");
const Verify_RegisterController = require("./controllers/Verify_RegisterController");
const webauthn_Intial_Register = require("./controllers/webauthn_Intial_Register");
const {verifyRegistrationResponse} = require("@simplewebauthn/server")
require("dotenv").config()

let RP_ID = "localhost"

Router.get("/", HomeController)
Router.post("/login", LoginController);
Router.post("/",TicketPostController)
Router.post("/register", RegisterController)
Router.post("/init-register", webauthn_Intial_Register)
Router.post("/verify-register", Verify_RegisterController)

// Router.post("/init-register",(req,res)=>{
//     let { username,email, password, c_password } = req.body

//    try {
//     if (password === c_password) {

//     db.query('select * from admin where name = ?',[username],(err,result)=>{
//         if(err) throw err
//         if(result.length > 0){
//             return res.status(400).json({"messsage" : "username is Already exists"})
//         }
//         const options = generateRegistrationOptions({
//             rpID : RP_ID,
//             rpName : "shiva",
//             userName : username
//         })
//         let payload = {
//             username,
//             email,
//             password
//         }

//         options.then((data)=>{
//             res.cookie("RegId",JSON.stringify( {
//                 userId : data.user.id,
//                 username,
//                 challenge : data.challenge
//             }),{httpOnly: true, maxAge :60000,secure:true})
//             res.cookie("user",JSON.stringify(payload) )
//             return res.json(data)
//         })
        
//     })

// } else {
//     return res
//       .status(500)
//       .json({ message: "Password Does Not Match", success: false });
//   }

//    } catch (error) {
//         return res
//                 .status(500)
//                 .json({"message" : error.message})
//    }
// })


// Router.post("/verify-register",(req,res)=>{
//     const regId = JSON.parse(req.cookies.RegId)
//     const { username, email, password } = JSON.parse(req.cookies.user)

//     const {registerJson} = (req.body)

//     const verification = verifyRegistrationResponse({
//         response : registerJson,
//         expectedChallenge : regId.challenge,
//         expectedOrigin : process.env.CLIENT_URL,
//         expectedRPID : RP_ID
//     })
//     verification.then((data)=>{
//     if(data.verified){
//         // password hashing
//         let hashPassword = hashPass(password);
//         // user created
//           let sql = "insert into admin (name,email,password) values (?)";
//           let values = [username, email, hashPassword];
//           db.query(sql, [values], (err) => {
//             if (err) {
//               return res
//                 .status(500)
//                 .json({ message: err.message, success: false });
//             } else {
//               return res
//                       .status(201)
//                       .json({ message: "admin created", success: true});
//             }
//           });
//     }
//    })
// })


module.exports = Router;
