const User = require("../models/user.model");
const bcryptjs = require('bcryptjs');

const signup = async (req, res) => {
  const { username, eamil, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password,10);
  const newUser = new User({ username, eamil,password:hashPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "user create successfuly" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { signup };
