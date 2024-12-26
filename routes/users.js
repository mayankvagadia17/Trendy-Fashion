const express = require("express");
const router = express.Router();

const { createProfile, login } = require("../controllers/users");

router.route("/createProfile").post(createProfile);
router.route("/login").post(login);

module.exports = router;