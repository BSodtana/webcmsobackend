const express = require("express");
const router = express.Router();
const db = require("../../../config/db")
const verifyJwt = require("../../utils/jwtVerify");
const bcrypt = require("bcrypt")

// ____/v1/user-management/credential/

router.put("/", async (req,res)=>{
    let token = req.header("Authorization")
    let {old_password, new_password} = req.body 
    try{
        let verify = await verifyJwt(token)
        if(verify.isAuthenticated){
            let uuid = verify.data.uuid
            try{
                let query = await db.query("SELECT password FROM users WHERE uuid = ? LIMIT 1", [uuid])
                let compare = await bcrypt.compare(old_password, query[0].password)
                if(!compare) res.status(200).json({success: false, reason: "OLD_PASSWORD_MISMATCH"})
                if(compare){
                    try {
                        let salt = await bcrypt.genSalt(10)
                        let password = await bcrypt.hash(new_password,salt)
                        let change = await db.query("UPDATE users SET password = ?, createdDateTime = NOW() WHERE uuid = ? LIMIT 1", [password, uuid])
                        res.status(200).json({success: true})
                    }catch(err){
                        throw err
                    }
                }
            }catch(err){
                console.log(err)
                res.status(500).json(err)
            }
        }
        if(!verify.isAuthenticated) res.status(401).json({isAuthenticated: false, data: "", reason: "Unauthorized access"})
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;