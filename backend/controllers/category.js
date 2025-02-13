require("dotenv").config();
const jwt = require("jsonwebtoken");
const Category = require("../models/category");

const getAllCategory = async (req, res) => {
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

      req.user = user;
      const myData = await Category.find(
        {},
        {
          _id: 0,
          __v: 0,
        }
      );
      if (myData) {
        res.status(200).json({ status: 1, message: "Success", data: myData });
      } else {
        res.status(200).json({ status: 1, message: "Success", data: {} });
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
  getAllCategory,
};
