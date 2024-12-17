const { generateRegistrationOptions } = require("@simplewebauthn/server")
const db = require("../../db");


require("dotenv").config()

let RP_ID = "localhost"



const webauthn_intial_register = async (req,res)=>{
    try {
    
       let { username,email, password, c_password } = req.body
    if (password === c_password) {

     db.query('select * from admin where name = ?',[username],async (err,result)=>{
        if(err) throw err
        if(result.length > 0){
            return res.status(400).json({"message" : "username is Already exists", "success" : false})
        }
        else{
            const options = await generateRegistrationOptions({
                rpID : RP_ID,
                rpName : "shiva",
                userName : username
            })
            let payload = {
                username,
                email,
                password
            }
                res.cookie("RegId",JSON.stringify( {
                    userId : options.user.id,
                    username,
                    challenge : options.challenge
                }),{maxAge :60000})
                 res.cookie("user",JSON.stringify(payload) ,{maxAge :60000} )
                return res.json(options)
        }
        
    })

} else {
    return res
      .status(500)
      .json({ "message": "Password Does Not Match", success: false });
  }

   } catch (error) {
        return res
                .status(500)
                .json({"message" : error.message})
   }
}

module.exports = webauthn_intial_register;