const express = require("express");
const router = express.Router();
const db = require("../../../config/db")
const verifyJwt = require("../../utils/jwtVerify");

// ____/v1/user-management/affiliation/current/

router.get("/:id", async (req,res)=>{
    let {id} = req.params
    try{
        let data = await db.query('SELECT users.student_id, CONCAT(first_name," ", last_name) AS full_name, user_affiliation.affiliated_club, clubs.name FROM user_affiliation JOIN users ON users.student_id = user_affiliation.student_id JOIN clubs ON clubs.id = user_affiliation.affiliated_club WHERE user_affiliation.student_id = ?', [id])
        res.status(200).json({status: "success", payload: {list: data, affiliations: data.length}})
    }catch(err){
        console.log(err)
        res.status(500).json({status: "fail", reason: "err"})
    }
})

router.put("/", async (req,res)=>{
    let {student_id, club_id} = req.body
    if(!student_id || !club_id) res.status(400).json({status: "error", reason: "malfored request"})
    try{
        await db.query("INSERT INTO user_affiliation (student_id, affiliated_club) VALUES (?,?)", [student_id, club_id])
        res.status(200).json({status: "success"})
    }catch(err){
        res.status(500).json({status: "fail", reason: err})
    }
})

module.exports = router;