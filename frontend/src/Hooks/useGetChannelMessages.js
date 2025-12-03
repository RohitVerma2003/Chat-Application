import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useChannelGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const { messages, setMessages, selectedConversation } = useConversation();

    const getMessages = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/channels/${selectedConversation?._id}?skip=${messages.length}&limit=20`)
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            if (data.length < 5) setHasMore(false);

            const newMessages = [...data.reverse(), ...messages];
            setMessages(newMessages);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages]);

    return { loading, messages, hasMore, getMessages };
}

export default useChannelGetMessages
