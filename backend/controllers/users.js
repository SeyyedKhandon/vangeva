import asyncHandler from "express-async-handler";

/**
 * @desc Show Profile
 * @route GET /api/users/profile
 * @access Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  res.json(`User Profile ${req.body}`);
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

  res.status(201).json({
    name,
    email,
    password,
    message: "Successfully Registration!",
  });
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
  res.status(201).json({
    email,
    password,
    message: "Successfully Login!",
  });
});

export { getUserProfile, loginUser, registerUser };
