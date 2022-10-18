const router = require('express').Router();

const VerifyHr = require("../middlewares/VerifyHR");
const VerifyToken = require('../middlewares/VerifyToken');
const VerifyAdmin = require("../middlewares/VerifyAdmin")

// Import Controller
const jobsController = require('./../controllers/admin.controller');


// Import Middleware

// @route GET api/admin/candidates
// @desc Get all the candidates with Applied Jobs
// @access private for admin
router.get("/candidates", VerifyToken, VerifyAdmin, jobsController.getAllCandidatesWithAppliedJobs);

// @route Get api/admin/candidates/:id
// @desc get candidates details by Id 
// @access private 
router.get("/candidates/:id", VerifyToken, VerifyAdmin, jobsController.getCandidateById);

// @route GET api/admin/hrs
// @desc get all the hrs with posting job
// @access private
router.get("/hrs", VerifyToken, VerifyAdmin, jobsController.getAllTheHrs)


module.exports = router;