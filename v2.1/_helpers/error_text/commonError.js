const commonErrors = {
    "jwt-malformed": {
        "code": "jwt-malformed",
        "textTH": "กรุณาล็อกอินใหม่อีกครั้ง",
        "textEN": "Please log in again",
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