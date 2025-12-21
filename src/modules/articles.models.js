const { ref, required } = require("joi");
const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minLength: 5 },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
);

ArticleSchema.index({ title: "text" }); // this helps with the search

module.exports = mongoose.model("Articles", ArticleSchema);
