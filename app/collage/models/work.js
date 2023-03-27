import mongoose from "mongoose";

const workSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  desc:{
    type: String,
    required: true
  },
  link:{
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date
  }
})   

export default mongoose.model("Work", workSchema)