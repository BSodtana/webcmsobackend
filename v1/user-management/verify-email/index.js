const express = require("express");
const router = express.Router();
const db = require("../../../config/db")

// ____/v1/user-management/login/

router.post("/",async (req,res)=>{
    let {uuid} = req.body
    try{
        await db.query("UPDATE users SET verified = ? WHERE uuid = ?", [1,uuid])
        res.status(200).json({status: "success", detail: "verify successful"})
    }catch(err){
        res.status(500).json({status: "error", detail: err})
    }
})
module.exports = router;