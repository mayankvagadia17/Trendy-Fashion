const express = require("express");
const router = express.Router();

const {
  createProfile,
  verifyEmail,
  login,
  resendCode,
} = require("../controllers/users");

router.route("/createProfile").post(createProfile);
router.route("/login").post(login);
router.route("/verifyEmail").post(verifyEmail);
router.route("/resendCode").post(resendCode);

module.exports = router;
