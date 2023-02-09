import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import userModel from "../models/user.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedVerifiedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await userModel
        .findById(decodedVerifiedToken.id)
        .select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized!");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Forbidden Access!");
  }
});
export default protect;
