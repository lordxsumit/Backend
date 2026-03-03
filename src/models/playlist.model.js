import mongoose from "mongoose";


const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'video'
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, {timestamps: true})


export const playlist = mongoose.model("playlist", playlistSchema)