const express = require("express");
const app = express();
const ArticleRoutes = require("./routes/articles");
const UserRoutes = require("./routes/user");
const LoginUserBYToken = require("./middlewares/auth.middle");

app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send("Hello, world!!!");
});
app.use("/posts", ArticleRoutes);
app.use("/api/user", UserRoutes);

module.exports = app;
