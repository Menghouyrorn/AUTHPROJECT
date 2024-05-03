const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const { errorHandler } = require("../utils/error");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const { username, eamil, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, eamil, password: hashPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "user create successfuly" });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { eamil, password } = req.body;

  try {
    const validUser = await User.findOne({ eamil });
    if (!validUser) return next(errorHandler(404, "Invalid credentails"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong password"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashPassword, ...rest } = validUser._doc;
    const expiryData = new Date(Date.now() + 3600000);
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryData })
      .status(200)
      .json(rest);
  } catch (error) {}
};

module.exports = { signup, signin };
