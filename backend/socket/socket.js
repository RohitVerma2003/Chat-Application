import { Server } from "socket.io";
import http from "http";
import express from "express";
import { client, publisher, subscriber } from "../redis/client.js"

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["https://chat-app-rv.onrender.com", "http://localhost:5173", "http://localhost:4173"],
        methods: ["GET", "POST"]
    }
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

await subscriber.subscribe("typing_channel", (message) => {
  const { fromUserId, toUserId, type } = JSON.parse(message);

  const receiverSocketId = getReceiverSocketId(toUserId);

  if (receiverSocketId) {
    io.to(receiverSocketId).emit(
      type === "typing" ? "typing" : "stop_typing",
      { fromUserId }
    );
  }
});

const userSocketMap = {};

io.on("connection", (socket) => {
    console.log("User Connected", socket.id);

    const userId = socket.handshake.query.userId;

    if (userId !== undefined) {
        userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("joinChannel", (channelId) => {
        socket.join(channelId);
        console.log(`User joined channel: ${channelId}`);
    });

    socket.on("leaveChannel", (channelId) => {
        socket.leave(channelId);
        console.log(`User left channel: ${channelId}`);
    });

    socket.on("typing", async ({ fromUserId, toUserId }) => {
        await client.setEx(`typing:${fromUserId}:${toUserId}`, 5, "true");

        await publisher.publish(
            "typing_channel",
            JSON.stringify({
                fromUserId,
                toUserId,
                type: "typing",
            })
        );
    })

    socket.on("stop_typing", async ({ fromUserId, toUserId }) => {
        await publisher.publish(
            "typing_channel",
            JSON.stringify({
                fromUserId,
                toUserId,
                type: "stop_typing",
            })
        );
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
});

export { app, io, server };