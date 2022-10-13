const express = require("express");
const router = express.Router();
const db = require("../../config/db");

// PATH : /projects/

const projects_list = require("./projects_list")

router.get("/:project_id", async (req,res)=>{
    let {project_id} = req.params
    try{
        let data = await db.query("SELECT project_id, owner_id, division_id, name, info_brief, info_full, allow_register, register_date_from, register_date_until, participant FROM projects WHERE project_id = ? LIMIT 1", [project_id])
        res.status(200).json({status: "success", payload: data[0]})
    }catch(err){
        res.status(500).json({status: "error", payload: err})
    }
})

module.exports = router;