const express = require("express");
const router = express.Router();

const { addwishlist, getAllwishlist } = require("../controllers/wishlist");

router.route("/addwishlist").post(addwishlist);
router.route("/getAllwishlist").post(getAllwishlist);

module.exports = router;
