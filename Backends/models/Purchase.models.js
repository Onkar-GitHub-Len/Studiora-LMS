import mongoose, { Schema } from "mongoose";

const purchaseSchema = new Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    userId: {
        type: String,
        ref: "User",
        required: true
    },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" }
}, { timestamps: true })

export const Purchase = mongoose.model("Purchase", purchaseSchema)