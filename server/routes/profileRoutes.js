import express from "express";

import { protect } from "../middleware/auth.js";
import { getProfile, updateProfile } from "../controllers/profileController.js";

const profileRouter = express.Router();

profileRouter.get("/", protect, getProfile);
profileRouter.post("/", protect, updateProfile);

export default profileRouter;
