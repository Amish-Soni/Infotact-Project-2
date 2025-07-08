import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, role });

  res.status(201).json({ message: "User registered", user });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res
    .cookie("token", token, { httpOnly: true })
    .json({ message: "Login success", user });
};
