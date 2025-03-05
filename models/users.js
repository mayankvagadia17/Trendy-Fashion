const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const addressSchema = new mongoose.Schema({
  label: { type: String },
  line1: { type: String },
  line2: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  country: { type: String },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    token: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String, required: true },
    role: {
      type: String,
      enum: ["customer", "admin", "seller"],
      default: "customer",
    },
    addresses: [addressSchema],
    status: { type: String, default: "Active", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

userSchema.plugin(autoIncrement, { inc_field: "userId" });

module.exports = mongoose.model("User", userSchema);
