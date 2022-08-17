const express = require("express");
const router = express.Router();
const db = require("../../config/db")
const {v4: uuidv4} = require("uuid")

// ____/v1/user-management/register

router.get("/:stu_id", async (req,res)=>{
    let {stu_id} = req.params
    let uuid = uuidv4()
    let prior
    if(stu_id){
        try{
            let query = await db.query("SELECT student_id from users WHERE student_id = ? LIMIT 1", [stu_id])
            if(query.length===0) res.status(200).json({studentIdIsValid: false, priorRegister: prior, data: null})
            if(query.length===1){
                try{
                    let uuidQuery = await db.query("SELECT uuid FROM users WHERE student_id = ?", [stu_id])
                    if(uuidQuery[0].uuid===null || uuidQuery[0].uuid===""){
                        await db.query("UPDATE users SET uuid = ? WHERE student_id = ?", [uuid, stu_id])
                        prior = false
                    }else{prior=true}
                        let getData = await db.query("SELECT student_id, title, first_name, middle_name, last_name, current_year, uuid from users WHERE student_id = ? LIMIT 1", [stu_id])
                        res.status(200).json({studentIdIsValid: true, priorRegister: prior, data: getData[0]})
                    
                }catch(err){
                    res.status(500)
                    console.error({module: "register initiation from stu_id"})
                    throw err;
                }
            }
        }catch(err){
            res.status(500)
            console.error({path: "/v1/user-management/register", error: err})
        }
    }
})

module.exports = router;