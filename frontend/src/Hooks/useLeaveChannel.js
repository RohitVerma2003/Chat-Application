import { useState } from "react";
import toast from "react-hot-toast";

const useLeaveChannel = ()=>{
    const [loading , setLoading] = useState(false);

    const leaveChannel = async(channelId , userId)=>{
        if(loading) return;
        setLoading(true);

        try {
            const res = await fetch('/api/channels/leave' , {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({channelId , userId})
            });

            const data = await res.json();

            if(data.error){
                throw new Error(data.error);                
            }
            
            toast.success(data.message);
            return {message: "leaved the channel"}
        } catch (error) {
            toast.error(error.message);
            return {error: "Error in leaving"}
        }finally{
            setLoading(false);
        }
    }

    return {loading , leaveChannel};
}

export default useLeaveChannel;