import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
},{timestamps : true})

export const Cart = mongoose.model("carts", cartSchema)