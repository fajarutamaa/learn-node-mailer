const bcrypt = require('bcrypt')

function HashPassword(password){

    const saltRounds = 2
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

function HashToken(token){

    const saltRounds = 2
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(token, salt)
    return hash
}

function ComparePassword(password, HashPassword){
    const compare = bcrypt.compareSync(password, HashPassword)
    return compare
}


module.exports ={
    HashPassword,
    ComparePassword,
    HashToken,
}