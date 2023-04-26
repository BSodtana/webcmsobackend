const express = require("express");
const router = express.Router();
const db = require("../../../config/db")
const verifyJwt = require("../../utils/jwtVerify");

// ____/v1/user-management/login/jwt/

router.get("/", async (req,res)=>{
    let token = req.header("Authorization")
    try{
        let verify = await verifyJwt(token)
        if(verify.isAuthenticated){
            try{
                let query = await db.query("SELECT title, first_name, middle_name, last_name, student_id, access_level FROM users WHERE uuid = ? LIMIT 1", [verify.data.uuid])
                if(query.length===1) res.status(200).json({isAuthenticated: true, data: query[0], reason: null})
                if(query.length===0) res.status(400).json({isAuthenticated: false, data: "", reason: "cannot find user based on uuid from token, suspect malfored token."})
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