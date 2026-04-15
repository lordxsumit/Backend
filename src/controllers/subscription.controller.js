import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { subscription } from "../models/subscription.model.js";
import mongoose from "mongoose";


const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    if(!channelId){
        throw new ApiError(400, "Channel ID is required")
    }

    const userId = req.user?._id;

    // Check if subscription already exists.
    const existingSubscription = await subscription.findOne(
        {
            subscriber: userId,
            channel: channelId
        }
    )

    if(existingSubscription){
        // Delete the subscription.
        await subscription.findByIdAndDelete(existingSubscription._id);
        return res
        .status(200)
        .json(new ApiResponse(200, {}, "Unsubscribed Successfully"))
    } 

    const newSubscription = await subscription.create({
        subscriber: userId,
        channel: channelId
    })

    if(!newSubscription){
        throw new ApiError(500, "Failed to subscribe")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, newSubscription, "Subscribed successfully")
    )
})


const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    if(!channelId){
        throw new ApiError(400, "Channel ID is required")
    }

    const subscribers = await subscription.find({ channel: channelId })
    .populate("subscriber", "username fullName avatar")                     // ".populate() is used so that we can use the functionality of "join" in no-SQL databases like mongoDB.
    .select("-channel -__v")

    if(!subscribers){
        throw new ApiError(404, "No subscribers found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, subscribers, "Subscribers fetched successfully")
    )
})


const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params;
    if(!subscriberId){
        throw new ApiError(400, "Subscriber ID is required")
    }

    const subscribedChannels = await subscription.find({ subscriber: subscriberId})
    .populate("channel", "username fullName avatar")
    .select("-subscriber -__v")

    if(!subscribedChannels){
        throw new ApiError(404, "No subscribed channels found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, subscribedChannels, "Subscribed channels fetched successfully")
    )
})

export{
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}