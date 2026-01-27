export interface Message {
  id: string;
  bookingId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  body: string;
  sentAt: Date;
  isRead?: boolean;
}

export interface ChatConversation {
  bookingId: string;
  careproId: string;
  careproName: string;
  careproAvatar?: string;
  lastMessage?: Message;
  unreadCount: number;
}

