const express = require("express");
const router = express.Router();

// PATH : /projects/

const projects_list = require("./projects_list")

router.get("/", (req,res)=>{
    res.status(200).json({current_path: "/projects"})
})

router.use("/list", projects_list)

module.exports = router;