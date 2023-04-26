const express = require("express");
const router = express.Router();
const db = require("../../../config/db");
const verifyJwt = require("../../utils/jwtVerify");

// PATH: /projects/info/
// const project_announcement = require("./announcement")

// router.use("/announcements", project_announcement)

router.get("/:projectId", async (req,res)=>{
    let jwt = req.header("Authorization")
    let {projectId} = req.params
    if(!jwt) res.status(400).json({status: "error", payload: "NO JWT provided - Bad Request"})
    if(jwt){
        let token = await verifyJwt(jwt)
        if(token.isAuthenticated){
            let data = await db.query("SELECT * FROM projects_data WHERE project_id = ?", [projectId])
            if(data.length){
                let info = data[0]
                let constructor = {
                    proj_id: info.project_id,
                    proj_name: info.project_name,
                    place_in_cmu: JSON.parse(info.place_in_cmu),
                    plcae_outside_cmu: JSON.parse(info.place_outside_cmu),
                    date_prepare_start: dateFormater(info.date_prepare_start),
                    date_prepare_end: dateFormater(info.date_prepare_end),
                    date_event_start: dateFormater(info.date_event_start),
                    date_event_end: dateFormater(info.date_event_end),
                    date_summation_start: dateFormater(info.date_summation_start),
                    date_summation_end: dateFormater(info.date_summation_end),
                    owner_org: await getOwnerOrgName(info.owner_org),
                    owner_student: await getStudentData(info.owner_student),
                    prof: info.prof,
                    prof_aff: info.prof_aff,
                    other_org: JSON.parse(info.other_org),
                    cmso_proj_type: info.cmso_proj_type,
                    cmu_proj_type: info.cmu_proj_type,
                    cmu_med_grad: info.cmu_med_grad,
                    cmso_mission_type: info.cmso_mission_type,
                    cmu_med_org: info.cmu_med_org,
                    background: info.background,
                    aims: JSON.parse(info.aims),
                    participant_student: info.participant_student,
                    participant_prof: info.participant_prof,
                    participant_student_staff: info.participant_student_staff,
                    participant_fac_staff: info.participant_fac_staff,
                    participant_outside: info.participant_outside,
                    participant_student_total: parseInt(info.participant_student) + parseInt(info.participant_student_staff),
                    participant_total: parseInt(info.participant_student) + parseInt(info.participant_prof) + parseInt(info.participant_student_staff) + parseInt(info.participant_fac_staff) + parseInt(info.participant_outside),
                    goal_qualitative: info.goal_qualitative,
                    indicator_participant: info.indicator_participant,
                    indicator_satisfactory: info.indicator_satisfactory,
                    indicator_aims: info.indicator_aims,
                    output: JSON.parse(info.output),
                    plan: JSON.parse(info.plan),
                    stageDo: JSON.parse(info.stageDo),
                    stageCheck: JSON.parse(info.stageCheck),
                    act: JSON.parse(info.act),
                    fund_fac: sumObject(info.fund_fac),
                    fund_extracir: sumObject(info.fund_extracir),
                    fund_sport: sumObject(info.fund_sport),
                    func_other: sumObject(info.fund_other),
                    fund_name: info.fund_name,
                }
                if(info.owner_student === token.data.student_id) res.status(200).json({status: "success", payload: constructor})
                if(info.owner_student !== token.data.student_id) res.status(401).json({status: "error", payload: null, error: "Unauthorized, Owner student ID does not match token request provided, cannot trust JWT token"})
            }
            if(data.length===0) res.status(500).json({status: "error", payload: null, error: "No projects associated with this data"})
        }
        if(!token.isAuthenticated){
            res.status(401).json({status: "error", payload: token.reason})
        }
    }
})

router.get("/", async (req, res) => {
    let jwt = req.header("Authorization")
    if(!jwt) res.status(400).json({status: "error", payload: "No JWT provided - Bad Request"})
    if(jwt){
        let token = await verifyJwt(jwt)
        if(token.isAuthenticated){
            res.status(200).json({status: "success", payload: "hello", data: token.data})
        }
        if(!token.isAuthenticated){
            res.status(401).json({status: "error", payload: token.reason})
        }
    }
    });

function dateFormater(date){
    let dateStr = date.toISOString()
    let dateArray = dateStr.split("-")
    let day = dateArray[2].split("T")[0]
    let month = parseInt(dateArray[1])
    let year = parseInt(dateArray[0])
    let monthText
    switch(month){
        case 1: monthText = "มกราคม"       ; break;
        case 2: monthText = "กุมภาพันธ์"; break;
        case 3: monthText = "มีนาคม"; break;
        case 4: monthText = "เมษายน"; break;
        case 5: monthText = "พฤษภาคม"; break;
        case 6: monthText = "มิถุนายน"; break;
        case 7: monthText = "กรกฏาคม"; break;
        case 8: monthText = "สิงหาคม"; break;
        case 9: monthText = "กันยายน"; break;
        case 10:monthText =  "ตุลาคม"; break;
        case 11:monthText =  "พฤศจิกายน"; break;
        case 12:monthText =  "ธันวาคม"; break;
    }
    if(day < 10) day = day.split("")[1]
    return `${day} ${monthText} ${year+543}`
}

function sumObject(obj){
    let object = JSON.parse(obj)
    for (let i=0; i<object.length; i++){
        object[i].subSum = (object[i].unitPrice * parseInt(object[i].unit.match(/\d/g).join(""), 10)).toLocaleString("th-TH" , { minimumFractionDigits: 2 })
        object[i].unitPrice = (object[i].unitPrice*1).toLocaleString("th-TH" , { minimumFractionDigits: 2 }) 
    }
    let sum = 0;
    object.map((data)=>{
        return sum += parseInt(data.unit.match(/\d/g).join(""), 10)*data.unitPrice;
    })
    return {list: object, sum: sum.toLocaleString("th-TH" , { minimumFractionDigits: 2 }), bahtText: BAHTTEXT(sum)};
}

async function getOwnerOrgName(owner_org){
         let owner_type = await db.query("SELECT type FROM clubs WHERE id = ?", [owner_org])
         let text
                if(owner_type[0].type === "CLUB"){
                    let data = await db.query("SELECT clubs.name AS clubName, divisions.name AS divName FROM clubs JOIN divisions ON clubs.owner_division = divisions.id WHERE clubs.id = ?", [owner_org])
                    if(data.length !== 0) text = `${data[0].clubName} ${data[0].divName}`
                    if(data.length === 0) text = `ไม่พบหน่วยงาน นี่เป็นข้อผิดพลาด โปรดติดต่อฝ่ายพัฒนาเทคโนโลยีและสารสนเทศ` 
                }
                if(owner_type[0].type === "DIVISION"){
                    let data = await db.query("SELECT name FROM clubs WHERE id = ?", [owner_org])
                    if(data.length !== 0) text = data[0].name
                    if(data.length === 0) text = `ไม่พบหน่วยงาน นี่เป็นข้อผิดพลาด โปรดติดต่อฝ่ายพัฒนาเทคโนโลยีและสารสนเทศ`
                }
        return text;
}

async function getStudentData(stu_id){
    let text
    let data = await db.query("SELECT title, first_name, middle_name, last_name, phone_number FROM users WHERE student_id = ?" ,[stu_id])
    let t = data[0]
    if(!t.middle_name || t.middle_name === " " || t.middle_name === "")
    {
        text = text = `${t.title}${t.first_name} ${t.last_name} หมายเลขโทรศัพท์ ${t.phone_number.slice(0,3)}-${t.phone_number.slice(3,10)}`
    }else{
        text = `${t.title}${t.first_name} ${t.middle_name} ${t.last_name} หมายเลขโทรศัพท์ ${t.phone_number.slice(0,3)}-${t.phone_number.slice(3,10)}`
    }
    return text;
}
function BAHTTEXT(num, suffix) {
    'use strict';
    
    if (typeof suffix === 'undefined') {
        suffix = 'บาทถ้วน';
    }
    
    num = num || 0;
    num = num.toString().replace(/[, ]/g, ''); // remove commas, spaces
    
    if (isNaN(num) || (Math.round(parseFloat(num) * 100) / 100) === 0) {
        return 'ศูนย์บาทถ้วน';
    } else {
        
        var t = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน', 'ล้าน'],
            n = ['', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า'],
            len,
            digit,
            text = '',
            parts,
            i;
        
        if (num.indexOf('.') > -1) { // have decimal
            
            /* 
             * precision-hack
             * more accurate than parseFloat the whole number 
             */
            
            parts = num.toString().split('.');
            
            num = parts[0];
            parts[1] = parseFloat('0.' + parts[1]);
            parts[1] = (Math.round(parts[1] * 100) / 100).toString(); // more accurate than toFixed(2)
            parts = parts[1].split('.');
            
            if (parts.length > 1 && parts[1].length === 1) {
                parts[1] = parts[1].toString() + '0';
            }
            
            num = parseInt(num, 10) + parseInt(parts[0], 10);
            
            
            /* 
             * end - precision-hack
             */
            text = num ? BAHTTEXT(num) : '';
            
            if (parseInt(parts[1], 10) > 0) {
                text = text.replace('ถ้วน', '') + BAHTTEXT(parts[1], 'สตางค์');
            }
            
            return text;
            
        } else {

            if (num.length > 7) { // more than (or equal to) 10 millions

				var overflow = num.substring(0, num.length - 6);
				var remains = num.slice(-6);
				return BAHTTEXT(overflow).replace('บาทถ้วน', 'ล้าน') + BAHTTEXT(remains).replace('ศูนย์', '');

			} else {
                
                len = num.length;
                for (i = 0; i < len; i = i + 1) {
                    digit = parseInt(num.charAt(i), 10);
                    if (digit > 0) {
                        if (len > 2 && i === len - 1 && digit === 1 && suffix !== 'สตางค์') {
                            text += 'เอ็ด' + t[len - 1 - i];
                        } else {
                            text += n[digit] + t[len - 1 - i];
                        }
                    }
                }
                
                // grammar correction
                text = text.replace('หนึ่งสิบ', 'สิบ');
                text = text.replace('สองสิบ', 'ยี่สิบ');
                text = text.replace('สิบหนึ่ง', 'สิบเอ็ด');
                
                return text + suffix;
            }
            
        }
        
    }
}

module.exports = router;
