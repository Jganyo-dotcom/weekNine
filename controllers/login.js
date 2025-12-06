const loginUser = require("../validations/login");
const userModel = require("../modules/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// define function
const loginuser = async (req, res) => {
  const { error, value } = loginUser.validate(req.body);
  //validate input from user
  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  //verify if user exists
  const existing_user = await userModel
    .findOne({ email: value.email })
    .select("+password");
  if (!existing_user) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  // compare and validate passwords
  const validatePassword = await bcrypt.compare(
    value.password,
    existing_user.password
  );

  if (!validatePassword) {
    return res.status(400).json({
      message: "incorrect credentials",
    });
  }
  //generate token
  const token = jwt.sign({ id: existing_user._id }, process.env.JWT_SECRETE, {
    expiresIn: process.env.EXPIRES_IN,
  });

  //send back to the client
  res.status(200).json({
    message: "Login successful",
    user: {
      name: existing_user.name,
      email: existing_user.email,
    },
    token,
  });
};

module.exports = loginuser;
