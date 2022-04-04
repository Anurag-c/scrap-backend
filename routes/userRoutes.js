const express = require("express");
const userController = require("./../controllers/userController");

const router = express.Router();

// protect all routes after this

router.get("/allUsers", userController.getAllUsers);
router.post("/allUsers", userController.updateAllUsers);

router.get("/vnr/1923/allUsers", vnr1923Controller.getAllUsers);
router.post("/vnr/1923/allUsers", vnr1923Controller.updateAllUsers);

module.exports = router;
