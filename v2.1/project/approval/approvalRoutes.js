const express = require("express");
const router = express.Router();
const  middleware = require('./_middleware')
const approvalControllers = require('./approval/approvalControllers')

router.get('/data', [isProjectOwner()], approvalControllers.getAllApprovalData)
