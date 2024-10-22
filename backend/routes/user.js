const { Router } = require("express");
const { userModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");
const { userTodo, userLoginTodo } = require("../types");

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const parsedInput = userTodo.safeParse(req.body);
  if (!parsedInput.success) {
    res.status(400).json({ msg: "You sent the wrong input" });
    return;
  }

  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
  try {
    await userModel.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashPassword,
    });
    res.status(201).json({ msg: "User created successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

userRouter.post("/signin", async (req, res) => {
  const parsedInput = userLoginTodo.safeParse(req.body);
  if (!parsedInput.success) {
    res.status(411).json({ msg: "You sent the wrong input" });
    return;
  }

  const email = req.body.email;
  const password = req.body.password;

  const user = await userModel.findOne({ email: email });
  if (!user) {
    res.status(400).json({ msg: "User does not exist in our DB" });
    return;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (passwordMatch) {
    const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD);
    res.json({ token: token });
  } else {
    res.status(400).json({ msg: "Incorrect Details" });
  }
});

module.exports = {
  userRouter: userRouter,
};
