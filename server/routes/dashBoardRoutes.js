import express from "express";

import { protect } from "../middleware/auth.js";
import { getDashboard } from "../controllers/dashBoardController.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/", protect, getDashboard);

export default dashboardRouter;
