// path: e.g., src/api/project/projectGlobalRoutes.js
const express = require('express');
const router = express.Router();
const projectGlobalControllers = require('./projectController');
// const isLoggedIn = require('../../../middleware/isLoggedIn'); // Adjust path

// Base path: /project/announcement

// 1. get list all non-specific
router.get('/', /* [isLoggedIn], */ projectGlobalControllers.listGlobalAnnouncementsController);

// 2. add new
router.post('/', /* [isLoggedIn], */ projectGlobalControllers.addGlobalAnnouncementController);

// 3. edit announcement
router.put('/:announcementId', /* [isLoggedIn], */ projectGlobalControllers.editGlobalAnnouncementController);

module.exports = router;