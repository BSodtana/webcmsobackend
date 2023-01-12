const db = require("../../config/db")
const JS_PRIVATE_KEY = require("../../config/private")
const jwt = require("jsonwebtoken")

async function verifyJwt(token){
    if(!token) return {isAuthenticated: false, data: null, reason: "jwt must be provided"}
    try{
        let findLogout = await db.query("SELECT uuid FROM user_logout WHERE jwt = ? LIMIT 1", [token])
        if(findLogout.length === 1) return {isAuthenticated: false, data: null, reason: `USER_LOGGED_OUT`}
        if(findLogout.length === 0) {
            try{
                let verify = jwt.verify(token, JS_PRIVATE_KEY)
                return {isAuthenticated: true, data: verify, reason: null}
            }catch(err){
                throw (err)
            }
        }
    }catch (err){
        return {isAuthenticated: false, data: null, reason: err}
    }
}

module.exports = verifyJwt