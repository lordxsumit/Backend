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


export{
    toggleSubscription
}