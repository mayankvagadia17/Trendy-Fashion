require("dotenv").config();
const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const PORT = process.env.PORT || 5000;

const demoproducts_routes = require("./routes/demoproducts");
const user_routes = require("./routes/users");

app.get("/", (req, res) => {
  res.send("Hi, I am live");
});

app.use("/api/products", demoproducts_routes);
app.use("/user", user_routes);

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
