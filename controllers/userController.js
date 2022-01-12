const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  users.sort(function (a, b) {
    var keyA = a.overall;
    var keyB = b.overall;
    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;
    return 0;
  });

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

async function updatePastScore(user) {
  let currDate = new Date();
  let pastScores = user.pastScores;
  let n = pastScores.length;
  if (n === 0) {
    pastScores.push({ date: currDate, score: user.overall });
  } else {
    let lastDate = new Date(pastScores[n - 1].date);
    if (lastDate.getDate() === currDate.getDate()) {
      pastScores[n - 1].score = user.overall;
    } else {
      pastScores.push({ date: currDate, score: user.overall });
      if (n + 1 > 5) pastScores.shift();
    }
  }
  return pastScores;
}

exports.updateAllUsers = catchAsync(async (req, res, next) => {
  const updatedUsers = req.body;
  await updatedUsers.forEach(async (user) => {
    user.pastScores = await updatePastScore(user);
    n = user.pastScores.length;
    if (n >= 3 && user.pastScores[n - 1].score > user.pastScores[n - 3].score) {
      user.hasStar = true;
    } else user.hasStar = false;
    const result = await User.findByIdAndUpdate(user._id, user);
    console.log(result);
  });
  res.redirect("/api/allUsers");
});
