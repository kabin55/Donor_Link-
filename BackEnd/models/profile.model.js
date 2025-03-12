import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [5, "Must be at least 5 characters long"],
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ["A", "A+", "A-", "B", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      required: true,
    },
    DOB: {
      type: Date,
      required: [true, "Date of Birth cannot be empty"],
    },
    profilePic: {
      type: String,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const profileModel = mongoose.model("Profile", profileSchema);
export default profileModel;
