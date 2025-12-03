import Channel from "../models/channel.model.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { io } from "../socket/socket.js";

export const createChannel = async (req, res) => {
    try {
        const { name, description } = req.body;
        const { user } = req;

        if (!name || !user) {
            return res.status(400).json({ error: "Name and user are required" });
        }

        const exists = await Channel.findOne({ name });

        if (exists) {
            return res.status(400).json({ error: "Channel already exists ny this name" });
        }

        const profilePic = `https://api.dicebear.com/9.x/glass/svg?seed=${name}`;

        const channel = new Channel({ name, createdBy: user?._id, description, profilePic });
        channel.participants.push(user?._id);
        await channel.save();

        return res.status(201).json(channel);
    } catch (error) {
        console.log("Error in creating channel", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const joinChannel = async (req, res) => {
    try {
        const { channelId, userId } = req.body;

        if (!channelId || !userId) {
            return res.status(400).json({ message: "ChannelId and UserId are required" });
        }

        const channel = await Channel.findOne({ _id: channelId });

        if (!channel) {
            return res.status(404).json({ message: "Channel not found" });
        }

        if (channel.participants.includes(userId)) {
            return res.status(400).json({ message: "User already a member of the channel" });
        }

        channel.participants.push(userId);
        await channel.save();

        return res.status(200).json({ message: "Joined channel successfully", channel });
    } catch (error) {
        console.log("Error in joining channel", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const leaveChannel = async (req, res) => {
    try {
        const { channelId, userId } = req.body;

        const channel = await Channel.findOne({ _id: channelId });

        if (!channel) {
            return res.status(404).json({ error: "Channel not found" });
        }

        if (channel.createdBy.toString() === userId.toString()) {
            return res.status(400).json({ error: "Admin can not leave the channel" });
        }

        const newParticipants = channel.participants?.filter((participant) => participant.toString() !== userId.toString());
        channel.participants = newParticipants;

        await channel.save();

        return res.status(200).json({ message: "You leaved the channel successfully" });
    } catch (error) {
        console.log("Error in leaving channel controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getChannels = async (req, res) => {
    try {
        const channels = await Channel.find().populate('createdBy', 'fullName username').populate('participants', 'fullName username profilePic').select("-messages");
        return res.status(200).json(channels)
    } catch (error) {
        console.log("Error in getting channels", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const sendChannelMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = await new Message({ senderId, receiverId, message }).populate("senderId");
        if (newMessage) conversation.messages.push(newMessage._id);

        let channel = await Channel.findById(receiverId);

        if (channel) {
            channel.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save(), channel.save()]);
        io.to(receiverId).emit("channelMessage", newMessage);

        res.status(201).json(newMessage);

    } catch (err) {
        console.log("Error in sending channel message controller", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getChannelMessages = async (req, res) => {
    try {
        const { id: channelId } = req.params;
        const { skip = 0, limit = 5 } = req.query;

        const messages = await Message.find({ receiverId: channelId }).sort({ createdAt: -1 }).skip(parseInt(skip)).limit(limit).populate("senderId", "fullName username profilePic");

        res.status(200).json(messages);
    } catch (err) {
        console.log("Error in getting channel message controller", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
