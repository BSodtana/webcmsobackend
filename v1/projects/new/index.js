const express = require("express");
const router = express.Router();
const db = require("../../../config/db");

// PATH: /projects/new/
const act_character = require("../act_character")

router.get("/", async (req, res) => {
res.status(200).json({status: "success", path: "/v1/projects/new/"})
});

router.post("/", async (req,res)=>{
    let {project_name,place_in_cmu,place_outside_cmu,date_prepare_start,date_prepare_end,date_event_start,date_event_end,date_summation_start,date_summation_end,owner_org,owner_student,prof,prof_aff,other_org,cmso_proj_type,cmu_proj_type,cmu_med_grad,cmso_mission_type,cmu_med_org,background,aims,participant_student,participant_prof,participant_student_staff,participant_fac_staff,participant_outside,goal_qualitative,indicator_participant,indicator_satisfactory,indicator_aims,output,plan,stageDo,check,act,fund_fac,fund_extracir,fund_sport,fund_other,fund_name} = req.body.constructor
    try{
        // TRY INITIATE ID PROJECTS
        let countProj = await db.query("SELECT COUNT(owner_org) AS count FROM projects_data WHERE owner_org = ?", [owner_org])
        let orgCount = parseInt(countProj[0].count)
        let currentDTM = new Date();
        let month = currentDTM.getUTCMonth();
        let year = currentDTM.getUTCFullYear();
        let monthText = getMonthText(month)
        let proj_id = `${owner_org}${orgCount+1}-${year}${monthText})`
        console.log(req.body.constructor)
        let query = await db.query("INSERT INTO projects_data (project_id, project_name, place_in_cmu, place_outside_cmu,date_prepare_start,date_prepare_end,date_event_start,date_event_end,date_summation_start,date_summation_end,owner_org,owner_student,prof,prof_aff,other_org,cmso_proj_type,cmu_proj_type,cmu_med_grad,cmso_mission_type,cmu_med_org,background,aims,participant_student,participant_prof,participant_student_staff,participant_fac_staff,participant_outside,goal_qualitative,indicator_participant,indicator_satisfactory,indicator_aims,output,plan,stageDo,stageCheck,act,fund_fac,fund_extracir,fund_sport,fund_other, fund_name) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [proj_id, project_name, place_in_cmu, place_outside_cmu, date_prepare_start,date_prepare_end,date_event_start,date_event_end,date_summation_start,date_summation_end,owner_org,owner_student,prof,prof_aff,other_org,cmso_proj_type,cmu_proj_type,cmu_med_grad,cmso_mission_type,cmu_med_org,background,aims,participant_student,participant_prof,participant_student_staff,participant_fac_staff,participant_outside,goal_qualitative,indicator_participant,indicator_satisfactory,indicator_aims,output,plan,stageDo,check,act,fund_fac,fund_extracir,fund_sport,fund_other,fund_name])
        let query2 = await db.query("INSERT INTO projects (project_id, owner_id, division_id, allow_register) VALUES (?,?,?,?)", [proj_id, owner_student,owner_org,0])
        res.status(200).json({status: "success", payload: {project_id: proj_id}})
    }catch(err){
        res.status(500).json({status: err, detail: "Error"})
        console.log(err)
    }
})

function getMonthText(month){
    let text
    switch(month){
        case 1: text = "JAN" ; break;
        case 2: text = "FEB"; break;
        case 3: text = "MAR"; break;
        case 4: text = "APR"; break;
        case 5: text = "MAY"; break;
        case 6: text = "JUN"; break;
        case 7: text = "JUL"; break;
        case 8: text = "AUG"; break;
        case 9: text = "SEP"; break;
        case 10: text = "OCT"; break;
        case 11: text = "NOV"; break;
        case 12: text = "DEC"; break;
    }
    return text
}
module.exports = router;
