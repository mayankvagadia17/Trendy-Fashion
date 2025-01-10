require("dotenv").config();
const { message } = require("prompt");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const SendVerificationCode = require("../middleware/Email");

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
          data: {},
        });
      } else {
        const checkUsernameExsits = await User.findOne({ name });

        if (checkUsernameExsits) {
          res.status(200).json({
            status: 0,
            message: "username already used",
            data: {},
          });
        } else {
          // Create 6 digit verification code
          const verificationCode = Math.floor(
            100000 + Math.random() * 900000
          ).toString();

          // Create User with Token and save in DB
          const token = jwt.sign({ name: name }, process.env.SECRET_KEY);

          const newUser = new User({
            name: name,
            email: email,
            country: country,
            password: md5(password),
            token: token,
            verificationCode: verificationCode,
          });
          const result = await newUser.save();
          const loggedInUser = await User.findOne(
            {
              name: newUser.name,
            },
            {
              userId: 1,
              email: 1,
              _id: 0,
              name: 1,
              country: 1,
              token: 1,
              isVerified: 1,
              verificationCode: 1,
            }
          );
          SendVerificationCode.sendVerificationCode(email, verificationCode);
          res.status(200).json({
            status: 1,
            message: "User Register Successfully",
            data: loggedInUser,
          });
        }
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
    res.status(500).json({
      status: 0,
      message: "internal server error",
      data: {},
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { verificationCode, email } = req.query;
    if ((verificationCode, email)) {
      const checkEmailExsits = await User.findOne({ email });

      if (checkEmailExsits) {
        if (checkEmailExsits.isVerified) {
          res.status(200).json({
            status: 0,
            message: "User Already Verified",
            data: {},
          });
        } else {
          if (checkEmailExsits.verificationCode === verificationCode) {
            const newtoken = jwt.sign(
              { name: checkEmailExsits.name },
              process.env.SECRET_KEY
            );
            console.log(newtoken);
            const updatedUser = await User.findOneAndUpdate(
              { verificationCode: verificationCode },
              { token: newtoken, isVerified: true }
            );
            const loggedInUser = await User.findOne(
              {
                name: checkEmailExsits.name,
              },
              {
                userId: 1,
                email: 1,
                _id: 0,
                name: 1,
                country: 1,
                token: 1,
                isVerified: 1,
              }
            );
            res.status(200).json({
              status: 1,
              message: "Profile verified successfully",
              data: loggedInUser,
            });
          } else {
            res.status(200).json({
              status: 0,
              message: "Check your verification code again",
              data: {},
            });
          }
        }
      } else {
        res.status(200).json({
          status: 0,
          message: "Check your verification code again",
          data: {},
        });
      }
    } else {
      res.status(200).json({
        status: 0,
        message: "Please enter verification code and email both",
        data: {},
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "internal server error",
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
        if (user.isVerified) {
          const result = hash === user.password;
          if (result) {
            const newtoken = jwt.sign(
              { name: user.name },
              process.env.SECRET_KEY
            );
            console.log(newtoken);
            const updatedUser = await User.findOneAndUpdate(
              { email: email },
              { token: newtoken }
            );
            const loggedInUser = await User.findOne(
              { email: email },
              {
                userId: 1,
                email: 1,
                _id: 0,
                name: 1,
                country: 1,
                token: 1,
                isVerified: 1,
              }
            );
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
          const verificationCode = Math.floor(
            100000 + Math.random() * 900000
          ).toString();

          const updatedUser = User.findOneAndUpdate(
            { email: email },
            { verificationCode: verificationCode }
          );
          SendVerificationCode.sendVerificationCode(email, verificationCode);
          res.status(200).json({
            status: 0,
            message: "User is not verified",
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
    res.status(500).json({
      status: 0,
      message: "internal server error",
      data: {},
    });
  }
};

const resendCode = async (req, res) => {
  try {
    const { email } = req.query;

    const checkUserExsits = await User.findOne({ email });

    if (checkUserExsits) {
      const verificationCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      const updatedUser = await User.findOneAndUpdate(
        { email: email },
        { verificationCode: verificationCode }
      );
      SendVerificationCode.sendVerificationCode(email, verificationCode);
      res.status(200).json({
        status: 1,
        message: "Code sent successfully",
        data: {},
      });
    } else {
      res.status(200).json({
        status: 0,
        message: "Check your email address again",
        data: {},
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "internal server error",
      data: {},
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.query;

    const checkUserExsits = await User.findOne({ email });

    if (checkUserExsits) {
      const verificationCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      const updatedUser = await User.findOneAndUpdate(
        { email: email },
        { verificationCode: verificationCode }
      );
      SendVerificationCode.sendVerificationCode(email, verificationCode);
      res.status(200).json({
        status: 1,
        message: "We have sent you a code on your email for verification",
        data: {},
      });
    } else {
      res.status(200).json({
        status: 0,
        message: "Check your email address again",
        data: {},
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "internal server error",
      data: {},
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { email, new_password } = req.query;

    const checkUserExsits = await User.findOne({ email });

    if (checkUserExsits) {
      const updatedUser = await User.findOneAndUpdate(
        { email: email },
        { password: md5(new_password) }
      );

      res.status(200).json({
        status: 1,
        message: "Password changed successfully",
        data: {},
      });
    } else {
      res.status(200).json({
        status: 0,
        message: "Check your email address again",
        data: {},
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "internal server error",
      data: {},
    });
  }
};

module.exports = {
  createProfile,
  verifyEmail,
  login,
  resendCode,
  forgotPassword,
  updatePassword,
};
