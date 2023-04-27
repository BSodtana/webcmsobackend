const express = require("express");
const router = express.Router();
const db = require("../../../config/db")
const verifyJwt = require("../../utils/jwtVerify");
const { v4 : uuidv4 } = require("uuid")

// ____/v1/user-management/affiliation/current/

router.get("/:student_id", async (req,res)=>{
    let token = req.headers.authorization
    let {student_id} = req.params
    if(!token) res.status(401).json({status: "401 UNAUTHORIZED"})
    let user = await verifyJwt(token)
    if(user.isAuthenticated){
        try{
            // let data = await db.query(`SELECT CONCAT(u.first_name," ", u.last_name) AS full_name, a.affiliation_type, a.affiliated_organization, COALESCE(c.name, d.name, dp.name) AS org_name FROM users u JOIN user_affiliation a ON u.student_id = a.student_id LEFT JOIN clubs c ON a.affiliation_type = 'CLUB' AND a.affiliated_organization = c.id LEFT JOIN divisions d ON a.affiliation_type = 'DIVISION' AND a.affiliated_organization = d.id LEFT JOIN departments dp ON a.affiliation_type = 'DEPARTMENT' AND a.affiliated_organization = dp.id WHERE u.student_id = ?`, [id])
            let data = await db.query(`SELECT CONCAT(u.first_name," ", u.last_name) AS full_name, a.affiliation_type, COALESCE(c.name, d.name, dp.name) AS org_name FROM users u JOIN user_affiliation a ON u.student_id = a.student_id LEFT JOIN clubs c ON a.affiliation_type = 'CLUB' AND a.affiliated_organization = c.id LEFT JOIN divisions d ON a.affiliation_type = 'DIVISION' AND a.affiliated_organization = d.id LEFT JOIN departments dp ON a.affiliation_type = 'DEPARTMENT' AND a.affiliated_organization = dp.id WHERE u.student_id = ?`, [student_id])
            // let data = await db.query('SELECT users.student_id, CONCAT(first_name," ", last_name) AS full_name, user_affiliation.affiliated_organization, clubs.name, clubs.type FROM user_affiliation JOIN users ON users.student_id = user_affiliation.student_id JOIN clubs ON clubs.id = user_affiliation.affiliated_organization WHERE user_affiliation.student_id = ?', [student_id])
            res.status(200).json({status: "success", payload: {list: data, afffiliations: data.length}})
        }catch(err){
            console.log(err)
            res.status(500).json({status: "error", reason: err})
        }
    }
})

router.get("/", async (req,res)=>{
    let token = req.headers.authorization
    if(!token) res.status(401).json({status: "401 UNAUTHORIZED"})
    let user_data = await verifyJwt(token)
    if(user_data){
        try{
            let id = user_data.data.student_id
            let data = await db.query(`SELECT CONCAT(u.first_name," ", u.last_name) AS full_name, a.affiliation_type, a.affiliated_organization, COALESCE(c.name, d.name, dp.name) AS org_name FROM users u JOIN user_affiliation a ON u.student_id = a.student_id LEFT JOIN clubs c ON a.affiliation_type = 'CLUB' AND a.affiliated_organization = c.id LEFT JOIN divisions d ON a.affiliation_type = 'DIVISION' AND a.affiliated_organization = d.id LEFT JOIN departments dp ON a.affiliation_type = 'DEPARTMENT' AND a.affiliated_organization = dp.id WHERE u.student_id = ?`, [id])
            // let data = await db.query('SELECT users.student_id, CONCAT(first_name," ", last_name) AS full_name, user_affiliation.affiliated_organization, clubs.name, clubs.type FROM user_affiliation JOIN users ON users.student_id = user_affiliation.student_id JOIN clubs ON clubs.id = user_affiliation.affiliated_organization WHERE user_affiliation.student_id = ?', [id])
            // let data = await db.query(`SELECT CONCAT(u.first_name," ", u.last_name), a.affiliation_type, c.name AS org_name FROM users u JOIN user_affiliation a ON u.student_id = a.student_id LEFT JOIN clubs c ON a.affiliation_type = 'CLUB' AND a.affiliation_id = c.id LEFT JOIN divisions d ON a.affiliation_type = 'DIVISIONS' AND a.affiliation_id = d.id LEFT JOIN departments dp ON a.affiliation_type = 'DEPARTMENT' AND a.affiliation_id = dp.id WHERE u.student_id = ? GROUP BY u.student_id, a.affiliation_type, c.name`, [id])
            res.status(200).json({status: "success", payload: {list: data, affiliations: data.length}})
        }catch(err){
            res.status(500).json({status: "fail", reason: "err"})
        }
    }
})

router.put("/", async (req,res)=>{
    let {student_id, club_id, type} = req.body
    let uuid = uuidv4();
    if(!student_id || !club_id) return res.status(400).json({status: "error", reason: "malfored request"})
    try{
        let ifAlreadyRegistered = await db.query("SELECT student_id FROM user_affiliation WHERE student_id = ? AND affiliated_organization = ?", [student_id, club_id])
        if(ifAlreadyRegistered.length === 0){
            await db.query("INSERT INTO user_affiliation (student_id, affiliated_organization, affiliation_type, uuid) VALUES (?,?,?,?)", [student_id, club_id, type, uuid])
        }
        res.status(200).json({status: "success"})
    }catch(err){
        console.log(err)
        res.status(500).json({status: "fail", reason: err})
    }
})

module.exports = router;