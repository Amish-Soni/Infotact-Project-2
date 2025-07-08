import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "chef", "admin"],
      default: "user",
    },
    address: {
      type: String,
    },
    location: {
      lat: Number,
      lng: Number,
    },
    isApproved: {
      type: Boolean,
      default: false, // For chefs only
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
