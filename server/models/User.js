import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: {
    type: String, // Clerk userId
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  branch: { type: String, required: true },
  year: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }, // <--- you = true
}, { timestamps: true });


const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;