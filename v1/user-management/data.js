const express = require("express");
const router = express.Router();
const db = require("../../config/db")

// ____/v1/user-management/data/

router.get("/:uuid", async (req,res)=>{
    let {uuid} = req.params
    try{
        let fetch = await db.query("SELECT student_id, title, first_name, middle_name, last_name, current_year, uuid from users WHERE uuid = ? LIMIT 1", [uuid])
        if(fetch.length===1) res.status(200).json({success: true, data: fetch[0]})
        if(fetch.length===0) res.status(200).json({success: false, detail: "No user having this uuid"})
    }catch(err){
        res.status(500)
        console.error(err)
    }
})

module.exports = router;