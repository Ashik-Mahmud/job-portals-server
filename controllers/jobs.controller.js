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
    const job = await postJobByHrService({...req.body, hiringManager: req.user._id});
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

module.exports = { postJob };
