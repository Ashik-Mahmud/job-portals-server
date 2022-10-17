/* Post Job from Hiring Manager */
const postJob = async (req, res) => {
  res.status(202).send({
    success: true,
    message: "Job Posted Successfully",
  });
};



module.exports = {postJob}