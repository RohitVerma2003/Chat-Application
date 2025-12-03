import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const { setUserConversations } = useConversation()

    const getConversations = async () => {
        setLoading(true);

        try {
            const res = await fetch("/api/users");
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setUserConversations(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getConversations();
    }, [])
    return { loading, getConversations };
}

export default useGetConversations