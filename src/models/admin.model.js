import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    adminUsername: {
        type: String,
        required: true
    }
}, {timestamps: true})