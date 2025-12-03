import { create } from "zustand";

const useConversation = create((set, get) => ({
    selectedConversation: null,
    messages: [],
    conversations: [],
    setMessages: (messages) => set({ messages }),
    setSelectedConversation: (conversation) => {
        const current = get().selectedConversation;
        if (current && conversation?._id !== current?._id) {
            set({ messages: [] });
        }
        
        set({ selectedConversation: conversation });
    },
    setConversations: (conversations) => {
        set({ conversations })
    }
}));

export default useConversation;
