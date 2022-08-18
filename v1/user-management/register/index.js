const express = require("express");
const router = express.Router();
const db = require("../../../config/db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { default: axios } = require("axios");
const { MAIL_ENDPOINT, MAIL_TOKEN } = require("../../../config/mail");
const moment = require("moment");

// ____/v1/user-management/register

router.get("/:stu_id", async (req, res) => {
  let { stu_id } = req.params;
  let uuid = uuidv4();
  let prior;
  if (stu_id) {
    try {
      let query = await db.query(
        "SELECT student_id from users WHERE student_id = ? LIMIT 1",
        [stu_id]
      );
      if (query.length === 0)
        res
          .status(200)
          .json({ studentIdIsValid: false, priorRegister: prior, data: null });
      if (query.length === 1) {
        try {
          let uuidQuery = await db.query(
            "SELECT uuid FROM users WHERE student_id = ?",
            [stu_id]
          );
          if (uuidQuery[0].uuid === null || uuidQuery[0].uuid === "") {
            await db.query("UPDATE users SET uuid = ? WHERE student_id = ?", [
              uuid,
              stu_id,
            ]);
            prior = false;
          } else {
            prior = true;
          }
          let getData = await db.query(
            "SELECT student_id, title, first_name, middle_name, last_name, current_year, uuid from users WHERE student_id = ? LIMIT 1",
            [stu_id]
          );
          res
            .status(200)
            .json({
              studentIdIsValid: true,
              priorRegister: prior,
              data: getData[0],
            });
        } catch (err) {
          res.status(500);
          console.error({ module: "register initiation from stu_id" });
          throw err;
        }
      }
    } catch (err) {
      res.status(500);
      console.error({ path: "/v1/user-management/register", error: err });
    }
  }
});

router.put("/basics", async (req, res) => {
  let {
    uuid,
    title,
    first_name,
    middle_name,
    last_name,
    nick_name,
    phone_number,
    line_id,
    facebook,
    instagram,
    medical_condition,
    allergy,
    email,
    password,
  } = req.body;
  if ((uuid !== "" || uuid !== null) && password) {
    let salt = await bcrypt.genSalt(10);
    let passwordHashed = await bcrypt.hash(password, salt);
    console.log(salt);
    try {
      let update = await db.query(
        "UPDATE users SET title = ?, first_name = ?, middle_name = ?, last_name = ?, nick_name = ?, phone_number = ?, line_id = ?, facebook = ?, instagram = ?, medical_condition = ?, allergy = ?, email = ?, password = ?, createdDateTime = NOW() WHERE uuid = ?",
        [
          title,
          first_name,
          middle_name,
          last_name,
          nick_name,
          phone_number,
          line_id,
          facebook,
          instagram,
          medical_condition,
          allergy,
          email,
          passwordHashed,
          uuid,
        ]
      );
      res
        .status(200)
        .json({ success: true, reason: null, action: "update basics" });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({
          path: "/v1/user-management/register/basics",
          method: "put",
          error: err,
        });
    }
  } else {
    res.status(200).json({ success: false, reason: "UUID IS REQUIRED" });
  }
});

router.post("/vaccine", async (req, res) => {
  let { vaccine, infection, uuid } = req.body;
  try {
    let count = await db.query(
      "SELECT dose FROM user_vaccine WHERE owner_uuid = ?",
      [uuid]
    );
    let infectionCount = await db.query(
      "SELECT dose FROM user_infection WHERE owner_uuid = ?",
      [uuid]
    );
    console.log(
      vaccine.length,
      count.length,
      typeof count.length,
      vaccine.length < count.length
    );
    console.warn(
      infection.length,
      infectionCount.length,
      typeof infectionCount.length,
      infection.length < infectionCount.length
    );
    if (vaccine.length <= count.length)
      await db.query(
        "DELETE FROM user_vaccine WHERE owner_uuid = ? AND dose >= ?",
        [uuid, count.length]
      );
    if (infection.length <= infectionCount.length)
      await db.query(
        "DELETE FROM user_infection WHERE owner_uuid = ? AND dose >= ?",
        [uuid, infectionCount.length]
      );
    for (let i in vaccine) {
      try {
        let prior = await db.query(
          "SELECT dose FROM user_vaccine WHERE owner_uuid = ? AND dose = ?",
          [uuid, vaccine[i].dose]
        );
        if (prior.length === 0)
          await db.query(
            "INSERT INTO user_vaccine (dose, type, date, owner_uuid) VALUES (?,?,?,?)",
            [vaccine[i].dose, vaccine[i].type, vaccine[i].date, uuid]
          );
        if (prior.length === 1)
          await db.query(
            "UPDATE user_vaccine SET type = ?, date = ? WHERE owner_uuid = ? AND dose = ?",
            [vaccine[i].type, vaccine[i].date, uuid, vaccine[i].dose]
          );
      } catch (err) {
        throw err;
      }
    }
    for (let j in infection) {
      try {
        let prior = await db.query(
          "SELECT dose FROM user_infection WHERE owner_uuid = ? AND dose = ?",
          [uuid, infection[j].dose]
        );
        if (prior.length === 0)
          await db.query(
            "INSERT INTO user_infection (dose, date, owner_uuid) VALUES (?,?,?)",
            [infection[j].dose, infection[j].date, uuid]
          );
        if (prior.length === 1)
          await db.query(
            "UPDATE user_infection SET date = ? WHERE dose = ? AND owner_uuid = ?",
            [infection[j].date, infection[j].dose, uuid]
          );
      } catch (err) {
        throw err;
      }
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500);
    console.error(err);
  }
});

router.get("/mail/:uuid", async (req, res) => {
  let { uuid } = req.params;
  if (uuid) {
    try {
      try {
        let checkUid = await db.query(
          "SELECT email FROM users WHERE uuid = ? LIMIT 1",
          [uuid]
        );
        if (checkUid.length === 0)
          res
            .status(400)
            .json({
              success: false,
              reason: "no user associated with this uuid",
            });
        if (checkUid.length === 1) {
          let isMailSent = await db.query(
            "SELECT mailSent FROM users WHERE uuid = ? LIMIT 1",
            [uuid]
          );
          let sentDate = new Date(isMailSent[0].mailSent);
          let now = new Date();
          let diff = moment(now).diff(moment(sentDate), "seconds");
          console.log(diff);
          if (diff > 120) {
            await db.query(
              "UPDATE users SET mailSent = NOW() WHERE uuid = ? LIMIT 1",
              [uuid]
            );
            console.log(parseInt(Date.now()) - parseInt(isMailSent[0].DTM));
            let sendmail = await axios.post(
              `${MAIL_ENDPOINT}`,
              {
                subject: "กรุณายินยันที่อยู่อีเมลเพื่อใช้งาน CMSO Online",
                content: `<h1>ยินดีต้อนรับสู่การใช้งาน CMSO Online</h1><br/><p>ขอให้ดำเนินการยืนยันที่อยู่อีเมลโดยคลิกที่<a href='https://cmso.med.cmu.ac.th/register/verify/${uuid}/'>ลิงก์นี้</a></p><br/>หากไม่สามารถคลิกได้ให้คัดลอกลิงก์นี้ใส่ในเบราว์เซอร์ของคุณ https://cmso.med.cmu.ac.th/register/verify/${uuid}<br/>
                        <strong>ห้ามตอบกลับอีเมลฉบับนี้ หากมีปัญหาโปรดติดต่อฝ่ายพัฒนาเทคโนโลยีสารสนเทศ สโมสรนักศึกษาคณะแพทยศาสตร์ มหาวิทยาลัยเชียงใหม่</strong><br/>`,
                relay: "no-reply-cmso.med@cmu.ac.th",
                mailsent: [checkUid[0].email],
                mailmaster: "relay-noname",
              },
              {
                headers: {
                  Authorization: `Bearer ${MAIL_TOKEN}`,
                },
              }
            );
            if (sendmail.data.status === "Y")
              res.status(200).json({ success: true, email: checkUid[0].email });
            if (sendmail.data.status === "N")
              res.status(500).json({ success: false });
          }
          else res.status(200).json({success: true, email: checkUid[0].email, reason:"Last email was sent in less than 2 minutes"})
        }
      } catch (err) {
        throw err;
      }
    } catch (err) {
      res.status(500);
      console.log(err);
    }
  }
  if (!uuid) {
    res
      .status(400)
      .json({
        success: false,
        detail: "request malformed, uuid is required as parameter",
      });
  }
});
module.exports = router;
