
const VerifyHR = async(req, res, next) => {
    try {
        const user = req.user;

        if(user.role !== 'hr'){
            return res.status(402).send({
                success: false,
                message:  `Unauthorized User`
            })
        } 
        next()            
        
    } catch (error) {
        res.status(401).send({ error: "Please authenticate." });
    }
};
module.exports = VerifyHR;