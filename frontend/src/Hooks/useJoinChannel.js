import { useState } from "react"
import toast from "react-hot-toast";

const useJoinChannel = () => {
    const [loading, setLoading] = useState(false);

    const joinChannel = async (channelId, userId) => {
        if (loading) return;
        setLoading(true);

        try {
            const res = await fetch("/api/channels/join", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ channelId, userId }),
            }
            );

            const data = await res.json();
            
            if (data.error) {
                throw new Error(data.error);
            }

            toast.success("Joined channel successfully");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return {setLoading , joinChannel}
}

export default useJoinChannel;