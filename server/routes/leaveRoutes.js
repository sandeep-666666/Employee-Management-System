import express from "express";

import { protect, protectAdmin } from "../middleware/auth.js";
import {
  createLeave,
  getLeaves,
  updateLeavesStatus,
} from "../controllers/leaveController.js";

const leaveRouter = express.Router();

leaveRouter.post("/", protect, createLeave);
leaveRouter.get("/", protect, getLeaves);
leaveRouter.patch("/:id", protect, protectAdmin, updateLeavesStatus);

export default leaveRouter;
