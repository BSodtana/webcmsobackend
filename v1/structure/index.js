const express = require("express");
const router = express.Router();
const db = require("../../config/db")

// /v1/structure/

router.get("/", async (req,res)=>{
    try{
        let clubs = await db.query("SELECT DISTINCT(clubs.id), clubs.name AS club_name, divisions.name AS division_name FROM clubs JOIN divisions ON divisions.id = clubs.owner_division WHERE clubs.type = 'CLUB'")
        let division = await db.query("SELECT id, name FROM divisions WHERE id != 'NONE' ")
        res.status(200).json({status: "success", payload: {clubs: clubs, divisions: division}})
    }catch(err){
        res.status(500).json({status: "error", reason: err})
    }
})

router.get("/:id", async (req,res)=>{
    let {id} = req.params
    try{
        let data = await db.query("SELECT CASE WHEN c.id IS NOT NULL THEN CONCAT(c.name, ' ', d.name) WHEN d.id IS NOT NULL THEN d.name END AS org_name FROM clubs c LEFT JOIN divisions d ON c.owner_org = d.id WHERE c.id = ? UNION SELECT d.name AS org_name FROM divisions d WHERE d.id = ? AND NOT EXISTS(SELECT 1 FROM clubs c WHERE c.owner_org = d.id);", [id,id])
        // let data = await db.query("SELECT clubs.name, divisions.name as division_name, clubs.type, clubs.id FROM clubs JOIN divisions ON divisions.id = clubs.owner_division WHERE clubs.id = ?", [id])
        res.status(200).json({status: "success", payload: data})
    }catch(err){
        console.log(err)
        res.status(500).json({status: "error", reason: err})
    }
})

module.exports = router;