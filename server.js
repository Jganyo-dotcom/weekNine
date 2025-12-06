const express = require("express");
const app = express();
PORT = process.env.PORT || 4555;
const mongoose = require("./Database/connection");
const ArticleRoutes = require("./routes/articles");
const UserRoutes = require("./routes/user");
const LoginUserBYToken = require("./middlewares/auth.middle");

mongoose();
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send("Hello, world!!!");
});
app.use("/posts", LoginUserBYToken, ArticleRoutes);
app.use("/api/user", UserRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
