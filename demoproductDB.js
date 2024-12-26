require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/demoproducts");
const User = require("./models/users");

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    await User.create();
    console.log("Success");
  } catch (error) {
    console.log(error);
  }
};

start();
