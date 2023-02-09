import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.js";

export function generateJWTToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}
/**
 * @desc Show Profile
 * @route GET /api/users/profile
 * @access Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  res.json(req.user);
});

/**
 * @desc Register User
 * @route POST /api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields!");
  }
  const userExist = await userModel.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      id: user.id,
      name,
      email,
      token: generateJWTToken(user.id),
    });
  } else {
    res.status(400);
    res.json("Invalid User!");
  }
});

/**
 * @desc Authenticate User
 * @route POST /api/users/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields!");
  }
  const user = await userModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      id: user.id,
      email,
      name: user.name,
      token: generateJWTToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials!");
  }
});

export { getUserProfile, loginUser, registerUser };
