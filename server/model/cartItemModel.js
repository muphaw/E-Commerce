import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    cart_id: { type: mongoose.Schema.Types.ObjectId, ref: "carts", required: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
    quantity: { type: Number, required: true }
},{timestamps : true})