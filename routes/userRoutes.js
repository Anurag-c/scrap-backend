const express = require("express");
const userController = require("./../controllers/userController");

const router = express.Router();

// protect all routes after this

router.get("/allUsers", userController.getAllUsers);
router.post("/allUsers", userController.updateAllUsers);

module.exports = router;
