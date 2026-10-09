import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["EMPLOYEE", "ADMIN"],
      default: "EMPLOYEE",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", UserSchema);
export default User;
