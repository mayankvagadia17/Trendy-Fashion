const express = require("express");
const router = express.Router();

const {
  getAllProduct,
  getFilterProduct,
  addProduct,
  deleteProduct,
} = require("../controllers/product");

router.route("/getAllProduct").get(getAllProduct);
router.route("/getFilterProduct").post(getFilterProduct);
router.route("/addProduct").post(addProduct);
router.route("/deleteProduct").post(deleteProduct);

module.exports = router;
