const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true, default: 0 },
    finalPrice: { type: Number, required: true, default: 0 },
    isPremium: { type: Boolean, default: false },
    stock: {
      S: { type: Number, default: 0 },
      M: { type: Number, default: 0 },
      L: { type: Number, default: 0 },
      XL: { type: Number, default: 0 },
      XXL: { type: Number, default: 0 },
    },
    rating: { type: Number, default: 0 },
    rating_count: { type: Number, default: 0 },
    gender: { type: String, required: true, default: "Both" },
    images: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

productSchema.plugin(autoIncrement, { inc_field: "productId" });

module.exports = mongoose.model("Product", productSchema);
