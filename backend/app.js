require("dotenv").config();
const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const PORT = process.env.PORT || 5000;

const user_routes = require("./routes/users");
const product_routes = require("./routes/product");

const product = require("./models/product");
const product_json = require("./models/product.json");

app.use("/user", user_routes);
app.use("/api/product", product_routes);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`${PORT} Yes I am conneced`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
