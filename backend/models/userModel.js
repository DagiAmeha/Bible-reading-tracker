const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email!"],
    unique: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  phoneNumber: {
    type: String,
    required: [true, "Please provide your phone number!"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    minlength: [8, "Password must be at least 8 characters long!"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password!"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  passwordChangedAt: Date,
});

userSchema.methods.correctPassword = async function (inputPass) {
  return await bcrypt.compare(inputPass, this.password);
};
userSchema.methods.changesPasswordAfter = async function (jwtTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return changedTimestamp > jwtTimestamp;
  }
  return false;
};
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 12);
  this.passwordConfirm = undefined;

  if (!this.isNew) {
    this.passwordChangedAt = Date.now() - 1000; // 1 second in the past
  }
  next();
});
const User = mongoose.model("User", userSchema);
module.exports = User;
