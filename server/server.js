require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ success: 1, message: "Rest api is UP!" });
});

app.use("/api/users", userRouter);

app.listen(process.env.APP_PORT, () => {
  console.log("Server is UP at port: ", process.env.APP_PORT);
});
