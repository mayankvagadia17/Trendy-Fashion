require("dotenv").config();
const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const PORT = process.env.PORT || 5000;

const user_routes = require("./routes/users");
const product_routes = require("./routes/product");
const category_routes = require("./routes/category");

const product = require("./models/product");
const product_json = require("./models/product.json");
const category = require("./models/category");
const category_json = require("./models/category.json");

app.use("/user", user_routes);
app.use("/api/product", product_routes);
app.use("/api/category", category_routes);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    await category.deleteMany({});
    await category.create(category_json);
    app.listen(PORT, () => {
      console.log(`${PORT} Yes I am conneced`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
