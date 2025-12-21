const mongoose = require("mongoose");
const { applyTimestamps } = require("./articles.models");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minLength: 5 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UserSchema);
