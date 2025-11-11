import { httpPrivate } from "@/lib/http";
import type { Conversation, Message } from "@/types/models/chat";
import type { BaseResponse } from "@/types/models/response";

export const getMessages = async (conversationId: string) => {
  const res = await httpPrivate.get<BaseResponse<{ data: Message[] }>>(
    `/chats/conversations/${conversationId}/messages`
  );
  return res.data;
};

export const getConversations = async () => {
  const res = await httpPrivate.get<BaseResponse<{ data: Conversation[] }>>(
    `/chats/conversations`
  );
  return res.data;
};

export const createConversation = async () => {
  const res = await httpPrivate.post<BaseResponse<{ data: Conversation }>>(
    `/chats/conversations`
  );
  return res.data;
};