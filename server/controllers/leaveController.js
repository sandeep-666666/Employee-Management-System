import Employee from "../models/EmployeeModel.js";
import LeaveApplication from "../models/LeaveApplication.js";

//create leave
//POST /api/leaves

export const createLeave = async (req, res) => {
  try {
    const session = req.session;
    const employee = await Employee.findOne({ userId: session.userId });
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    if (employee.isDeleted) {
      return res.status(403).json({
        error: "Your account is deactivated you can not apply for leave",
      });
    }
    const { type, startDate, endDate, reason } = req.body;
    if (!type || !startDate || !endDate || !reason) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide your start date, end date, leave type and reason of leave",
      });
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(startDate) <= today || new Date(endDate) <= today) {
      return res
        .status(400)
        .json({ error: "Leave date must be in the future" });
    }
    if (new Date(endDate) <= new Date(endDate)) {
      return res
        .status(400)
        .json({ error: "End date can not be before start date" });
    }
    const leave = await LeaveApplication.create({
      employeeId: employee._id,
      type,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      reason,
      status: "PENDING",
    });

    return res.status(200).json({
      success: true,
      message: "Leave applied successfully",
      data: leave,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Apply for leave",
    });
  }
};

//get leaves
//GET /api/leaves

export const getLeaves = async (req, res) => {
  try {
    const session = req.session;
    const isAdmin = session.role === "ADMIN";
    if (isAdmin) {
      const status = req.query.status;
      const where = status ? { status } : {};
      const leaves = await LeaveApplication.find(where)
        .populate("employeeId")
        .sort({ createdAt: -1 });
      const data = leaves.map((leave) => {
        const obj = leave.toObject();
        return {
          ...obj,
          id: obj._id.toString(),
          employee: obj.employeeId,
          employeeId: obj.employeeId?._id?.toString(),
        };
      });
      return res.status(200).json({
        success: true,
        message: "All the leaves are fetched successfully",
        data,
      });
    } else {
      const employee = await Employee.findOne({
        userId: session.userId,
      }).lean();
      if (!employee) {
        return res.status(402).json({
          success: false,
          message: "Employee not found",
        });
      }
      const leaves = await LeaveApplication.find({
        employeeId: employee._id,
      }).sort();
      return res.status(200).json({
        success: true,
        data: leaves,
        employee: { ...employee, id: employee._id.toString() },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get all theleaves",
    });
  }
};

//update leave status
//PATCH /api/leaves/:id

export const updateLeavesStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["APPROVED", "REJECED", "PENDING"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }
    const leave = await LeaveApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: "after" },
    );
    return res.status(200).json({
      success: true,
      message: "Leaves updated successfully",
      data: leave,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update leaves",
    });
  }
};
