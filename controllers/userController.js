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

exports.updateAllUsers = catchAsync(async (req, res, next) => {
  const updatedUsers = req.body;
  await updatedUsers.forEach(async (user) => {
    const result = await User.findByIdAndUpdate(user._id, user);
    console.log(result);
  });
  res.redirect("/api/allUsers");
});
