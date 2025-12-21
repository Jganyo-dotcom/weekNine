const userModels = require("../modules/user.models");
const UserModels = require("../modules/user.models");
const validateUser = require("../validations/userRegistration");
const bcrypt = require("bcrypt");

const UserController = async (req, res) => {
  const validatedUser = validateUser.validate(req.body);
  const { error, value } = validatedUser;
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // find the user by email to see existing
  const existing_user = await UserModels.findOne({ email: value.email });
  if (existing_user) {
    return res.status(400).json({
      message: "user already exist",
    });
  }

  //contine to save to database if otherwise
  //get password and hash it
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(value.password, salt);
  value.password = hashPassword;

  const new_user = new UserModels(value);

  //save the user to database
  await new_user.save();
  const newuser = {
    name: value.name,
    email: value.email,
  };

  //return the user without password
  res.status(201).json({
    message: "created",
    newuser,
  });
};

const GetUsers = async (req, res) => {
  const users = await userModels.find({});
  res.status(200).json(users);
};

//delete by id

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModels.findById({ _id: id });
    if (!user) return res.status(404).json({ message: "user not found" });
    await userModels.findByIdAndDelete({ _id: id });
    res.status(204).json({ message: "deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

const userById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModels.findById({ _id: id });
    if (!user)
      return res.status(404).json({
        message: "user not found",
      });

    res.status(200).json({ message: "success" }, user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

module.exports = {
  UserController,
  GetUsers,
  deleteUser,
  userById,
};
