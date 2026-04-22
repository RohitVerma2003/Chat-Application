import { useAuthContext } from "../context/AuthContext";
import { useSocketContext } from "../context/SocketContext"
import useConversation from "../zustand/useConversation";

const useTypingStatus = ()=>{
    const {socket} = useSocketContext();
    const {authUser} = useAuthContext();
    const {selectedConversation} = useConversation();

    const emitTyping = ()=>{
        socket?.emit("typing" , {fromUserId: authUser?._id , toUserId: selectedConversation?._id});
    }

    const stopTyping = ()=>{
        socket?.emit("stop_typing" , {fromUserId: authUser?._id , toUserId: selectedConversation?._id});
    }

    return {emitTyping , stopTyping};
}

export default useTypingStatus;