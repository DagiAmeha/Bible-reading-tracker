const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION 🔥 Shutting down...");
  console.error(err.name, err.message);
  process.exit(1); // force shutdown
});
const app = require("./app");
dotenv.config("./config.env");

const PORT = process.env.PORT || 5000;

const mongodb_uri = process.env.DATABASE_URI.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION 💥 Shutting down...");
  console.error(err.name, err.message);
  app.close(() => {
    process.exit(1); // exit after closing server
  });
});
