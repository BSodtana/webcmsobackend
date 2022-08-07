const express = require("express");
const app = express()
const router = express.Router();

// IMPORTS
const activities = require("./activities/activities")


router.use("/activities", activities)

router.get("/", (req,res)=>{
    res.status(200).json({currentPath: "/v1/"})
})

module.exports = router;