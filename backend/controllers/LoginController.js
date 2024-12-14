const db = require("../db");
const jwt = require("jsonwebtoken")
const {comparePass} = require("../middleware/bcrypt.controller")

const LoginController = (req, res) => {
  try {
    const { username, password } = req.body;

      db.query('select * from admin where name = ?', [username],(err,result)=>{

        let dbToJson =JSON.parse(JSON.stringify(result))
            let dbPass = dbToJson[0].password
            let hashingPass = comparePass(password, dbPass)
            
            if(!hashingPass){
              return res
              .status(401)
              .json({ message: "incorrect Password", success: false }); 
            }
            else{
              // jwt token creation
              let payload = {username, dbPass}
              const token = jwt.sign(payload, process.env.JWT_STRING)
              
              let cookieOptions = { 
                maxAge: 30 * 24 * 60 * 60 * 1000, // would expire after 30 days
                httpOnly: true, 
              }
              // cookie set
              res.cookie("token",token, cookieOptions)
              return res
                .status(200)
                .json({ message: "Login Successfully", success: true })

            }
          })
    } catch (error) {
      return res.status(500).json({ message: error.message, succuss: false });
    }
  }


module.exports = LoginController