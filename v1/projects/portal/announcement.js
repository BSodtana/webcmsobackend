const express = require("express");
const router = express.Router();
const db = require("../../../config/db");
const verifyJwt = require("../../utils/jwtVerify");

// PATH: /projects/portal/announcements/

router.get("/", async (req, res) => {
let jwt = req.header("Authorization")
if(!jwt) res.status(400).json({status: "error", payload: "No JWT provided - Bad Request", route: "projects/portal/announcements/"})
if(jwt){
    let token = await verifyJwt(jwt)
    if(token.isAuthenticated){
        try{
            let announcements = await db.query("SELECT * FROM project_announcements ORDER BY createdDateTime DESC")
            res.status(200).json({status: "success", payload: announcements})
        }catch(err){
            res.status(500).json({status: "error", payload: err})
        }
    }
    if(!token.isAuthenticated){
        res.status(401).json({status: "error", payload: token.reason, route: "projects/portal/announcements/"})
    }
}
});

module.exports = router;
