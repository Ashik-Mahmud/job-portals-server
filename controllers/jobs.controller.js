/* Post Job from Hiring Manager */
const postJob = async (req, res) => {
  
  const {title, position, description, location, jobType, workType, salary, employees, company, vacancy, deadLine} = req.body;

  if(!title || !position || !description || !location || !jobType || !workType || !salary || !employees || !company || !vacancy || !deadLine){
    return res.status(403).send({
        success: false,
        message: 'All fields are required.'
    })
  }
    
  res.status(202).send({
    success: true,
    message: "Job Posted Successfully",
  });
};



module.exports = {postJob}