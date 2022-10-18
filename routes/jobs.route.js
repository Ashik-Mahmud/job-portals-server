const router = require('express').Router();
const VerifyHr = require("../middlewares/VerifyHR");
const VerifyToken = require('../middlewares/VerifyToken');
// Import Controller
const jobsController = require('./../controllers/jobs.controller');


// Import Middleware


/**
 * Init Routes 
 * 
 */ 

// @route POST api/jobs
// @desc Create a Job by Hiring Manager
// @access secured
router.post('/', VerifyToken, VerifyHr, jobsController.postJob);

// @route GET api/jobs
// @desc Get all Jobs
// @access secured
router.get('/manager', VerifyToken, VerifyHr, jobsController.getAllJobs);

// Export Router
module.exports = router;