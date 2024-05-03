const User = require("../models/user.model");
const bcryptjs = require('bcryptjs');
const {errorHandler} =require('../utils/error');

const signup = async (req, res,next) => {
  const { username, eamil, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password,10);
  const newUser = new User({ username, eamil,password:hashPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "user create successfuly" });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup };
