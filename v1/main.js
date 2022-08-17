const express = require("express");
const app = express()
const router = express.Router();

// IMPORTS
const activities = require("./activities/activities")
const user_management = require("./user-management/")

router.use("/activities", activities)
router.use("/user-management", user_management)

router.get("/", (req,res)=>{
    res.status(200).json({currentPath: "/v1/"})
})

module.exports = router;