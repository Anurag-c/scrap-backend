const mongoose = require("mongoose");
const validator = require("validator");

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
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "please provide a valid Email"],
  },
  phone: {
    type: Number,
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
  hackerrank: {
    type: String,
  },
  leetcode: {
    type: String,
  },
  hackerrankSolved: {
    type: Number,
  },
  leetcodeSolved: {
    type: Number,
  },
  ppSolved: {
    type: Number,
  },
  overall: {
    type: Number,
  },
  pastScores: [scoreSchema],
  hasStar: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("priyadarshini2021", userSchema);
module.exports = User;
