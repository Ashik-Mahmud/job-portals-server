const Job = require("../models/Jobs.model")

/* Save Job For Hr */
exports.postJobByHrService = async(data) => {
    const result = await Job.create(data);
    return result;
}