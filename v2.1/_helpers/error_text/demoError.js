const demoError = {
    "DEMO-ERROR-NO-STUDENT-ID-SPECIFIED": {
        "code": "DEMO-ERROR-NO-STUDENT-ID-SPECIFIED",
        "textTH": "กรุณากรอกรหัสนักศึกษา",
        "textEN": "Student ID is required",
        "shouldContactAdmin": false,
        "shouldTryAgain": false,
    },
    'DEMO-ERROR-NEW-ORG-MISSING-DATA': {
        "code": "DEMO-ERROR-NEW-ORG-MISSING-DATA",
        "textTH": "ข้อมูลในการสร้างองค์กรใหม่ไม่ครบ",
        "textEN": "There is/are missing data for making new organization",
        "shouldContactAdmin": false,
        "shouldTryAgain": true,
    },
    'ERROR-DATA-TYPE-FAILED': {
        "code": "ERROR-DATA-TYPE-FAILED",
        "textTH": "ชนิดของข้อมูลที่ได้รับ ไม่ตรงตามที่ตั้งค่าไว้",
        "textEN": "Data type was not invalid",
        "shouldContactAdmin": true,
        "shouldTryAgain": false,
    },
}

module.exports = demoError