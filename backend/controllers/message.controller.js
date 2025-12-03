import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
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

        const newMessage = new Message({ senderId, receiverId, message });
        if (newMessage) conversation.messages.push(newMessage._id);

        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);

    } catch (err) {
        console.log("Error in Send Message Controller", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;
        const { skip = 0, limit = 5 } = req.query;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        });

        if (!conversation) return res.status(200).json([]);

        const messages = await Message.find({
            _id: { $in: conversation.messages }
        }).sort({ createdAt: -1 })
            .skip(Number(skip))
            .limit(Number(limit))
            .populate("senderId", "fullName username profilePic");

        res.status(200).json(messages);
    } catch (err) {
        console.log("Error in Get Message Controller", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
