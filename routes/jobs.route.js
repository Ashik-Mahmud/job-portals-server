const router = require("express").Router();
const multer = require("multer");
const VerifyHr = require("../middlewares/VerifyHR");
const VerifyToken = require("../middlewares/VerifyToken");
const VerifyCandidate = require("../middlewares/VerifyCandidate");
// Import Controller
const jobsController = require("./../controllers/jobs.controller");
const {uploadPdfFile} = require("../utils/uploadResume");

// Multer Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    if (file?.mimetype === "application/pdf") {
      cb(null, 'pdf-'+ Date.now() + '-'+ file.originalname);
    } else {
      cb("Please upload pdf file", null);
    }
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

/**
 * Init Routes
 *
 */

// @route POST api/jobs
// @desc Create a Job by Hiring Manager
// @access secured
router.post("/jobs", VerifyToken, VerifyHr, jobsController.postJob);

// @route GET api/jobs
// @desc Get all Jobs
// @access secured
router.get(
  "/manager/jobs",
  VerifyToken,
  VerifyHr,
  jobsController.getAllJobsByHr
);

// @route GET api/jobs/:id
// @desc Get a Job by Id
// @access secured
router.get(
  "/manager/jobs/:id",
  VerifyToken,
  VerifyHr,
  jobsController.getJobById
);

// @route PUT api/jobs/:id
// @desc Update a Job by Id
// @access secured
router.put("/jobs/:id", VerifyToken, VerifyHr, jobsController.updateJobById);

// @route GET api/jobs
// @desc Get All the Jobs
// @access public
router.get("/jobs", jobsController.getAllJobs);

// @route GET api/jobs/top-10-highest-paid
// @desc Get Top 10 Highest Paid Job
// @access public
router.get("/jobs/top-10-highest-paid", jobsController.getTop10HighestPaidJob);

// @route GET api/jobs/top-5-most-applied-job
// @desc Get Top 5 Most Applied Job
// @access public
router.get("/jobs/most-applied", jobsController.getTopMostAppliedJobs);

// @route GET api/jobs/:id
// @desc Get a Job by Id
// @access public
router.get("/jobs/:id", jobsController.getJobByJobId);

// @route POST api/jobs/:id/apply
// @desc Apply to the Particular Job
// @access secured
router.post(
  "/jobs/:id/apply",
  VerifyToken,
  VerifyCandidate,
  upload.single("resume"),
  uploadPdfFile,
  jobsController.applyJob
);

// Export Router
module.exports = router;
