import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Message, ChatConversation } from '../types/chat.types';

interface ChatState {
  messages: { [bookingId: string]: Message[] };
  conversations: ChatConversation[];
  addMessage: (bookingId: string, message: Message) => void;
  getMessages: (bookingId: string) => Message[];
  getConversations: () => ChatConversation[];
  markAsRead: (bookingId: string) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: {},
      conversations: [],
      addMessage: (bookingId, message) =>
        set((state) => ({
          messages: {
            ...state.messages,
            [bookingId]: [...(state.messages[bookingId] || []), message],
          },
        })),
      getMessages: (bookingId) => {
        return get().messages[bookingId] || [];
      },
      getConversations: () => {
        return get().conversations;
      },
      markAsRead: (bookingId) =>
        set((state) => ({
          messages: {
            ...state.messages,
            [bookingId]: (state.messages[bookingId] || []).map((msg) => ({
              ...msg,
              isRead: true,
            })),
          },
        })),
    }),
    {
      name: 'chat-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

