const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

/* Verify Token */
const VerifyToken = async(req, res) =>{
    const token = req.headers.authorization.split(" ")[1];
    if(!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized Access"
        })
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({ _id: decoded._id });
    if (!user) {
        throw new Error();
    }
    req.token = token;
    req.user = user;
    next();  

}

module.exports = VerifyToken;