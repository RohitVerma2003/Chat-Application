import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetChannelConversations = () => {
    const [loading, setLoading] = useState(false);
    const {setConversations} = useConversation();

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
    return { loading, getChannelConversations };
}

export default useGetChannelConversations;