import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { user } from "../models/user.model.js";
import { video } from "../models/video.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";


// Uploading video to Cloudinary.
const uploadVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    // if(!title?.trim() || !description?.trim()){
    //     throw new ApiError(400, "Title and description are required")
    // }
    if (
        [title, description].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "Title and description are required")
    }

    // Validate user authentication
    if (!req.User?._id){
        throw new ApiError(401, "Unauthorized request")
    }

    const videoLocalPath = req.files?.videoFile[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail[0]?.path;
    // console.log(videoLocalPath);
    // console.log(thumbnailLocalPath);

    if(!videoLocalPath){
        throw new ApiError(400, "Video file is required")
    }

    if(!thumbnailLocalPath){
        throw new ApiError(400, "Thumbnail is required")
    }

    const videoFile = await uploadOnCloudinary(videoLocalPath);
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    if(!videoFile){
        throw new ApiError(400, "Something went wrong while uploading video")
    }

    if(!thumbnail){
        throw new ApiError(400, "Something went wrong while uploading thumbnail")
    }

    const uploadedVideo = await video.create({
        videoFile: videoFile.url,
        thumbnail: thumbnail.url,
        title,
        description,
        duration: videoFile.duration,
        owner: req.user?._id
    })

    const createdVideo = await video.findById(uploadedVideo._id);

    if(!createdVideo){
        throw new ApiError(500, "Something went wrong while uploading video")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(201, createdVideo, "Video uploaded successfully")
    )
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if(
        [videoId].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "Video ID is required!")
    }

    const Video = await video.findById(videoId);

    if(!Video){
        throw new ApiError(404, "Video not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, Video, "Video fetched successfully")
    )
})

const getAllVideos = asyncHandler(async (req, res) => {
    const { page=1, limit=10, sortBy = "createdAt", sortType = "desc", userId } = req.query;
    const matchStage = {};

    if(userId){
        matchStage.owner = new mongoose.Types.ObjectId(userId);
    }

    const videos = await video.aggregate([
        {
            $match: matchStage
        },
        {
            $sort: {
                [sortBy]: sortType === "desc" ? -1 : 1
            }
        },
        {
            $skip: (page - 1)*limit
        },
        {
            $limit: parseInt(limit)
        }
    ])

    if(!videos){
        throw new ApiError(500, "Something went wrong while fetching videos")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, videos , "Videos fetched successfully")
    )
})

export {
    uploadVideo,
    getVideoById,
    getAllVideos,
    // updateVideo,
    // updateVideoThumbnail,
    // deleteVideo,
    // togglePublishStatus,
    // getChannelVideos
}
