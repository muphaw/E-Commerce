import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  user : { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "categories", required: true },
  name: { type: String, required: true },
  slug : { type: String, unique: true, lowercase: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  images : [{ type: String, required: true }],
  status : { type: String, enum : ["AVAILABLE","OUT_OF_STOCK","DISCONTINUED"], default: "AVAILABLE" }, 
},{timestamps : true})

productSchema.index({name : "text", description : "text",user : 1,category : 1})

export const Product = mongoose.model("products", productSchema)