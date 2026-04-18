import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { playlist } from "../models/playlist.model.js";
import { video } from "../models/video.model.js";
import mongoose from "mongoose";


// create a new playlist
const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if(
        [name, description].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "Name and Description is required!")
    }

    if(!req.user?._id){
        throw new ApiError(401, "Unauthorized request")
    }

    const newPlaylist = await playlist.create({
        name: name.trim(),
        description: description.trim(),
        owner: req.user._id,
        videos: []
    })

    const createdPlaylist = await playlist.findById(newPlaylist._id);
    if(!createdPlaylist){
        throw new ApiError(500, "Something went wrong while creating the playlist")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(201, createdPlaylist, "Playlist created successfully")
    )
})


// get user's all playlists
const getUserPlaylists = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if(
        [userId].some((field) => field.trim() === "")
    ){
        throw new ApiError(400, "User ID is required")
    }

    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(400, "Invalid user Id")
    }

    const userPlaylists = await playlist.find({ owner: mongoose.Types.ObjectId(userId) });

    return res
    .status(200)
    .json(
        new ApiResponse(200, userPlaylists, "User playlist fetched successfully")
    )
})

export {
    createPlaylist,
    getUserPlaylists,
};