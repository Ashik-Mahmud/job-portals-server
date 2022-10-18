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
router.post('/jobs', VerifyToken, VerifyHr, jobsController.postJob);

// @route GET api/jobs
// @desc Get all Jobs
// @access secured
router.get('/manager/jobs', VerifyToken, VerifyHr, jobsController.getAllJobs);

// @route GET api/jobs/:id
// @desc Get a Job by Id
// @access secured
router.get('/manager/jobs/:id', VerifyToken, VerifyHr, jobsController.getJobById);

// Export Router
module.exports = router;