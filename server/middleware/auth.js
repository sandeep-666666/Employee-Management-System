import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const token = authHeader.split(" ")[1];
    const session = jwt.verify(token, process.env.JWT_SECRET);

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Not authoried",
      });
    }
    req.session = session;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const protectAdmin = async (req, res, next) => {
  try {
    if (req?.session?.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Admin acccess required",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
