const User = require("../models/User.model");

/* Get All the candidates with Applied Job */
exports.getAllCandidatesService = async () => {
  try {
    const candidates = await User.find({role: "candidate"}).populate("appliedJobs", "-appliedCandidates -hiringManager -createdAt -updatedAt -__v");
    return {
      success: true,
      message: "Candidates with applied jobs fetched successfully.",
      data: candidates,
    };
  } catch (error) {
    return {
      success: false,
      message: "Server error.",
    };
  }
};
