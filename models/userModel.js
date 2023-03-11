import mongoose from "mongoose";

const { Schema } = mongoose;

export const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Enter name"],
  },
  email: {
    type: String,
    required: [true, "Enter email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Enter password"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
