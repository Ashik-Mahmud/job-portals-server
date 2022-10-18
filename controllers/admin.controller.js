/* get all the candidates with applied job */

const getAllCandidatesWithAppliedJobs = async (req, res) => {
  try {
    const candidates = await Candidate.find({}).populate("appliedJobs");
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