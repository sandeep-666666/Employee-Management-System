import mongoose from "mongoose";
import { DEPARTMENTS } from "../data/data.js";
const EmployeeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lasstName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    basicSalary: {
      type: Number,
      default: 0,
    },
    allowances: {
      type: Number,
      default: 0,
    },
    deductions: {
      type: Number,
      default: 0,
    },
    employeeStatus: {
      type: String,
      default: "ACTIVE",
      enum: ["ACTIVE", "INACTIVE"],
    },
    joinDate: {
      type: Date,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      default: "",
    },
    department: {
      type: String,
      enum: DEPARTMENTS,
    },
  },
  { timestamps: true },
);

const Employee = mongoose.model("Employee", EmployeeSchema);
export default Employee;
