const prisma = require('../../prisma')
const { sentMail } = require('../../_helpers/email/sentMail')
const { verificationMail } = require('../../_helpers/email/verificationMail')

const { customAlphabet, nanoid } = require('nanoid')
const sixDigitToken = customAlphabet('123456789ABCEFGHJKLMNPQRSTUVXYZ', 6)
const fourDigitToken = customAlphabet('123456789ABCEFGHJKLMNPQRSTUVXYZ', 4)

const bcrypt = require('bcrypt')
const { getUserBriefPersonalData } = require('../profile/profileServices')

const getPrelimDataFromStudentID = async (studentID) => {
  const data = await getUserBriefPersonalData(studentID)

  if (!data) {
    throw {
      code: 'REGISTER-PRELIM-NO-STUDENT-DATA',
      desc: { userData: { studentID }, data },
    }
  } else {
    return data
  }
}

const generateVerificationEmail = async (studentID, email) => {

  // revoke all existing verification email of this user by changing verification code
  const code = sixDigitToken()
  const ref = fourDigitToken()

  const updateCode = await prisma.usercodeverification.upsert({
    where: { studentID: studentID },
    update: {
      studentID: studentID,
      code: code,
      referenceID: ref,
    },
    create: {
      studentID: studentID,
      code: code,
      referenceID: ref,
    },
  })

  // check if this uuid was used
  let uuid = ''
  let uniqueUUID = false
  while (!uniqueUUID) {
    uuid = nanoid(10)
    const checkUUID = await prisma.usercredentials.findUnique({
      where: {
        uuid: uuid,
      },
    })
    if (!checkUUID) break
  }

  //code match, update email to database
  const userData2 = await prisma.usercredentials.upsert({
    where: {
      studentID: studentID,
    },
    update: {},
    create: {
      uuid: uuid,
      studentID: studentID,
      email: email,
      role: 'USER',
      emailVerified: 0,
    },
  })

  // then sent email
  const sentEmailSuccess = await sentMail(
    email,
    'รหัสยืนยันสำหรับเข้าใช้งานเว็บไซต์ CMSO',
    verificationMail(code, ref)
  )

  if (sentEmailSuccess === 'Y') {
    return {
      studentID: updateCode.studentID,
      createdDateTime: updateCode.createdDateTime,
      referenceID: updateCode.referenceID,
    }
  } else {
    throw {
      code: 'REGISTER-GENERATE-EMAIL-SENT-FAILED',
      desc: { userData: { studentID, email } },
    }
  }
}

const verifiedEmailStudent = async (studentID, code, ref) => {
  const updateCode = await prisma.usercodeverification.findUnique({
    where: {
      studentID: studentID,
      AND: [{ code: code }, { referenceID: ref }],
    },
  })

  if (!updateCode) {
    // code not match

    throw {
      code: 'REGISTER-VERIFY-FAILED-CODE-NOT-MATCHED',
      desc: { userData: { studentID, code, ref }, updateCode },
    }
  } else {
    //code match, update email verified

    const userData = await prisma.usercredentials.update({
      where: {
        studentID: studentID,
      },
      data: { emailVerified: 1 },
    })

    // delete code from verification db
    await prisma.usercodeverification.delete({
      where: {
        studentID: studentID,
      },
    })

    return {
      checkedIsSuccess: true,
      userData,
    }
  }
}

const createPasswordForUser = async (studentID, email, password) => {
  // check if studentID and email was matched, and emailverified was 1
  const checkData = await prisma.usercredentials.findUnique({
    where: {
      studentID: studentID,
      AND: [{ email: email }, { emailVerified: 1 }],
    },
  })

  if (!checkData) {
    throw {
      code: 'REGISTER-EMAIL-NOT-VERIFIED',
      desc: { userData: { studentID, email, password }, checkData },
    }
  } else {
    // hash password and update password to db

    bcrypt.hash(password, 14, async (error, hashedPW) => {
      if (error) {
        throw {
          code: 'BCRYPT-ERROR',
          desc: { userData: { studentID, email, password }, error },
        }
      } else {
        if (hashedPW) {
          const returnedData = await prisma.usercredentials.update({
            where: {
              studentID: studentID,
            },
            data: {
              hashPassword: hashedPW,
              updatedDateTime: new Date(),
            },
          })

          // return data

          return {
            createdIsSuccess: true,
            studentID: returnedData.studentID,
            email: returnedData.email,
            createdDateTime: returnedData.updatedDateTime,
          }
        }
      }
    })
  }
}

const checkIfStdIDWasRegistered = async (studentID = '') => {
  const search = await prisma.usercredentials.findMany({
    where: {
      studentID: studentID
    }
  })

  if (search.length !== 0) {
    // this student id was already used for register
    return true
  } else {
    return false
  }

}

const checkIfEmailWasRegistered = async (email = '') => {
  const search = await prisma.usercredentials.findMany({
    where: {
      email: email
    }
  })

  if (search.length !== 0) {
    // this email was already used for register
    return true
  } else {
    return false
  }

}

module.exports = {
  getPrelimDataFromStudentID,
  generateVerificationEmail,
  verifiedEmailStudent,
  createPasswordForUser,

  checkIfStdIDWasRegistered,
  checkIfEmailWasRegistered
}
