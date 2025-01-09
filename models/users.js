const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

userSchema.plugin(autoIncrement, { inc_field: "userId" });

module.exports = mongoose.model("User", userSchema);
