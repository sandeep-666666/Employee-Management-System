import { DEPARTMENTS } from "../data/data.js";
import Attendance from "../models/AttendanceModel.js";
import Employee from "../models/EmployeeModel.js";
import LeaveApplication from "../models/LeaveApplication.js";

//get dashboard for employee and admin
//GET /api/dashboard

export const getDashboard = async (req, res) => {
  try {
    const session = req.session;

    if (session.role === "ADMIN") {
      const [totalEmployees, todayAttendance, pendingLeaves] =
        await Promise.all([
          Employee.countDocuments({ isDeleted: { $ne: true } }),

          Attendance.countDocuments({
            date: {
              $gte: new Date(new Date().setHours(0, 0, 0, 0)),
              $lt: new Date(new Date().setHours(24, 0, 0, 0)),
            },
          }),

          LeaveApplication.countDocuments({ status: "PENDING" }),
        ]);

      return res.status(200).json({
        role: "ADMIN",
        totalEmployees,
        totalDepartments: DEPARTMENTS.length,
        todayAttendance,
        pendingLeaves,
      });
    } else {
      const employee = await Employee.findOne({
        userId: session.userId,
      }).lean();
      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }
      const today = new Date();
      const [currentMonthAttendance, pendingLeaves] = await Promise.all([
        Attendance.countDocuments({
          employeeId: employee._id,
          date: {
            $gte: new Date(today.getFullYear(), today.getMonth(), 1),
            $lt: new Date(today.getFullYear(), today.getMonth() + 1, 1),
          },
        }),
        LeaveApplication.countDocuments({
          employeeId: employee._id,
          status: "PENDING",
        }),
      ]);
      return res.status(200).json({
        role: "EMPLOYEE",
        employee: { ...employee, id: employee._id.toString() },
        currentMonthAttendance,
        pendingLeaves,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occured while fetching dashboard data",
    });
  }
};
