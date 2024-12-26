require("dotenv").config();
const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const PORT = process.env.PORT || 5000;

const demoproducts_routes = require("./routes/demoproducts");

app.get("/", (req, res) => {
  res.send("Hi, I am live");
});

app.use("/api/products", demoproducts_routes);

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
