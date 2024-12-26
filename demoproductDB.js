require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/demoproducts");

const ProductJson = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    await Product.create(ProductJson);
    console.log("Success");
  } catch (error) {
    console.log(error);
  }
};

start();
