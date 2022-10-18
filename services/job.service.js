const Job = require("../models/Jobs.model")

/* Save Job For Hr */
exports.postJobByHrService = async(data) => {
    const result = await Job.create(data);
    return result;
}

/* Get All the Jobs by Public */
exports.findAllJobService = async(filters) =>{
    const result = await Job.find(filters);
    return result;
}