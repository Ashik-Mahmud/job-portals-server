const AppliedJob = require("../models/AppliedJob.model");
const Job = require("../models/Jobs.model");
const User = require("../models/User.model");

/* Save Job For Hr */
exports.postJobByHrService = async (data, _id) => {
  const result = await Job.create(data);
  await User.findByIdAndUpdate(
    _id,
    { $push: { postedJobs: result._id } },
    { new: true }
  );
  return result;
};

/* Get All the Jobs by Public */
exports.findAllJobService = async (filters, sortBy) => {
  const result = await Job.find(filters)
    .sort(sortBy)
    .select("-appliedCandidates");
  return result;
};

/* Find Job by ID */
exports.findJobById = async (id) => {
  const result = await Job.findById(id);
  return result;
};

/* Apply Job Services */
exports.applyJobService = async ({ jobId, candidate, infoId }) => {
  await User.findByIdAndUpdate(candidate, { $push: { appliedJobs: jobId } });
  const result = await Job.findByIdAndUpdate(
    jobId,
    { $push: { appliedCandidates: { candidate, candidateInfo: infoId } } },
    { new: true }
  );
  return result;
};

/* Saved Job for Applied Candidate */
exports.saveAppliedCandidateInfoService = async (data, candidate, jobId) => {
  const result = await AppliedJob.create({
    ...data,
    user: candidate,
    job: jobId,
  });
  return result;
};
