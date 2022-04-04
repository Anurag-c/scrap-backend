const mongoose = require("mongoose");
const scoreSchema = new mongoose.Schema({
  date: Date,
  score: Number,
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
    trim: true,
  },
  phone: {
    type: String,
  },
  roll: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "A user should have a roll number"],
  },
  branch: {
    type: String,
    required: [true, "A user should have a branch"],
  },
  leetcode: {
    type: String,
  },
  leetcodeScore: {
    type: {
      solved: Number,
      rating: Number,
    },
  },
  leetcodeSolved: {
    type: Number,
    default: 0,
  },
  pastScores: [scoreSchema],
  stars: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("vnr19-23", userSchema);
module.exports = User;
