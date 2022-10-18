const User = require("../models/User.model");

/* Get All the candidates with Applied Job */
exports.getAllCandidatesService = async () => {
  try {
    const candidates = await User.find({ role: "candidate" }).populate(
      "appliedJobs",
      "-appliedCandidates -hiringManager -createdAt -updatedAt -__v -postedJobs"
    ).select("-postedJobs");
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

/* Get Candidate By ID */
exports.getCandidateByIdService = async (_id) => {
  return await User.findOne({ _id, role: "candidate" }).populate(
    "appliedJobs",
    "-appliedCandidates  -hiringManager -createdAt -updatedAt -__v"
  ).select("-postedJobs");
};

/* Get All hrs with posting job */
exports.getAllHrsServices = async () => {
  return await User.find({ role: "hr" }).populate("postedJobs", "-hiringManager -appliedCandidates -updatedAt -__v").select("-appliedJobs ");
};
