const app = require("./src/app");
const mongoose = require("./src/config/connection")
PORT = process.env.PORT || 4555;

app.listen(PORT,async () => {
 await mongoose();
  console.log(`server is running on port ${PORT}`);
});
