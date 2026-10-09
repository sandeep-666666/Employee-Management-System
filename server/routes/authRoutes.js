import express from "express";
import {
  changePassword,
  logIn,
  session,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const authRouter = express.Router();

authRouter.post("/login", logIn);
authRouter.get("/session", protect, session);
authRouter.post("/change-password", protect, changePassword);

export default authRouter;
