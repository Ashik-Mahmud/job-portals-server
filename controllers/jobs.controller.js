const Job = require("../models/Jobs.model");
const {
  postJobByHrService,
  findAllJobService,
  findJobById,
  applyJobService,
  saveAppliedCandidateInfoService,
} = require("../services/job.service");
const { findUserByIdService } = require("../services/user.service");

/* Post Job from Hiring Manager */
const postJob = async (req, res) => {
  const {
    title,
    position,
    description,
    location,
    jobType,
    workType,
    salary,
    employees,
    company,
    vacancy,
    deadLine,
  } = req.body;

  if (
    !title ||
    !position ||
    !description ||
    !location ||
    !jobType ||
    !workType ||
    !salary ||
    !employees ||
    !company ||
    !vacancy ||
    !deadLine
  ) {
    return res.status(403).send({
      success: false,
      message: "All fields are required.",
    });
  }

  const todayDate = Date.now();
  const days = deadLine * 24 * 60 * 60 * 1000;
  const increaseDate = todayDate + days;

  try {
    const job = await postJobByHrService(
      {
        ...req.body,
        deadLine: increaseDate,
        hiringManager: req.user._id,
      },
      req.user._id
    );
    res.status(201).send({
      success: true,
      message: "Job posted successfully.",
      data: job,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server error.",
    });
  }
};

/* Get All Jobs */
const getAllJobsByHr = async (req, res) => {
  try {
    const jobs = await Job.find({ hiringManager: req.user._id }).populate(
      "hiringManager",
      "name email"
    );
    res.status(200).send({
      success: true,
      message: "All jobs fetched successfully.",
      data: jobs,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server error.",
    });
  }
};

/* Get Job By Id */
const getJobById = async (req, res) => {
  const _id = req.params.id;
  try {
    const job = await Job.findOne({
      _id,
      hiringManager: req.user._id,
    }).populate(
      "appliedCandidates.candidate appliedCandidates.candidateInfo",
      "-createdAt -updatedAt -__v -job -user -_id"
    );
    if (!job) {
      return res.status(404).send({
        success: false,
        message: "Job not found.",
      });
    }
    res.status(200).send({
      success: true,
      message: "Job fetched successfully.",
      data: job,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server error.",
    });
  }
};

/* Update Job By Id */
const updateJobById = async (req, res) => {
  const _id = req.params.id;
  const data = req.body;
  try {
    const job = await Job.findOneAndUpdate(
      { _id, hiringManager: req.user._id },
      data,
      { new: true }
    );
    if (!job) {
      return res.status(404).send({
        success: false,
        message: "Job not found.",
      });
    }
    res.status(200).send({
      success: true,
      message: "Job updated successfully.",
      data: job,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server error.",
    });
  }
};

/* 
 Public Routes 
*/

/* get All Jobs */
const getAllJobs = async (req, res) => {
  const { location, jobType, workType, salaryTo, salaryFrom, sortBy } =
    req.query;

  try {
    let filters = { status: "active" };
    let sort = {};
    /* Filtered by location */
    if (location) {
      const query = new RegExp(location, "i");
      filters = { ...filters, location: query };
    }

    /* Filtered by jobType */
    if (jobType) {
      const query = new RegExp(jobType, "i");
      filters = { ...filters, jobType: query };
    }

    /* Filtered by workType */
    if (workType) {
      const query = new RegExp(workType, "i");
      filters = { ...filters, workType: query };
    }

    /* Filtered by salaryTo */
    if (salaryTo || salaryFrom) {
      filters = { ...filters, salary: { $gte: salaryFrom, $lte: salaryTo } };
    }

    /* Filtered by sortBy */
    if (sortBy) {
      const sortItems = sortBy.split(",").join(" ");
      sort = sortItems;
    }

    const jobs = await findAllJobService(filters, sort);
    if (!jobs) {
      return res.status(404).send({
        success: false,
        message: "Jobs not found",
      });
    }
    const count = await Job.countDocuments();

    res.status(202).send({
      success: true,
      message: `Jobs found`,
      data: jobs,
      count: count,
    });
  } catch (err) {
    res.status(505).send({
      success: false,
      message: `Server Error ${err}`,
    });
  }
};

/* Get job by id */
const getJobByJobId = async (req, res) => {
  const _id = req.params.id;
  try {
    const job = await Job.findOne({ _id }).populate(
      "hiringManager",
      "name email role socialLinks"
    );
    if (!job) {
      return res.status(404).send({
        success: false,
        message: "Job not found.",
      });
    }
    res.status(200).send({
      success: true,
      message: "Job fetched successfully.",
      data: job,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server error." + error,
    });
  }
};

/* Apply Job for */
const applyJob = async (req, res) => {
  const _id = req.params.id;

  const { coverLetter, resume, portfolio, linkedIn, github } = req.body;

  if (!coverLetter || !resume || !portfolio || !linkedIn || !github) {
    return res.status(403).send({
      success: false,
      message: "All fields are required.",
    });
  }

  try {
    const candidate = req.user._id;
    const job = await findJobById(_id);
    const user = await findUserByIdService(candidate);

    if (!job)
      return res.status(404).send({
        success: false,
        message: "Job not found.",
      });

    if (!user)
      return res.status(404).send({
        success: false,
        message: "User not found",
      });

    const isExpired = job.deadLine < Date.now();
    if (isExpired) {
      return res.status(403).send({
        success: false,
        message: "Job is expired.",
      });
    }
    const isApplied = await Job.findOne({
      $and: [{ _id }, { "appliedCandidates.candidate": candidate }],
    });
    if (isApplied)
      return res.status(400).send({
        success: false,
        message: "You have already applied for this job.",
      });

    const savedAppliedCandidateInfo = await saveAppliedCandidateInfoService(
      req.body,
      candidate,
      _id
    );
    const applyJob = await applyJobService({
      candidate,
      jobId: _id,
      infoId: savedAppliedCandidateInfo._id,
    });

    if (!applyJob)
      return res.status(400).send({
        success: false,
        message: "Something went wrong.",
      });

    res.status(202).send({
      success: true,
      message: "Applied Job successfully done.",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server error." + error,
    });
  }
};

/* Get Top 10 Highest Paid Job */
const getTop10HighestPaidJob = async (req, res) => {
  try {
    const jobs = await Job.find({})
      .sort("-salary")
      .select("-appliedCandidates")
      .limit(10);
    if (!jobs)
      return res
        .status(404)
        .send({ success: false, message: "Jobs not found" });

    res.status(202).send({
      success: true,
      message: "Fetched Jobs",
      data: jobs,
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: `Server Error ${err}`,
    });
  }
};

/* get most applied jobs */
const getTopMostAppliedJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}).sort("-appliedCandidates");
    res.status(202).send({
      success: true,
      message: "fetched jobs",
      data: jobs,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Server Error" + error,
    });
  }
};

module.exports = {
  postJob,
  getAllJobsByHr,
  getJobById,
  updateJobById,
  getAllJobs,
  getJobByJobId,
  applyJob,
  getTop10HighestPaidJob,
  getTopMostAppliedJobs,
};
