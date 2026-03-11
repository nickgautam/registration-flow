import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, lowercase: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: { type: String, required: true, trim: true },
    age: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const userModel = new mongoose.model("User", userSchema);

export default userModel;
