const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const WishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
      ref: "users",
    },
    productId: {
      type: Number,
      ref: "product",
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

WishlistSchema.plugin(autoIncrement, { inc_field: "wishlistId" });

module.exports = mongoose.model("Wishlist", WishlistSchema);
