import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: "orders", required: true },
    amount: { type: Number, required: true },
    method: { type: String, required: true },
    status: { type: String, required: true },
},{timestamps : true})

export const Payment = mongoose.model("payments", paymentSchema)