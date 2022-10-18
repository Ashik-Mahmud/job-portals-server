const VerifyCandidate = async (req, res, next) => {
  try {
    const user = req.user;  
    if (user.role !== "candidate") {
      return res.status(402).send({
        success: false,
        message: `Unauthorized User`,
      });
    }
    next();
  } catch (err) {
    res.status(404).send({
      success: false,
      message: `Server Error ${err}`,
    });
  }
};

module.exports = VerifyCandidate;
