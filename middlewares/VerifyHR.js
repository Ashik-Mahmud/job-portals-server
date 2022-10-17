const jwt = require('jsonwebtoken');

const VerifyHR = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access"
            })
        }
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        if(decoded.role !== "HR") {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access"
            })
        }
        const user = await User.findOne({ _id: decoded._id, "tokens.token": token });
        if (!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate." });
    }
};
module.exports = VerifyHR;