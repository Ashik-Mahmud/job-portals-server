const router = require('express').Router();

const VerifyHr = require("../middlewares/VerifyHR");
const VerifyToken = require('../middlewares/VerifyToken');
const VerifyAdmin = require("../middlewares/VerifyAdmin")

// Import Controller
const jobsController = require('./../controllers/admin.controller');


// Import Middleware

router.get("/candidates", VerifyToken, VerifyAdmin, jobsController.getAllCandidatesWithAppliedJobs);
router.get("/candidates/:id", VerifyToken, VerifyAdmin, jobsController.getCandidateById);


module.exports = router;