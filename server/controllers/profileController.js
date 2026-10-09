import Employee from "../models/EmployeeModel.js";

//getting progile
//GET /api/profile

export const getProfile = async (req, res) => {
  try {
    const session = req.session;
    const employee = await Employee.findOne({ userId: session.userId });

    if (!employee) {
      // authenticated user is not an employee return admin profile
      return res.json({
        firstName: "ADMIN",
        lastName: "",
        email: session.email,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      employee,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch the profile",
    });
  }
};

//update profile
//PUT /api/profile

export const updateProfile = async (req, res) => {
  try {
    const session = req.session;
    const employee = await Employee.findOne({ userId: session.userId });
    if (!employee) {
      return res.status(404).json({
        error: "Employee not found",
      });
    }
    if (employee.isDeleted) {
      return res.status(403).json({
        error: "Your account is deactivated you can not update your pprofile",
      });
    }

    await Employee.findByIdAndUpdate(employee._id, { bio: req.body.bio });
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};
