import type { ChatStatus } from "../enums/chatStatus";

export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  recieverId?: string;
  content: string;
  sentAt: string;
};

export type Conversation = {
  id: string;
  customerId: string;
  staffId?: string | null;
  status: ChatStatus;
};
