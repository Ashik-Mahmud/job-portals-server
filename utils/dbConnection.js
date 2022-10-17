const mongoose = require("mongoose");

const dbConnection = () => {
  const db = mongoose
    .connect(process.env.DB_STRING, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log(err);
    });
  return db;
};
module.exports = dbConnection;
