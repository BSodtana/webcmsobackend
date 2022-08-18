const express = require("express");
const router = express.Router();
const db = require("../../../config/db")

// ____/v1/user-management/data/

router.get("/:uuid", async (req,res)=>{
    let {uuid} = req.params
    try{
        let fetch = await db.query("SELECT student_id, title, first_name, middle_name, last_name, current_year, uuid, nick_name, phone_number, line_id, facebook, instagram, medical_condition, allergy, email from users WHERE uuid = ? LIMIT 1", [uuid])
        if(fetch.length===1) res.status(200).json({success: true, data: fetch[0]})
        if(fetch.length===0) res.status(200).json({success: false, detail: "No user having this uuid"})
    }catch(err){
        res.status(500)
        console.error(err)
    }
})

router.get("/covid/:uuid", async (req,res)=>{
    let {uuid} = req.params
    try{
        let vaccine = await db.query("SELECT owner_uuid, type, dose, date FROM user_vaccine WHERE owner_uuid = ?", [uuid])
        let infection = await db.query("SELECT owner_uuid, dose, date FROM user_infection WHERE owner_uuid = ?", [uuid])
        res.status(200).json({success: true, data: {vaccine: vaccine, infection: infection}})
    }catch(err){
        res.status(500)
        console.error(err)
    }
})

module.exports = router;