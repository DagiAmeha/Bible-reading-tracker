const express = require("express");
const userRouter = require("./routes/userRoute");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(express.static("public"));

app.use("/api/users", userRouter);
module.exports = app;
