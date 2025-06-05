// src/api/students/studentRoutes.js
const express = require('express');
const router = express.Router();

const studentControllers = require('./studentControllers');

const isLoggedIn = require('../../../_middleware/isLoggedIn');
const allowedByUserType = require('../../../_middleware/allowedByUserType');

// Base path: /v2.1/manage/account/users

// ./list GET: get list of all students (filtered by year, studentID - 50 per page )
router.get('/list', [isLoggedIn(), allowedByUserType({ userType: ['ADMIN'] })], studentControllers.listStudentsController);

// ./new POST: new student personal data
router.post('/new', [isLoggedIn(), allowedByUserType({ userType: ['ADMIN'] })], studentControllers.createStudentController);

// ./:studentID
// GET: get student personal data
router.get('/:studentID', /* [isLoggedIn], */ studentControllers.getStudentController);
// PUT: edit student personal data
router.put('/:studentID', /* [isLoggedIn], */ studentControllers.updateStudentController);
// DELETE:delete student data
router.delete('/:studentID', /* [isLoggedIn], */ studentControllers.deleteStudentController);

// ./:studentID/affiliate
// GET: get user own org affiliations
// router.get('/:studentID/affiliate', /* [isLoggedIn], */ studentControllers.getStudentAffiliationsController);
// PUT: assign user to an org
// router.put('/:studentID/affiliate', /* [isLoggedIn], */ studentControllers.assignStudentToOrgController);
// DELETE:delete student data from an org (specific affiliation)
// To be truly RESTful and specific, using affiliationID is better if available.
// If deleting by studentID and orgID, ensure your service logic correctly identifies the single affiliation to remove.
// The SQL schema for `useraffiliation` has `affiliationID` as the PK.
// router.delete('/affiliate/:affiliationID', /* [isLoggedIn], */ studentControllers.removeStudentAffiliationController);


module.exports = router;