import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const useGetChannelConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    const getChannelConversations = async () => {
        setLoading(true);

        try {
            const res = await fetch("/api/channels");
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setConversations(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getChannelConversations();
    }, [])
    return { loading, conversations, getChannelConversations };
}

export default useGetChannelConversations;