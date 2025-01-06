const express = require("express");
const router = express.Router();

const { createProfile, verifyEmail, login } = require("../controllers/users");

router.route("/createProfile").post(createProfile);
router.route("/login").post(login);
router.route("/verifyEmail").post(verifyEmail);

module.exports = router;
