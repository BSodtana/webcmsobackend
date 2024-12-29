const express = require("express");
const router = express.Router();

// /v2.1/file/manage

// todo

// user
// check quota of user: router.get('/user/quota', projectControllers)
// list file of user: router.get('/user/item/list', projectControllers)
// get file info of user: router.get('/user/item/:fileID/info', projectControllers)
// delete file of user: router.delete('/user/item/:fileID/delete', projectControllers)
// change file publicity: router.post('/user/item/:fileID/publicity', projectControllers)

// project
// check quota of project: router.get('/project/:projectID/quota', projectControllers)
// list file of project: router.get('/project/:projectID/item/list', projectControllers)
// get file info of project: router.get('/project/:projectID/item/:fileID/info', projectControllers)
// delete file of project: router.delete('/project/:projectID/item/:fileID/delete', projectControllers)
// change project file publicity: router.post('/project/:projectID/item/:fileID/publicity', projectControllers)

// organization
// check quota of organization: router.get('/organization/:orgID/quota', projectControllers)
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