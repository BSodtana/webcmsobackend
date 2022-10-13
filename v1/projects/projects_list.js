const express = require("express");
const router = express.Router();

// PATH: /projects/list

router.get("/", (req,res)=>{
    res.status(200).json({currentPath: "/v1/projects"})
})

module.exports = router;