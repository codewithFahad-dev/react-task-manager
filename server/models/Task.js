const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, "Please provide a value"],
    trim: true,
    minLength: [3, "Please provide atleast 3 characters"],
    maxLength: [150, "Please provide a value less than 150 characters"],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
