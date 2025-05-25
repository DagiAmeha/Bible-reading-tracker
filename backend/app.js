const express = require("express");
const userRouter = require("./routes/userRoute");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", userRouter);
module.exports = app;
