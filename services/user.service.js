/* Find User By ID */

const User = require("../models/User.model");

exports.findUserByIdService = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (err) {
        throw new Error(err.message);
    }
}

exports.findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (err) {
        throw new Error(err.message);
    }
}

