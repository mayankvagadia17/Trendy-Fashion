require("dotenv").config();
const jwt = require("jsonwebtoken");
const Products = require("../models/product");
const { message } = require("prompt");

const getAllProduct = async (req, res) => {
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
      const myData = await Products.find(
        {},
        {
          _id: 0,
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

const getFilterProduct = async (req, res) => {
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
      const myData = await Products.find(
        {},
        {
          _id: 0,
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

const addProduct = async (req, res) => {
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

      const { name, price, description, category, gender, images } = req.query;

      console.log(name, price, description, category, gender);
      if (name && price && description && category && gender && images) {
        const checkProductAdded = await Products.findOne({ name });

        if (checkProductAdded) {
          res.status(200).json({
            status: 0,
            message: "Product Already Added",
            data: {},
          });
          return;
        }

        const imageList = images.split(",");

        const newProduct = new Products({
          name: name,
          price: price,
          description: description,
          category: category,
          gender: gender,
          images: imageList,
        });

        const result = await newProduct.save({});

        res.status(200).json({
          status: 1,
          message: "Product Addedd.",
          data: result,
        });
      } else {
        res.status(200).json({
          status: 0,
          message: "All Fields are required",
          data: {},
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      message: "internal server error",
      data: {},
    });
  }
};

module.exports = { getAllProduct, getFilterProduct, addProduct };
