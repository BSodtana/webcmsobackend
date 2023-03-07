const express = require("express");
const app = express()
const router = express.Router();

// IMPORTS
const projects = require("./projects")
const user_management = require("./user-management/")
const structure = require("./structure")

router.use("/projects", projects)
router.use("/user-management", user_management)
router.use("/structure", structure)

router.get("/", (req,res)=>{
    res.status(200).json({currentPath: "/v1/"})
})

module.exports = router;