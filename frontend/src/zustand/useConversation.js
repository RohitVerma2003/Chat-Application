import { create } from "zustand";

const useConversation = create((set, get) => ({
    selectedConversation: null,
    messages: [],
    userConversations: [],
    channelConversations: [],

    setMessages: (messages) => set({ messages }),
    setSelectedConversation: (conversation) => {
        const current = get().selectedConversation;
        if (!current || conversation?._id !== current?._id) {
            set({ messages: [] });
        }

        set({ selectedConversation: conversation });
    },

    setUserConversations: (list) => set({ userConversations: list }),
    
    setChannelConversations: (list) => set({ channelConversations: list }),
}));

export default useConversation;
