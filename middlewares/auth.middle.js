const jwt = require("jsonwebtoken");

// get token from headers
const LoginUserBYToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(400).json({
      message: "no token available Login required",
    });
  }

  try {
    user = jwt.verify(token, process.env.JWT_SECRETE);
    console.log("logged user in ");
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "login required",
    });
  }
};

module.exports = LoginUserBYToken;
