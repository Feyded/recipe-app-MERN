import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "./../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (user) {
    return res.json("Username already taken ");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({ username, password: hashedPassword });

  await newUser.save();

  res.json({ message: "User Registered Successfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = await req.body;

  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({message: "User doesn't exist", status: 403});
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({message: "Username or Password is incorrect!", status: 401});
  }

  const token = jwt.sign(
    { id: user._id },
    "nJkjn4cUd8fjdV5UgaBPuGiX+PkeQgpXRnkwHjhOV0U="
  );

  res.json({ token, userID: user._id });
});

export { router as userRouter };

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "nJkjn4cUd8fjdV5UgaBPuGiX+PkeQgpXRnkwHjhOV0U=", (err) => {
      if (err) return res.sendStatus(403);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
