const User = require("../models/user.model");
const { errorHandler } = require("../utils/error");
const bcryptjs = require("bcryptjs");

const get = (req, res) => {
  res.json({
    message: "Api is Call",
  });
};

//update

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can update only your account"));
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hash(req.body.password, 10);
    }

    const updateNewUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          eamil: req.body.eamil,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const {password,...rest}=updateNewUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

module.exports = { get, updateUser };
