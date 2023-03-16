import mongoose from "mongoose";

const { Schema } = mongoose;

// Added timestamp
export const userSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
