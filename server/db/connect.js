const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    return console.log("Connected to DB");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
