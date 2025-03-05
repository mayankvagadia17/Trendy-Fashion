const express = require("express");
const router = express.Router();

const { getAllCategory } = require("../controllers/category");

router.route("/getAllCategory").get(getAllCategory);

module.exports = router;
