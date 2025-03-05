const express = require("express");
const router = express.Router();

const {
  createProfile,
  verifyEmail,
  login,
  resendCode,
  forgotPassword,
  updatePassword,
  editProfile,
  getAllUsers,
} = require("../controllers/users");

router.route("/createProfile").post(createProfile);
router.route("/login").post(login);
router.route("/verifyEmail").post(verifyEmail);
router.route("/resendCode").post(resendCode);
router.route("/forgotPassword").post(forgotPassword);
router.route("/updatePassword").post(updatePassword);
router.route("/editProfile").post(editProfile);
router.route("/getAllUsers").get(getAllUsers);

module.exports = router;
