/* get all the candidates with applied job */

const User = require("../models/User.model");
const { getAllCandidatesService, getCandidateByIdService } = require("../services/admin.service");

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
    const candidate = await getCandidateByIdService(_id)
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

module.exports = { getAllCandidatesWithAppliedJobs, getCandidateById };
