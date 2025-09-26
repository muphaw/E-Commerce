import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true,unique : true },
  phone : { type: Number, required: true, unique: true },
  address : { type: String, required: true },
  role : { type: String,enum : ["BUYER","SELLER","ADMIN"] , default: "BUYER" },
},{timestamps : true})
export const User =  mongoose.model("users", userSchema)