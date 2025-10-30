import type { ConversationStatus } from "../enums/conversationStatus";

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
  status: ConversationStatus;
};
