const Job = require("../models/Jobs.model")

/* Save Job For Hr */
exports.saveJobByHrService = async(data) => {
    const result = await Job.create(data);
    return result;
}