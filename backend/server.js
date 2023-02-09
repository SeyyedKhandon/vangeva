import express from "express";
import { config } from "dotenv";
import "colors";
const dotenv = config();
console.log(dotenv);

const port = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.json("hello world!");
});

app.listen(port, () => console.log(`Server started on port ${port}`.bgBlue));
