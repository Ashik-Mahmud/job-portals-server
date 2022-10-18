/* get all the candidates with applied job */

const User = require("../models/User.model");
const {
  getAllCandidatesService,
  getCandidateByIdService,
  getAllHrsServices,
} = require("../services/admin.service");
const { findUserByIdService } = require("../services/user.service");

const getAllCandidatesWithAppliedJobs = async (req, res) => {
  try {
    const candidates = await getAllCandidatesService();
    res.status(200).send({
      success: true,
      message: "Candidates with applied jobs fetched successfully.",
      data: candidates,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server error.",
    });
  }
};

/* get candidate by id */
const getCandidateById = async (req, res) => {
  const _id = req.params.id;
  try {
    const candidate = await getCandidateByIdService(_id);
    if (!candidate) {
      return res.status(404).send({
        success: false,
        message: "Candidate not found.",
      });
    }
    res.status(200).send({
      success: true,
      message: "Candidate fetched successfully.",
      data: candidate,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server error.",
    });
  }
};

/* Get All the HRs */

const getAllTheHrs = async (req, res) => {
  try {
    const hrs = await getAllHrsServices();
    if (!hrs) {
      return res.status(404).send({
        success: false,
        message: "Hiring Manager not found.",
      });
    }
    res.status(202).send({
      success: true,
      message: "Fetched all the hiring manager",
      data: hrs,
    });
  } catch (error) {
    res.status(405).send({
      success: false,
      message: "server error" + error,
    });
  }
};

/* Change Role to the Hiring Manager */
const changeRole = async (req, res) => {
  const _id = req.params.id;
  const { role } = req.body;
  try {
    console.log(_id);
    const user = await findUserByIdService(_id);
        
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Does not exist",
      });
    }

    /* if (user.role !== "hr") {
      return res.status(404).send({
        success: false,
        message:
          "This user is not Hiring Manager, You only can change role of Hiring Manager.",
      });
    }
   */
    user.role = role;
    user.save();
    res.status(200).send({
      success: true,
      message: "Role successfully changed to " + role,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Server Error" + error,
    });
  }
};

module.exports = {
  getAllCandidatesWithAppliedJobs,
  getCandidateById,
  getAllTheHrs,
  changeRole,
};
