const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
exports.getMe = async (req, res, next) => {
  const id = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET).id;
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({
      status: "error",
      message: "An error occurred while fetching user data",
    });
  }
};
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.User);

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!(await User.findByIdAndDelete(id))) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
