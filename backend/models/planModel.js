const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title for the Plan!"],
  },
  coverImage: String,
  description: {
    type: String,
    required: [true, "Please provide a description!"],
  },
  totalDays: {
    type: Number,
    required: [true, "Please provide the total number of days!"],
  },
  days: [
    {
      dayNumber: { type: String, required: true },
      reading: { type: String, required: true },
      book: { type: String, required: true },
    },
  ],
});

const Plan = mongoose.model("plan", planSchema);
module.exports = Plan;
