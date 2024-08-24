const prisma = require('../../prisma')
const { sentMail } = require('../../_helpers/email/sentMail')
const { verificationMail } = require('../../_helpers/email/verificationMail')

const { customAlphabet, nanoid } = require('nanoid')
const sixDigitToken = customAlphabet('123456789ABCEFGHJKLMNPQRSTUVXYZ', 6)
const fourDigitToken = customAlphabet('123456789ABCEFGHJKLMNPQRSTUVXYZ', 4)

const bcrypt = require('bcrypt')
const { getUserBriefPersonalData, getUserFullCredentialData } = require('../profile/profileServices')
const { resetPasswordEmail } = require('../../_helpers/email/resetPasswordEmail')

const generateRecoverCodeEmail = async (email) => {

  // find student id from email
  const stdid = await prisma.usercredentials.findFirst({
    where: {
      email: email
    }
  })

  if (!stdid?.studentID) {
    // no user associated to this email
    throw {
      code: 'FORGOT-PASSWORD-NO-EMAIL',
      desc: { userData: { email } },
    }

  } else {
    // revoke all existing code by changing verification code
    const code = sixDigitToken()
    const ref = fourDigitToken()

    const updateCode = await prisma.usercodeverification.upsert({
      where: { studentID: stdid.studentID },
      update: {
        studentID: stdid.studentID,
        code: code,
        referenceID: ref,
      },
      create: {
        studentID: stdid.studentID,
        code: code,
        referenceID: ref,
      },
    })

    const userData = await getUserBriefPersonalData(stdid.studentID)
    const emailData = await getUserFullCredentialData(stdid.studentID)

    // then sent email
    const sentEmailSuccess = await sentMail(
      emailData.email,
      'รหัสยืนยันการเปลี่ยนรหัสผ่าน',
      resetPasswordEmail(`${userData.firstNameTH} ${userData.lastNameTH}`, code, ref)
    )

    if (sentEmailSuccess === 'Y') {
      return {
        studentID: updateCode.studentID,
        createdDateTime: updateCode.createdDateTime,
        referenceID: updateCode.referenceID,
      }
    } else {
      throw {
        code: 'FORGOT-PASSWORD-EMAIL-SENT-FAILED',
        desc: { userData: { email } },
      }
    }
  }


}

const verifiedCodeStudent = async (email, code, ref) => {


  const stdid = await prisma.usercredentials.findFirst({
    where: {
      email: email
    }
  })

  if (!stdid?.studentID) {
    throw {
      code: 'FORGOT-PASSWORD-NO-EMAIL',
      desc: { userData: { email } },
    }

  } else {
    const updateCode = await prisma.usercodeverification.findUnique({
      where: {
        studentID: stdid.studentID,
        AND: [{ code: code }, { referenceID: ref }],
      },
    })

    if (!updateCode) {
      // code not match

      throw {
        code: 'REGISTER-VERIFY-FAILED-CODE-NOT-MATCHED',
        desc: { userData: { email, code, ref }, updateCode },
      }
    } else {
      //code match, update email verified

      const userData = await prisma.usercredentials.update({
        where: {
          studentID: stdid.studentID,
        },
        data: { emailVerified: 1 },
      })

      // delete code from verification db
      await prisma.usercodeverification.delete({
        where: {
          studentID: stdid.studentID,
        },
      })

      return {
        checkedIsSuccess: true,
        userData,
      }
    }
  }


}

const createPasswordForUser = async (email, password) => {

  const stdid = await prisma.usercredentials.findFirst({
    where: {
      email: email
    }
  })

  if (!stdid?.studentID) {
    throw {
      code: 'FORGOT-PASSWORD-NO-EMAIL',
      desc: { userData: { email } },
    }
  }
  else {

    // check if studentID and email was matched, and emailverified was 1
    const checkData = await prisma.usercredentials.findUnique({
      where: {
        studentID: stdid.studentID,
        AND: [{ email: email }, { emailVerified: 1 }],
      },
    })

    if (!checkData) {
      throw {
        code: 'REGISTER-EMAIL-NOT-VERIFIED',
        desc: { userData: { email, password }, checkData },
      }
    } else {
      // hash password and update password to db

      bcrypt.hash(password, 14, async (error, hashedPW) => {
        if (error) {
          throw {
            code: 'BCRYPT-ERROR',
            desc: { userData: { email, password }, error },
          }
        } else {
          if (hashedPW) {
            const returnedData = await prisma.usercredentials.update({
              where: {
                studentID: stdid.studentID,
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



}




module.exports = {
  generateRecoverCodeEmail,
  verifiedCodeStudent,
  createPasswordForUser
}
