import dotenv from "dotenv";
dotenv.config();
import express from "express";

import { connectToDB } from "./config/db.js";
connectToDB();

import signupRouter from "./routes/signup.route.js";
import loginRouter from "./routes/login.route.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send({ message: "all good" });
});
app.use("/signup", signupRouter);
app.use("/login", loginRouter);

export default app;
