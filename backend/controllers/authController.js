const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET);
};

exports.signUp = catchAsync(async (req, res, next) => {
  const { name, email, phoneNumber, password, passwordConfirm } = req.body;

  if ((!name || !email || !password, !phoneNumber || !passwordConfirm)) {
    return res.status(400).json({
      status: "fail",
      message: 'Please provide all the inputs"',
    });
  }

  const user = await User.create({
    name,
    email,
    phoneNumber,
    password,
    passwordConfirm,
  });

  const token = signToken(user.id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      status: "fail",
      message: "proide email and password",
    });
  }
  const user = await User.findOne({ email }).select("+password");

  console.log(user);
  if (!user && !(await user.correctPassword(password))) {
    return res.status(401).json({
      status: "fail",
      message: "invalid email or password!",
    });
  }

  const token = signToken(user.id);
  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});
