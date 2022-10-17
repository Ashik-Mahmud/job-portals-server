const router = require('express').Router();

// Import Controller
const jobsController = require('./../controllers/jobs.controller');

// Import Middleware


// Init Routes

// @route POST api/jobs
// @desc Create a Job by Hiring Manager
// @access secured
router.post('/', jobsController.postJob);

// Export Router
module.exports = router;