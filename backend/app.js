const express = require("express");
const userRouter = require("./routes/userRoute");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api/users", userRouter);
module.exports = app;
