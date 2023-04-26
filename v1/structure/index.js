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
        let data = await db.query("SELECT clubs.name, divisions.name as division_name, clubs.type, clubs.id FROM clubs JOIN divisions ON divisions.id = clubs.owner_division WHERE clubs.id = ?", [id])
        res.status(200).json({status: "success", payload: data})
    }catch(err){
        res.status(500).json({status: "error", reason: err})
    }
})

module.exports = router;