const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET);
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);
  console.log(token);

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
exports.logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.status(200).json({ status: "success", message: "Logged out" });
};
exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  console.log(token);
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "You are not logged in! Please log in to get access",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: "fail",
        message: "The user belonging to this token does no longer exist",
      });
    }
    if (await currentUser.changesPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        status: "fail",
        message: "User recently changed password! Please log in again",
      });
    }

    req.user = currentUser;
    next();
  } catch (err) {
    console.error("Error during token verification:", err);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "fail",
        message: "Your token has expired! Please log in again.",
      });
    }
  }
};
