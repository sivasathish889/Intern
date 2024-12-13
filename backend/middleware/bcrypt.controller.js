const bcrypt = require("bcrypt")

const hashPass = (pas)=>{
    return bcrypt.hashSync(pas, 10)
}
const comparePass = (pas, hash)=>{
    return bcrypt.compareSync(pas, hash)
}


module.exports = { hashPass, comparePass}