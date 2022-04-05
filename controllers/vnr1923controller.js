const catchAsync = require("../utils/catchAsync");
const User = require("../models/vnr1923");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  users.sort(function (a, b) {
    var keyA = a.leetcodeSolved;
    var keyB = b.leetcodeSolved;
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
    pastScores.push({ date: currDate, score: user.leetcodeSolved });
  } else {
    let lastDate = new Date(pastScores[n - 1].date);
    if (lastDate.getDate() === currDate.getDate()) {
      pastScores[n - 1].score = user.leetcodeSolved;
    } else {
      pastScores.push({ date: currDate, score: user.leetcodeSolved });
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
    var inc = 0;
    for (let i = 1; i < n; i++) {
      if (user.pastScores[i].score > user.pastScores[i - 1].score) {
        inc++;
      }
    }

    if (inc == 4) user.stars = 2;
    else if (inc >= 2) user.stars = 1;
    else user.stars = 0;

    const result = await User.findByIdAndUpdate(user._id, user);
    console.log(result);
  });
  res.redirect("/api/vnr/1923/allUsers");
});
