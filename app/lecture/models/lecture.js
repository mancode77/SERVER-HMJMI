import mongoose from "mongoose";
import bcrypt from "bcrypt"

const lectureSchema = new mongoose.Schema({
  email: {
    type: String,
    minlength: 5,
    maxlength: 50,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 100,
    required: true,
  },
  username: {
    type: String,
    minlength: 5,
    maxlength: 75,
    required: true,
  },
  role: {
    type: String,
    default: "Dosen",
  },
  refresh_token: {
    type: String,
    lowercase: true
  },
  detailuser: {
    fullname: {
      type: String,
      minlength: 5,
      maxlength: 100,
    },
    gender: {
      type: String,
      enum: ["Laki - Laki", "Perempuan"],
    },
    thumbnail: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

lectureSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


export default mongoose.model("Lecture", lectureSchema)