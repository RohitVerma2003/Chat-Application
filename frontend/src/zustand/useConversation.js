import { create } from "zustand";

const useConversation = create((set) => ({
    selectedConversation: null,
    messages: [],

    setMessages: (messages) => set({ messages }),

    setSelectedConversation: (selectedConversation) => {
        set({ messages: [] });
        set({ selectedConversation });
    },
}));

export default useConversation;
