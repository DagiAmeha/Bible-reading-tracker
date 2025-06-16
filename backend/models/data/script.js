const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
// const Book = require("../bookModel"); // Adjust the path as necessary
const Plan = require("../planModel");
dotenv.config({ path: path.join(__dirname, "../../config.env") });

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "plan.json"), "utf-8")
);

const mongodb_uri = process.env.DATABASE_URI.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(mongodb_uri).then(() => {
  console.log("MongoDB connected");
});

const importData = async () => {
  try {
    await Plan.create(data);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.error("Error loading data:", err);
  } finally {
    mongoose.connection.close();
  }
};
const deleteData = async () => {
  try {
    await Plan.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.error("Error deleting data:", err);
  } finally {
    mongoose.connection.close();
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
