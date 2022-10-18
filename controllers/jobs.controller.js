const Job = require("../models/Jobs.model");
const { postJobByHrService } = require("../services/job.service");

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

  try {
    const job = await postJobByHrService({
      ...req.body,
      hiringManager: req.user._id,
    });
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
const getAllJobs = async (req, res) => {
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
    const job = await Job.findOne({ _id, hiringManager: req.user._id });
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

module.exports = { postJob, getAllJobs, getJobById };
