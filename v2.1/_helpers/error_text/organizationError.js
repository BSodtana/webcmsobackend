const organizationError = {
    "ROLE-ORG-NOT-FOUND": {
        "code": "ROLE-ORG-NOT-FOUND",
        "textTH": "ไม่พบข้อมูลองค์กรในระบบ",
        "textEN": "No organization found (ROLE)",
        "shouldContactAdmin": false,
        "shouldTryAgain": true,
    },
    "ADD-USER-TO-ORG-ALREADY-JOINED-ERROR": {
        "code": "ADD-USER-TO-ORG-ALREADY-JOINED-ERROR",
        "textTH": "สมาชิกคนนี้อยู่ในองค์กรอยู่แล้ว",
        "textEN": "This user is already joined the organization",
        "shouldContactAdmin": false,
        "shouldTryAgain": false,
    },
    "ADD-USER-TO-ORG-WRONG-TYPE-ERROR": {
        "code": "ADD-USER-TO-ORG-WRONG-TYPE-ERROR",
        "textTH": "ไม่สามารถเพิ่มสมาชิกได้เนื่องจากไม่มีบทบาทนี้",
        "textEN": "This role does\'t exist",
        "shouldContactAdmin": false,
        "shouldTryAgain": true,
    },
}

module.exports = organizationError