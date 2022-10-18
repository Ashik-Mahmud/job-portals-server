/* get all the candidates with applied job */

const { getAllCandidatesService } = require("../services/admin.service");

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


module.exports = {getAllCandidatesWithAppliedJobs}