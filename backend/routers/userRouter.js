import express from "express";
import data from "../data.js";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { generateToken } from "../utils.js";
const userRouter = express.Router();
userRouter.get(
  "/initialize",
  expressAsyncHandler(async (req, res) => {
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);
userRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const createdUsers = await User.find({});
    res.send({ createdUsers });
  })
);
userRouter.delete(
  "/purge",
  expressAsyncHandler(async (req, res) => {
    const createdUsers = await User.deleteMany({});
    res.send({ createdUsers });
  })
);
userRouter.delete(
  "/",
  expressAsyncHandler(async (req, res) => {
    const deletedUser = await User.deleteOne({ _id: req.body._id });
    res.send(deletedUser);
  })
);
userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);
userRouter.put(
  "/",
  expressAsyncHandler(async (req, res) => {
    const userToChange = await User.findOne({ _id: req.body._id });
    userToChange.name = req.body.name;
    res.send({ userToChange });
  })
);

export default userRouter;
