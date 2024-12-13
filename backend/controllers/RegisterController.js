const { hashPass} = require("../middleware/bcrypt.controller")
const db = require("../db")
const json = require("jsonwebtoken")
require("dotenv").config()

const registerController = async (req, res) => {
    const { username, email, password, c_password } = req.body;
    let sql = "select email from developers where email = ?";
    db.query(sql, [email], (err, result) => {
      if (err) {
          return res
            .status(500)
            .json({ message: err.message, success: false });
      }
      // If check user email is available
      if (result.length > 0) {
        return res
          .status(500)
          .json({ message: "Email already exists", success: false });
      } else {
        if (password === c_password) {
          // password hashing 
          let hashPassword = hashPass(password);
          let sql = "insert into developers (name,email,password) values (?)";
          let values = [username, email, hashPassword];
          db.query(sql, [values], (err) => {
            if (err) {
              return res
                .status(500)
                .json({ message: err.message, success: false });
            } else {
              return res
                      .status(201)
                      .json({ message: "Deve created", success: true});
            }
          });
        } else {
          return res
            .status(500)
            .json({ message: "Password Does Not Match", success: false });
        }
      }
    });
  }


module.exports = registerController