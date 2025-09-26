import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  total_price: { type: Number, required: true },
  status: { type: String, enum: ["PENDING", "COMPLETED", "CANCELLED"], default: "PENDING" },
},{timestamps : true});

export const Order = mongoose.model("orders", orderSchema);