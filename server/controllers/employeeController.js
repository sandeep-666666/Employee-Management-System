import Employee from "../models/EmployeeModel.js";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

// GET /api/employee
export const getEmployee = async (req, res) => {
  try {
    const { department } = req.query;

    // Apply department filter only when provided
    const filter = department ? { department } : {};

    const employees = await Employee.find(filter)
      .sort({ createdAt: -1 })
      .populate("userId", "email role")
      .lean();

    const result = employees.map((emp) => ({
      ...emp,
      id: emp._id.toString(),
      user: emp.userId
        ? {
            email: emp.userId.email,
            role: emp.userId.role,
          }
        : null,
    }));

    return res.status(200).json({
      success: true,
      message: "Employees fetched successfully",
      result,
    });
  } catch (error) {
    console.error("Get employees error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch employees",
    });
  }
};

// POST /api/employee
export const createEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      position,
      department,
      basicSalary,
      allowances,
      deductions,
      joinDate,
      password,
      role,
      bio,
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "First name, last name, email and password are required",
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Create user account
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      role: role || "EMPLOYEE",
    });

    // Create employee profile
    const employee = await Employee.create({
      userId: user._id,
      firstName,
      lastName,
      email,
      phone,
      position,
      department: department || "Engineering",
      basicSalary: Number(basicSalary) || 0,
      allowances: Number(allowances) || 0,
      deductions: Number(deductions) || 0,
      ...(joinDate && { joinDate: new Date(joinDate) }),
      bio: bio || "",
    });

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employee,
    });
  } catch (error) {
    console.error("Create employee error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create employee",
    });
  }
};

// PUT /api/employee/:id
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      position,
      department,
      basicSalary,
      allowances,
      deductions,
      password,
      role,
      bio,
      employmentStatus,
    } = req.body;

    // Update only fields provided in the request
    if (firstName !== undefined) employee.firstName = firstName;
    if (lastName !== undefined) employee.lastName = lastName;
    if (email !== undefined) employee.email = email;
    if (phone !== undefined) employee.phone = phone;
    if (position !== undefined) employee.position = position;
    if (department !== undefined) employee.department = department;
    if (basicSalary !== undefined) employee.basicSalary = Number(basicSalary);
    if (allowances !== undefined) employee.allowances = Number(allowances);
    if (deductions !== undefined) employee.deductions = Number(deductions);
    if (bio !== undefined) employee.bio = bio;

    if (employmentStatus !== undefined) {
      employee.employeeStatus = employmentStatus;
    }

    await employee.save();

    // Update linked user account
    const userUpdate = {};

    if (email !== undefined) userUpdate.email = email;
    if (role !== undefined) userUpdate.role = role;

    if (password) {
      userUpdate.password = await bcrypt.hash(password, 10);
    }

    if (Object.keys(userUpdate).length > 0 && employee.userId) {
      await User.findByIdAndUpdate(employee.userId, userUpdate);
    }

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
    });
  } catch (error) {
    console.error("Update employee error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update employee",
    });
  }
};

// DELETE /api/employee/:id
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Soft delete: keep the record in the database
    employee.isDeleted = true;
    employee.employeeStatus = "INACTIVE";

    await employee.save();

    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error("Delete employee error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to delete employee",
    });
  }
};
