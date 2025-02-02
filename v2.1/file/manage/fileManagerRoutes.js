const express = require("express");
const router = express.Router();

const isLoggedIn = require("../../_middleware/isLoggedIn");

const fileManagerController = require('./fileManagerControllers')

// /v2.1/file/manage

// todo

// user
router.get("/user", [isLoggedIn()], fileManagerController.checkQuotaByUserCon)
router.get("/user/quota", [isLoggedIn()], fileManagerController.checkQuotaByUserCon) // check quota of user
router.get("/user/item/list", [isLoggedIn()], fileManagerController.listAllFilesByUserCon) // list file of user
router.get("/user/item/:fileID", [isLoggedIn()], fileManagerController.getSpecificFileInfoUserCon) // get file info of user
router.get("/user/item/:fileID/info", [isLoggedIn()], fileManagerController.getSpecificFileInfoUserCon) // get file info of user
router.post("/user/item/:fileID/delete", [isLoggedIn()], fileManagerController.deleteFileUserCon) // delete file of user
router.post("/user/item/:fileID/publicity", [isLoggedIn()], fileManagerController.changeFilePublicityUserCon) // change file publicity

// project
router.get("/project/:projectID", [isLoggedIn()], fileManagerController.checkQuotaByProjectCon)
router.get("/project/:projectID/quota", [isLoggedIn()], fileManagerController.checkQuotaByProjectCon) // check quota of project
// list file of project: router.get('/project/:projectID/item/list', projectControllers)
// get file info of project: router.get('/project/:projectID/item/:fileID/info', projectControllers)
// delete file of project: router.delete('/project/:projectID/item/:fileID/delete', projectControllers)
// change project file publicity: router.post('/project/:projectID/item/:fileID/publicity', projectControllers)

// organization
router.get("/organization/:orgID", [isLoggedIn()], fileManagerController.checkQuotaByOrgCon)
router.get("/organization/:orgID/quota", [isLoggedIn()], fileManagerController.checkQuotaByOrgCon) // check quota of org
// list file of organization: router.get('/organization/:orgID/item/list', projectControllers)
// get file info of organization: router.get('/organization/:orgID/item/:fileID/info', projectControllers)
// delete file of organization: router.delete('/organization/:orgID/item/:fileID/delete', projectControllers)
// change organization file publicity: router.post('/organization/:orgID/item/:fileID/publicity', projectControllers)

// homepage
// list file of homepage: router.get('/public/item/list', projectControllers)
// get file info of homepage: router.get('/public/item/:fileID/info', projectControllers)
// delete file of homepage: router.delete('/public/item/:fileID/delete', projectControllers)
// change homepage file publicity: router.post('/public/item/:fileID/publicity', projectControllers)

// admin
// check quota of user/project/org/homepage (use above)
// add file to user/project/org/homepage (use upload)
// list file to user/project/org/homepage (use above)
// get file info of user/project/org/homepage (use above)
// delete file of user/project/org/homepage (use above)
// change file publicity (use above)



//---------- default -----------------

router.get('/', (req, res) => {
    res.status(200).json({ status: 200, currentPath: '/v2.1/file/manage' })
})

module.exports = router