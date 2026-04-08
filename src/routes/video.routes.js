import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { uploadVideo, getVideoById, getAllVideos, updateVideo } from "../controllers/video.controller.js";


const router = Router();

// secured routes
router.route("/upload-video").post(verifyJWT, uploadVideo)
router.route("/get-video-by-Id").post(verifyJWT, getVideoById)
router.route("/get-all-videos").post(verifyJWT, getAllVideos)
router.route("/update-video-details").post(verifyJWT, updateVideo)