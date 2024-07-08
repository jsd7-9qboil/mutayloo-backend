import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
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
    dob: {
      type: Date,
      required: true,
    },
    imgProfile: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    addresses: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
