const Job = require("../models/Jobs.model");
const {
  postJobByHrService,
  findAllJobService,
} = require("../services/job.service");

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
  const {location, jobType, workType, salaryTo, salaryFrom, sortBy} = req.query;
          
  try {
    let filters = {};

    /* Filtered by location */
    if(location){
        const query = new RegExp(location, 'i');
        filters = {...filters, location: query}          
    }

    /* Filtered by jobType */
    if(jobType){
        const query = new RegExp(jobType, 'i');
        filters = {...filters, jobType: query}
    }

    /* Filtered by workType */
    if(workType){
        const query = new RegExp(workType, 'i');
        filters = {...filters, workType: query}
    }

    /* Filtered by salaryTo */
    if(salaryTo || salaryFrom){
        filters = {...filters, salary: {$gte: salaryFrom, $lte: salaryTo}}
    }

    /* Filtered by sortBy */
  
   

    const jobs = await findAllJobService(filters, sortBy);
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

module.exports = { postJob, getAllJobsByHr, getJobById, updateJobById, getAllJobs };
