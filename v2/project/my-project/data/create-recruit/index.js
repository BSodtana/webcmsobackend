const express = require('express')
const router = express.Router()
const prisma = require('../../../../prisma')
const VerifyUserJWT = require('../../../../account/login/token/verifyUserJwt')

// /v2/project/my-project/data

router.use('/participant', require('./participant'))
router.use('/staff', require('./staff'))

// router.get('/participant', async (req, res) => {
//   const token = req.headers.authorization?.split(' ')[1]
//   if (!token) {
//     res.status(401).json({
//       status: 'unauthorized',
//       detail: "No token in header's authoriazation",
//     })
//   }
//   if (token) {
//     try {
//       const tokenData = await VerifyUserJWT(token)
//       const data = await prisma.projects.findUnique({
//         where: { projectID: projectID },
//         include: {
//           organizations: { select: { orgName: true, orgType: true } },
//           projectdata: true,
//           projectconsiderationstatus: true,
//           projectparticipantrecruit: true,
//           projectstaffrecruit: {
//             include: { projectstaffrecruitposition: true },
//           },
//         },
//       })
//       res.status(200).json({ data })
//     } catch (error) {
//       console.log(error)
//       res.status(500).json({
//         status: 'internal server error',
//         detail: 'Internal Server Error - Check Server Log',
//       })
//     }
//   }
// })

module.exports = router
