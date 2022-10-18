const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const VerifyHR = async(req, res, next) => {
    try {
        const user = req.user;
        console.log(user);
                
       
        
    } catch (error) {
        res.status(401).send({ error: "Please authenticate." });
    }
};
module.exports = VerifyHR;