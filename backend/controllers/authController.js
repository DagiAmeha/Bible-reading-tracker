const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET);
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }
  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
exports.signUp = async (req, res, next) => {
  const { name, email, phoneNumber, password, passwordConfirm } = req.body;

  if ((!name || !email || !password, !phoneNumber || !passwordConfirm)) {
    return res.status(400).json({
      status: "fail",
      message: 'Please provide all the inputs"',
    });
  }

  try {
    const user = await User.create({
      name,
      email,
      phoneNumber,
      password,
      passwordConfirm,
    });

    createSendToken(user, 201, res);
  } catch (error) {
    console.error("Error during user creation:", error);
    return res.status(500).json({
      status: "error",
      message: "An error occurred while creating the user",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      status: "fail",
      message: "provide email and password",
    });
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    console.log(user);
    if (!user || !(await user.correctPassword(password))) {
      return res.status(401).json({
        status: "fail",
        message: "invalid email or password!",
      });
    }

    createSendToken(user, 200, res);
  } catch (error) {
    console.error("Error during user login:", error);
    return res.status(500).json({
      status: "error",
      message: "An error occurred while logging in",
    });
  }
};
