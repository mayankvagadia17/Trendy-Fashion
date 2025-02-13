const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const categorySchema = mongoose.Schema(
  {
    categoryName: { type: String, required: true },
    isPremuim: { type: Boolean, default: false },
    categoryIcon: { type: String, required: true },
  },
  { versionkey: false }
);

categorySchema.plugin(autoIncrement, { inc_field: "categoryId" });

module.exports = mongoose.model("Category", categorySchema);
