import "dotenv/config"

const jwt = require("jsonwebtoken")

const prefix: string = "Barear "

const timeToExpirate: string = '5h'

const createToken = (email): string => {
    return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIN: timeToExpirate})
}

const validToken = (token: string | undefined): string => {
    if(token == undefined || token == "")
        return ""

    if(token.startsWith(prefix)) {
        const clearToken:string = token.slice(prefix.length)

        jwt.verify(clearToken, process.env.TOKEN_SECRET, (err:any, user:string): string => {
            if(err){
                console.log(err)
                return ""
            }

            return user
        })
    }else {
        return ""
    }
}

module.exports = {
    createToken,
    validToken
}