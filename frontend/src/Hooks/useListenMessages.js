import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext"
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
    const { onlineUsers, socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            setMessages([...messages, newMessage]);
        });

        socket?.on("channelMessage", (newMessage) => {
            console.log(newMessage)
            setMessages([...messages, newMessage]);
        });

        return () => {
            socket?.off("newMessage");
            socket?.off("channelMessage");
        }
    }, [socket, setMessages, messages]);
}

export default useListenMessages
