const express = require("express");
const router = express.Router();
const db = require("../../../config/db");
const verifyJwt = require("../../utils/jwtVerify");

// PATH: /projects/user

router.get("/", async (req, res) => {
let jwt = req.header("Authorization")
if(!jwt) res.status(400).json({status: "error", payload: "No JWT provided - Bad Request"})
if(jwt){
    let token = await verifyJwt(jwt)
    if(token.isAuthenticated){
        let projects = await db.query("SELECT projects_data.project_id, projects_data.project_name, clubs.name name, createdDateTime FROM projects_data JOIN clubs ON projects_data.owner_org = clubs.id  WHERE owner_student = ?", [token.data.student_id])
        res.status(200).json({status: "success", payload: projects, data: token.data})
    }
    if(!token.isAuthenticated){
        res.status(401).json({status: "error", payload: token.reason})
    }
}
});

module.exports = router;
