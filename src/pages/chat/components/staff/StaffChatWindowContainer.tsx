import { useEffect, useMemo } from "react";
import { useChat } from "@/hooks/use-chat";
import { useGetMessages } from "@/services/chat/queries";
import type { Message } from "@/types/models/chat";
import StaffChatWindow from "./StaffChatWindow";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface Props {
  currentConversationId?: string;
}

export default function StaffChatWindowContainer({
  currentConversationId,
}: Props) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const userId = auth.user?.id ?? null;
  const {
    sendMessage,
    connected,
    messages: rtMessages,
  } = useChat(userId ?? "", "STAFF");

  const { data: oldMessages = [] } = useGetMessages(
    currentConversationId || ""
  );
  useEffect(() => {
    if (!userId) navigate("/login", { replace: true });
  }, [userId, navigate]);
  const mergedMessages: Message[] = useMemo(
    () =>
      currentConversationId
        ? [...(oldMessages || []), ...(rtMessages[currentConversationId] || [])]
        : [],
    [currentConversationId, oldMessages, rtMessages]
  );

  return (
    <StaffChatWindow
      connected={connected}
      mergedMessages={mergedMessages}
      sendMessage={sendMessage}
      userId={userId}
      currentConversationId={currentConversationId}
    />
  );
}
