const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION 🔥 Shutting down...");
  console.error(err.name, err);
  process.exit(1); // force shutdown
});
const app = require("./app");
const { Server } = require("lucide-react");

const PORT = process.env.PORT || 5000;
const mongodb_uri = process.env.DATABASE_URI.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(mongodb_uri).then(() => {
  console.log("MongoDB connected");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION 💥 Shutting down...");
  console.error(err.name, err);
  Server.close(() => {
    process.exit(1); // exit after closing server
  });
});
