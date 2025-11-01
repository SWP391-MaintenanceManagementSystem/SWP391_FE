import { toast } from "sonner";
import { getConversations, getMessages } from "../apis/chat.api";
import { queryKeys } from "./keys";
import { useQuery } from "@tanstack/react-query";

export const useGetMessages = (conversationId: string) => {
  return useQuery({
    queryKey: queryKeys.messages(conversationId),
    queryFn: async () => {
      try {
        const res = await getMessages(conversationId);
        return res.data;
      } catch (error) {
        // toast.error("Fail to connect");
        console.log(error);
        throw error;
      }
    },
    enabled: !!conversationId,
  });
};

export const useGetConversation = () => {
  return useQuery({
    queryKey: queryKeys.conversations,
    queryFn: async () => {
      try {
        const res = await getConversations();
        return res.data;
      } catch (error) {
        toast.error("Fail to connect conversation");
        throw error;
      }
    },
  });
};
