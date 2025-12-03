import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import channelRoutes from './routes/channel.routes.js'

import connectToMongoDB from './db/connectToMongoDB.js';
import { app, server } from './socket/socket.js';
import cors from "cors"
import path from 'path';

app.use(cors({
    origin: "*",
    credentials: true
}))

const __dirname = path.resolve()

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/channels", channelRoutes);

app.use(express.static(path.join(__dirname , "/frontend/dist")))
app.get("*" , (req , res)=>{
    res.sendFile(path.join(__dirname , "frontend" , "dist" , "index.html"))
})

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`App is listening on port ${PORT}`);
});