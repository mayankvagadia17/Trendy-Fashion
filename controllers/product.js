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

      const { category, filter } = req.query;

      req.user = user;

      let sortQuery = {};
      let query = {};

      if (category == "" || category == "All") {
        if (filter == "" || filter == "All") {
          const myData = await Products.find(
            {},
            {
              _id: 0,
            }
          );
          if (myData) {
            res
              .status(200)
              .json({ status: 1, message: "Success", data: myData });
          } else {
            res.status(200).json({ status: 1, message: "Success", data: {} });
          }
        } else {
          if (filter == "Newest") {
            sortQuery.createdAt = -1;
          } else if (filter == "Popular") {
            sortQuery.rating = -1;
          } else if (filter == "Man") {
            query.gender = "Man";
          } else if (filter == "Woman") {
            query.gender = "Woman";
          } else if (filter == "Both") {
            query.gender = "Both";
          }
          const myData = await Products.find(query, {
            _id: 0,
          }).sort(sortQuery);
          if (myData) {
            res
              .status(200)
              .json({ status: 1, message: "Success", data: myData });
          } else {
            res.status(200).json({ status: 1, message: "Success", data: {} });
          }
        }
      } else {
        query.category = category;
        if (filter == "Newest") {
          sortQuery.createdAt = -1;
        } else if (filter == "Popular") {
          sortQuery.rating = -1;
        } else if (filter == "Man") {
          query.gender = "Man";
        } else if (filter == "Woman") {
          query.gender = "Woman";
        } else if (filter == "Both") {
          query.gender = "Both";
        }
        const myData = await Products.find(query, {
          _id: 0,
        }).sort(sortQuery);
        if (myData) {
          res.status(200).json({ status: 1, message: "Success", data: myData });
        } else {
          res.status(200).json({ status: 1, message: "Success", data: {} });
        }
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

      const {
        name,
        price,
        description,
        category,
        gender,
        images,
        s,
        m,
        l,
        xl,
        xxl,
        rating,
        rating_count,
        discount,
      } = req.query;

      console.log(
        name,
        price,
        description,
        category,
        gender,
        s,
        m,
        l,
        xl,
        xxl,
        rating,
        rating_count,
        discount
      );
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

        let final_rating_count = 0;
        let final_rating = 0;
        let final_discount = 0;
        let f_final_price = price;

        if (rating) {
          final_rating = rating;
        }
        if (rating_count) {
          final_rating_count = rating_count;
        }
        if (discount) {
          final_discount = discount;
          let discountAmount = (price * discount) / 100;
          f_final_price = price - discountAmount;
        }

        const newProduct = new Products({
          name: name,
          price: price,
          description: description,
          category: category,
          gender: gender,
          images: imageList,
          stock: {
            S: s,
            M: m,
            L: l,
            XL: xl,
            XXL: xxl,
          },
          rating: final_rating,
          rating_count: final_rating_count,
          discount: final_discount,
          finalPrice: f_final_price,
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
