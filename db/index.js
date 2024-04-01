const mongoose = require("mongoose");
require("dotenv").config();
const dbConnection = mongoose
  // @ts-ignore
  .connect(process.env.DBURL)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("could not connect to MongoDB...", err));

module.exports = dbConnection;
