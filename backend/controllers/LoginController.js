const db = require("../db");
const jwt = require("jsonwebtoken")

const LoginController = (req, res) => {
  try {
    const { username, password } = req.body;
    let sql = "SELECT * FROM admin where name = ? ";
    db.query(sql, [username], (err, result) => {
        if (err) throw err;
        if (result.length <= 0) {
          return res
            .status(401)
            .json({
              message: "Incorrect Username",
              succuss: false,
            });
          } else {
          db.query('select * from admin where password = ? ', [password], (err,result)=>{
            if(err) throw err
            if(result.length <= 0){
              return res
              .status(401)
              .json({ message: "incorrect Password", success: false }); 
            }
            else{
              // jwt token creation
              let payload = {username, password}
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
            
        }
      });
    } catch (error) {
      return res.status(500).json({ message: error.message, succuss: false });
    }
  }


module.exports = LoginController