const db = require("../db");
const jwt = require("jsonwebtoken")
require("dotenv").config()

const HomeController = async (req, res) => {

    try {
      let cookie_token = req.cookies.token
      if(!cookie_token){
        return res
                  .status(400)
                  .json({"message" : "Please login", success : false})
      }
      else{
        let verify = jwt.verify(cookie_token,process.env.JWT_STRING)
        db.query('select * from admin where name = ? AND password = ?', [verify.username, verify.dbPass],(err,result)=>{
          if(err) throw err
          if(result.length < 0){
            return res
                      .status(400)
                      .json({"message" : "Please login", success : false})
          }
          else{
            db.query('select * from jira_ticket ', (err, db_ticket) => {
              if (err) throw err;

              db.query('select * from developers ', (err, db_dev_data) => {
                if (err) throw err;

                const dev_data = JSON.parse(JSON.stringify(db_dev_data));
                const user = JSON.parse(JSON.stringify(result));
                const ticket_data = JSON.parse(JSON.stringify(db_ticket));
                return res
                  .status(200)
                  .json({ "user": user[0], "ticket_data": ticket_data, 'dev_data': dev_data, "success" :true });
              });
            })
          }
        })
      }
    } catch (error) {
        return res
                  .status(400)
                  .json({"message" : error.message, success : false})
    }
  
  }

module.exports = HomeController