const adminManageError = {
    "HELLOWORLD-ERROR-NONAME": {
        "code": "HELLOWORLD-ERROR-NONAME",
        "textTH": "คุณไม่ได้แจ้งชื่อไว้",
        "textEN": "Name is required",
        "shouldContactAdmin": false,
        "shouldTryAgain": true,
    },
    "ADMIN-MANAGE-CREDENTIAL-ADD-NEW-CRED-ERROR-CRED-EXIST": {
        "code": "ADMIN-MANAGE-CREDENTIAL-ADD-NEW-CRED-ERROR-CRED-EXIST",
        "textTH": "บัญชีนี้ได้เคยลงทะเบียนไว้แล้ว",
        "textEN": "This account was already registered",
        "shouldContactAdmin": false,
        "shouldTryAgain": false,
    },
    "ADMIN-MANAGE-CREDENTIAL-GET-UUID-FAILED-STDID-NOT-EXIST": {
        "code": "ADMIN-MANAGE-CREDENTIAL-GET-UUID-FAILED-STDID-NOT-EXIST",
        "textTH": "ไม่มีผู้ใช้สำหรับรหัสนักศึกษานี้",
        "textEN": "No account associated with this student ID",
        "shouldContactAdmin": false,
        "shouldTryAgain": true,
    },
    "ADMIN-MANAGE-CREDENTIAL-GET-UUID-FAILED-MULTPLE-DATA": {
        "code": "ADMIN-MANAGE-CREDENTIAL-GET-UUID-FAILED-MULTPLE-DATA",
        "textTH": "มีข้อมูลผู้ใช้สำหรับรหัสนักศึกษานี้มากกว่า 1 ชื่อ",
        "textEN": "Multiple account data associated with this student ID",
        "shouldContactAdmin": true,
        "shouldTryAgain": false,
    },
    "ADMIN-MANAGE-CREDENTIAL-ADD-NEW-CRED-ERROR-EMAIL-EXIST": {
        "code": "ADMIN-MANAGE-CREDENTIAL-ADD-NEW-CRED-ERROR-EMAIL-EXIST",
        "textTH": "อีเมลนี้ได้เคยลงทะเบียนไว้แล้ว",
        "textEN": "This email was already used",
        "shouldContactAdmin": false,
        "shouldTryAgain": true,
    },
}

module.exports = adminManageError