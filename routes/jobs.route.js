const router = require('express').Router();
const VerifyHr = require("../middlewares/VerifyHR")
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
router.post('/', VerifyHr, jobsController.postJob);

// Export Router
module.exports = router;