import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    content: {
        type: String,
        required: true,
        trim: true
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'video'
    }
}, {timestamps: true})


export const comment = mongoose.model("comment", commentSchema)