const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { company, name } = req.query;
  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name };
  }

  const myData = await Product.find(queryObject);
  res.status(200).json({ status: 1, message: "Success", data: myData });
};

const getAllProductsTesting = async (req, res) => {
  const myData = await Product.find({}).sort("name");
  res.status(200).json({ status: 1, message: "Success", data: myData });
};

module.exports = { getAllProducts, getAllProductsTesting };
