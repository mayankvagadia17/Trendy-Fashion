require("dotenv").config();
const { message } = require("prompt");
const Wishlist = require("../models/wishlist");
const jwt = require("jsonwebtoken");
const Products = require("../models/product");
const wishlist = require("../models/wishlist");

const addwishlist = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
      res.status(401).json({
        status: 0,
        message: "Unauthorized",
        data: {},
      });
      return;
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
      if (err) {
        res.status(401).json({
          status: 0,
          message: "Invalid Authentication Token",
          data: {},
        });
        return;
      }

      const { userId, productId } = req.query;

      console.log(userId, productId);

      if (userId && productId) {
        const checkProductExsits = await Products.findOne({ productId });

        console.log(checkProductExsits);

        if (checkProductExsits == null) {
          res.status(200).json({
            status: 0,
            message: "Product not exsits",
            data: {},
          });
          return;
        }

        const checkAlreadyAdded = await wishlist.findOne({
          userId: userId,
          productId: productId,
        });

        if (checkAlreadyAdded) {
          await wishlist.deleteOne({
            userId: userId,
            productId: productId,
          });

          res.status(200).json({
            status: 1,
            message: "Product removed from wishlist",
            data: {},
          });
        } else {
          const newWishlist = new Wishlist({
            userId: userId,
            productId: productId,
          });

          await newWishlist.save({});

          const result = await wishlist.findOne({
            userId: userId,
            productId: productId,
          },{
            _id :0
          });


          res.status(200).json({
            status: 1,
            message: "Product Added to wishlist",
            data: result,
          });
        }
      } else {
        res.status(200).json({
          status: 0,
          message: "Provide User id and product id",
          data: {},
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "internal server error",
      data: {},
    });
  }
};

module.exports = {
  addwishlist,
};
