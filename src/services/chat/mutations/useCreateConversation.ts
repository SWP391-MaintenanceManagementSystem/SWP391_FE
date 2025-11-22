import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createConversation } from "../apis/chat.api";
import { queryKeys } from "../queries/keys";
import { toast } from "sonner";

export const useCreateConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createConversation,
    onSuccess: () => {
      toast.success("Ticket created successfully ");
      queryClient.invalidateQueries({
        queryKey: queryKeys.conversations,
      });
    },
    onError: () => {
    }
  });
};
