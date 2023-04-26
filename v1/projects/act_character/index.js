const express = require("express");
const router = express.Router();
const db = require("../../../config/db");

// PATH: /projects/character/
router.get("/", async (req, res) => {
    try{
        let data = await db.query("SELECT id, type, text FROM activity_characteristics_choices")
        res.status(200).json({status: "success", payload: data})
    }catch(err){
        res.status(500).json({status: "error", detail: err})
    }
    
});

module.exports = router;
