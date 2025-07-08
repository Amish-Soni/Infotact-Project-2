import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["user", "chef"], default: "user" },
    address: String,
    location: {
      lat: Number,
      lng: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
