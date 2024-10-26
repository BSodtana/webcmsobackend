const activityError = {
    "DEMO-ERROR-NO-STUDENT-ID-SPECIFIED": {
        "code": "DEMO-ERROR-NO-STUDENT-ID-SPECIFIED",
        "textTH": "กรุณากรอกรหัสนักศึกษา",
        "textEN": "Student ID is required",
        "shouldContactAdmin": false,
        "shouldTryAgain": false,
    },
    "CHECK-IN-ERROR-STUDENT-ID-NOT-JOINED-ACTIVITY": {
        "code": "CHECK-IN-ERROR-STUDENT-ID-NOT-JOINED-ACTIVITY",
        "textTH": "ไม่สามารถลงทะเบียนเข้าร่วมกิจกรรมได้เนื่องจากไม่ได้เข้าร่วมกิจกรรม",
        "textEN": "Cannot check-in because this student was not registered",
        "shouldContactAdmin": false,
        "shouldTryAgain": false,
    },
    "CHECK-IN-ERROR-STUDENT-ID-CHECK-IN-ALREADY": {
        "code": "CHECK-IN-ERROR-STUDENT-ID-CHECK-IN-ALREADY",
        "textTH": "ไม่สามารถลงทะเบียนเข้าร่วมกิจกรรมได้เนื่องจากเข้าร่วมกิจกรรมไปแล้ว",
        "textEN": "Cannot check-in because this student was already checked-in",
        "shouldContactAdmin": false,
        "shouldTryAgain": false,
    },
    "EVALUATION-FORM-EDIT-STATUS-FAILED-SAME-STATUS": {
        "code": "EVALUATION-FORM-EDIT-STATUS-FAILED-SAME-STATUS",
        "textTH": "ไม่สามารถแก้ไขสถานะแบบประเมินเป็นสถานะเดิม",
        "textEN": "Cannot edit evaluation form status to be the same",
        "shouldContactAdmin": false,
        "shouldTryAgain": false,
    },
}

module.exports = activityError