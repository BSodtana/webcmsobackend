const express = require("express");
const router = express.Router();

router.get("/", (req,res)=>{
    res.status(200).json({currentPath: "/v1/activities"})
})

module.exports = router;