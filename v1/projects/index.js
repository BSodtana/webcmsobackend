const express = require("express");
const router = express.Router();

// PATH : /projects/

const projects_list = require("./projects_list")
const project_data = require("./project_data")
const project_portal = require("./portal")

router.get("/", (req,res)=>{
    res.status(200).json({current_path: "/projects"})
})
router.use("/data", project_data)
router.use("/list", projects_list)
router.use("/portal", project_portal)

module.exports = router;