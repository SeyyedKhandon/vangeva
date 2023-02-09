import { config } from "dotenv";
const dotenv = config();

import "colors";
import express from "express";
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import errorHandler from "./middleware/error.js";
import connectDB from "./config/db.js";
const port = process.env.PORT || 5000;
const app = express();

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
