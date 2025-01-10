const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      min: 0,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      default: 0,
    },
    rating_count: {
      type: Number,
      min: 0,
      default: 0,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

productSchema.plugin(autoIncrement, { inc_field: "productId" });

module.exports = mongoose.model("Product", productSchema);
