const mongoose = require("mongoose");
const User = require("./userModel");
const Plan = require("./planModel");

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    dayNumber: {
      type: Number,
      required: true,
    },
    dateRead: {
      type: Date,
      required: true,
    },
    markedAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Progress = mongoose.model("Progress", progressSchema);

module.exports = Progress;
