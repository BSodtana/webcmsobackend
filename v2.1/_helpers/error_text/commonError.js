const commonErrors = {
    "jwt-malformed": {
        "code": "jwt-malformed",
        "textTH": "กรุณาล็อกอินใหม่อีกครั้ง",
        "textEN": "Please log in again",
        "shouldContactAdmin": false,
        "shouldTryAgain": false,
    },
    "EMAIL-ERROR": {
        "code": "EMAIL-ERROR",
        "textTH": "ระบบส่งอีเมลมีปัญหา",
        "textEN": "There is an internal error on email service",
        "shouldContactAdmin": true,
        "shouldTryAgain": false,
    },
    "NOT-ENOUGH-DATA": {
        "code": "NOT-ENOUGH-DATA",
        "textTH": "กรุณากรอกข้อมูลให้ครบถ้วน",
        "textEN": "Some information are missing",
        "shouldContactAdmin": false,
        "shouldTryAgain": true,
    },
    "BCRYPT-ERROR": {
        "code": "BCRYPT-ERROR",
        "textTH": "มีปัญหาเกี่ยวกับการเข้ารหัส",
        "textEN": "There is an error on data encription",
        "shouldContactAdmin": true,
        "shouldTryAgain": false,
    },
    "JWT-TOKEN-NOT-FOUND": {
        "code": "JWT-TOKEN-NOT-FOUND",
        "textTH": "ไม่พบข้อมูลล็อกอินในระบบ",
        "textEN": "No data associated with this token",
        "shouldContactAdmin": false,
        "shouldTryAgain": false,
    },
    "JWT-TOKEN-EXPIRED": {
        "code": "JWT-TOKEN-EXPIRED",
        "textTH": "ข้อมูลล็อกอินหมดอายุ",
        "textEN": "Credential Expired",
        "shouldContactAdmin": false,
        "shouldTryAgain": true,
    },
    "JWT-TOKEN-NOT-PROVIDED": {
        "code": "JWT-TOKEN-NOT-PROVIDED",
        "textTH": "ไม่ได้ให้โทเค่นมา",
        "textEN": "No token provided",
        "shouldContactAdmin": false,
        "shouldTryAgain": false,
    },
    "ACCESS-DENIED-ROLE": {
        "code": "ACCESS-DENIED-ROLE",
        "textTH": "คุณไม่มีสิทธิ์เข้าถึงเนื้อหานี้ เนื่องจากมีสิทธิ์ไม่เพียงพอ",
        "textEN": "Access Denied (Not enough permission)",
        "shouldContactAdmin": true,
        "shouldTryAgain": false,
    },
    "ACCESS-DENIED-ALL": {
        "code": "ACCESS-DENIED-ALL",
        "textTH": "คุณไม่มีสิทธิ์เข้าถึงเนื้อหานี้",
        "textEN": "Access Denied",
        "shouldContactAdmin": true,
        "shouldTryAgain": false,
    },
    "DECLINED-CONFIRM-DELETE": {
        "code": "DECLINED-CONFIRM-DELETE",
        "textTH": "คุณไม่ได้ยืนยันการลบข้อมูล",
        "textEN": "Confirmation of data deletion was not done",
        "shouldContactAdmin": false,
        "shouldTryAgain": true,
    },
    "NO-PROJECT-DATA": {
        "code": "NO-PROJECT-DATA",
        "textTH": "ไม่มีกิจกรรมนี้",
        "textEN": "This project does not exist",
        "shouldContactAdmin": false,
        "shouldTryAgain": false,
    },
    'P2025': {
        "code": "DATA-NOT-EXIST",
        "textTH": "ไม่มีข้อมูลนี้ในระบบ",
        "textEN": "There is no data existed",
        "shouldContactAdmin": false,
        "shouldTryAgain": false,
    },
    "INTERNAL-ERROR": {
        "code": "INTERNAL-ERROR",
        "textTH": "ระบบทำงานผิดพลาด",
        "textEN": "There is an internal error",
        "shouldContactAdmin": true,
        "shouldTryAgain": false,
    }

}

module.exports = commonErrors