import "dotenv/config"

const jwt = require("jsonwebtoken")

const prefix: string = "Bearer "

const timeToExpirate: string = '5h'

const createToken = (email: string): string => {
    return jwt.sign({email: email}, process.env.TOKEN_SECRET, { expiresIn: timeToExpirate })
}

const validToken = (token: string | undefined)=> {

    if(token == null || token == "")
        return null

    if(token.startsWith(prefix)) {
        const clearToken:string = token.slice(prefix.length)
        return jwt.verify(clearToken, process.env.TOKEN_SECRET as String, (err: any, user: string): string | null => {
            if (err) {
                console.log(err)
                return null
            }
            return user
        })
    }else {
        return null
    }
}

module.exports = {
    createToken,
    validToken
}