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
    "INTERNAL-ERROR": {
        "code": "INTERNAL-ERROR",
        "textTH": "ระบบทำงานผิดพลาด",
        "textEN": "There is an internal error",
        "shouldContactAdmin": true,
        "shouldTryAgain": false,
    }

}

module.exports = commonErrors