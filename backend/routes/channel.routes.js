import express from 'express';
import { createChannel, getChannelMessages, getChannels, joinChannel, leaveChannel, sendChannelMessage } from '../controllers/channel.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.get("/", getChannels);
router.get("/:id", protectRoute, getChannelMessages);
router.post("/create", protectRoute, createChannel);
router.post("/join", protectRoute, joinChannel);
router.post("/leave", protectRoute, leaveChannel);
router.post("/send/:id", protectRoute, sendChannelMessage);

export default router;