import { config } from "dotenv";
const dotenv = config();

import "colors";
import express from "express";
import userRoute from "./routes/users.js";
import errorHandler from "./middleware/error.js";

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", userRoute);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
