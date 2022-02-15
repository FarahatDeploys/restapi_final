import express from "express";
import mongoose from "mongoose";

import userRouter from "./routers/userRouter.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost/GoMyCodeUsers",
  {
    useNewUrlParser: true,
  }
);
app.use("/api/users", userRouter);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Serving...");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.get("/", (req, res) => {
  res.send("Server is ready");
});
