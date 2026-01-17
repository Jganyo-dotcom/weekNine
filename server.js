const app = require("./src/app");
const mongoose = require("./src/config/connection");
PORT = process.env.PORT || 4555;

mongoose();
app.listen(PORT, async () => {
  console.log(`server is running on port ${PORT}`);
});
