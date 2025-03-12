import express from "express";
import { Login } from "../controllers/user.controller.js";

const loginRouter = express.Router();

loginRouter.post("/login", Login);

export default loginRouter;
