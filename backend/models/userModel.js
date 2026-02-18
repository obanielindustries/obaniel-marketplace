import mongoose, { Schema } from "mongoose";

import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

// simple method to compare hashed password with password in MongoDB;
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// simple middleware to hash passwords before saving them to the database
userSchema.pre("save", async function () {
  // If password isn't being changed, just stop here
  if (!this.isModified("password")) {
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    // If something goes wrong, throw it so asyncHandler can catch it
    throw new Error(error);
  }
});
const User = mongoose.model("User", userSchema);
export default User;
