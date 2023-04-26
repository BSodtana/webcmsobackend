const express = require("express");
const router = express.Router();
const db = require("../../config/db")
const path = require('path');

// /v1/docx-templates

router.get("/", async (req,res)=>{
    res.status(200).json({status: "success", text: "v1/docx-templates"});
})

router.get("/project_proprosal", async (req,res)=>{
    res.status(200).sendFile("project_proprosal.docx", {root: path.join(__dirname)})
})



module.exports = router;