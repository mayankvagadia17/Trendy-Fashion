const express = require("express");
const router = express.Router();

const { addwishlist } = require("../controllers/wishlist");

router.route("/addwishlist").post(addwishlist);

module.exports = router;
