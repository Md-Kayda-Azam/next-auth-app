import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: [true, "Name feild is required"],
    },
    email: {
      type: Schema.Types.String,
      required: [true, "Email feild is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: Schema.Types.String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
export const User = mongoose.models.User || mongoose.model("User", userSchema);
