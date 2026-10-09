import express from "express";
import { protect } from "../middleware/auth.js";
import {
  clockInOut,
  getAttendance,
} from "../controllers/attendanceController.js";

const attendanceRouter = express.Router();

attendanceRouter.post("/", protect, clockInOut);
attendanceRouter.get("/", protect, getAttendance);

export default attendanceRouter;
