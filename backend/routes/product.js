const express = require("express");
const router = express.Router();

const {
  getAllProduct,
  getFilterProduct,
  addProduct,
} = require("../controllers/product");

router.route("/getAllProduct").get(getAllProduct);
router.route("/getFilterProduct").post(getFilterProduct);
router.route("/addProduct").post(addProduct);

module.exports = router;
