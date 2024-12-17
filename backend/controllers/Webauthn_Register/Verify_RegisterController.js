const {verifyRegistrationResponse} = require("@simplewebauthn/server")
const {hashPass} = require("../../middleware/bcrypt.controller")
const db = require("../../db");

require("dotenv").config()


let RP_ID = "localhost"


const Verify_RegisterController = (req,res)=>{
    const regId = JSON.parse(req.cookies.RegId)
    const { username, email, password } = JSON.parse(req.cookies.user)

    const {registerJson} = (req.body)
    const verification = verifyRegistrationResponse({
      response : registerJson,
      expectedChallenge : regId.challenge,
      expectedOrigin : process.env.CLIENT_URL,
      expectedRPID : RP_ID
    })
    verification.then((data)=>{
      if(data.verified){
        let BufferPubliKey = Buffer.from(data.registrationInfo.credential.publicKey).toString('base64')
        // password hashing
        let hashPassword = hashPass(password);
        // user created
          let sql = "insert into admin (name, email, password, creditional_id, public_Key, counter, deviceType, backup, transport) values (?)";
          let values = [
            username,
            email, 
            hashPassword, 
            data.registrationInfo.credential.id, 
            BufferPubliKey, 
            data.registrationInfo.credential.counter, 
            data.registrationInfo.credentialDeviceType, 
            data.registrationInfo.credentialBackedUp,
            data.registrationInfo.credential.transports
          ];
          
          db.query(sql, [values], (err) => {
            if (err) {
              console.log(err)
              return res
              .status(500)
              .json({ message: err.message, success: false });
            } else {
              return res
                      .status(201)
                      .json({ message: "admin created", success: true});
            }
          });
    }
   })
}

module.exports = Verify_RegisterController;