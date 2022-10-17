const mongoose = require('mongoose');
const dbConnection = () => {
  const db = mongoose.connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  return db;
};
module.exports = dbConnection;
