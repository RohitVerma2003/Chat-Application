import { useState } from "react"
import toast from "react-hot-toast";

const useCreateChannel = () => {
    const [loading, setLoading] = useState(false);

    const createChannel = async (name, description = "") => {
        if (loading) return;
        setLoading(true);
        try {
            const res = await fetch("/api/channels/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, description })
            })

            const data = await res.json();
            if(data.error) {
                throw new Error(data.error);
            }
            console.log(data);

            toast.success("New Channel Created");
        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    return {loading , createChannel}
}

export default useCreateChannel;