const express = require("express");
const router = express.Router();

// PATH : /projects/

const projects_list = require("./projects_list")
const project_data = require("./project_data")
const project_portal = require("./portal")
const user = require("./user")
const newProject = require("./new")
const character = require("./act_character")
const info = require("./info")

router.get("/", (req,res)=>{
    res.status(200).json({current_path: "/projects"})
})
router.use("/data", project_data)
router.use("/list", projects_list)
router.use("/portal", project_portal)
router.use("/user", user)
router.use("/new", newProject)
router.use("/character", character)
router.use("/info", info)

module.exports = router;