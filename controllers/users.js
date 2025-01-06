const { message } = require("prompt");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

const md5 = require("md5");

const createProfile = async (req, res) => {
  try {
    const { name, email, country, password } = req.query;

    const queryObject = {};

    if (name && email && country && password) {
      const checkUserExsits = await User.findOne({ email });

      if (checkUserExsits) {
        res.status(200).json({
          status: 0,
          message: "user exsits",
          data: checkUserExsits,
        });
      } else {
        const token = jwt.sign({ name: name }, "TravelHive");

        const newUser = new User({
          name: name,
          email: email,
          country: country,
          password: md5(password),
          token: token,
        });
        const result = await newUser.save();
        res.status(200).json({
          status: 1,
          message: "user created successfully",
          data: result,
        });
      }
    } else {
      var errormsg = "Please enter ";
      if (!name) {
        errormsg = errormsg + "username";
      }

      if (!email) {
        errormsg = errormsg + " ,email";
      }

      if (!country) {
        errormsg = errormsg + " ,country";
      }

      if (!password) {
        errormsg = errormsg + " ,password";
      }
      res.status(200).json({
        status: 0,
        message: errormsg + ".",
        data: {},
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 0,
      message: error,
      data: {},
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.query;

    if (email && password) {
      const hash = md5(password);
      const user = await User.findOne({ email: email });
      if (user) {
        const result = hash === user.password;
        if (result) {
          const newtoken = jwt.sign({ name: user.name }, "TravelHive");
          console.log(newtoken);
          const updatedUser = await User.findOneAndUpdate(
            { email: email },
            { token: newtoken }
          );
          const loggedInUser = await User.findOne({ email: email });
          res.status(200).json({
            status: 1,
            message: "Logged in successfully",
            data: loggedInUser,
          });
        } else {
          res.status(200).json({
            status: 0,
            message: "Check your email and password again",
            data: {},
          });
        }
      } else {
        res.status(200).json({
          status: 0,
          message: "User doesn't exsits",
          data: {},
        });
      }
    } else {
      res.status(200).json({
        status: 0,
        message: "Enter valid email and password.",
        data: {},
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 0,
      message: error,
      data: {},
    });
  }
};

module.exports = { createProfile, login };
