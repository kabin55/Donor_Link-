import express from "express";
import { Signup } from "../controllers/user.controller.js";

const signupRouter = express.Router();

signupRouter.post("/", Signup);
signupRouter.get("/", (req, res) => {
  return res.status(200).send({ message: "signup page" });
});

export default signupRouter;
