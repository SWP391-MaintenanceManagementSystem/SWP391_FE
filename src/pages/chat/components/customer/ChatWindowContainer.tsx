import { useAuth } from "@/contexts/AuthContext";
import { useChat } from "@/hooks/use-chat";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMessages } from "@/services/chat/queries";
import type { Message } from "@/types/models/chat";
import ChatWindow from "./ChatWindown";


interface ChatWindowContainerProps {
  currentConversationId?: string;
}

export default function ChatWindowContainer({
  currentConversationId,
}: ChatWindowContainerProps) {
  const { auth } = useAuth();
  const userId = auth.user?.id ?? null;
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const { sendMessage, connected, messages: rtMessages } = useChat(
    userId ?? "",
    "CUSTOMER"
  );

  const { data: oldMessages = [] } = useGetMessages(currentConversationId || "");

  useEffect(() => {
    if (!userId) navigate("/login", { replace: true });
  }, [userId, navigate]);

  const mergedMessages: Message[] = useMemo(() => {
    if (!currentConversationId) return [];
    return [
      ...(oldMessages || []),
      ...(rtMessages[currentConversationId] || []),
    ];
  }, [currentConversationId, oldMessages, rtMessages]);

  const handleSend = () => {
    if (!input.trim() || !currentConversationId) return;
    sendMessage(input, currentConversationId);
    setInput("");
  };

  return (
    <ChatWindow
      connected={connected}
      input={input}
      setInput={setInput}
      mergedMessages={mergedMessages}
      handleSend={handleSend}
      userId={userId}
      isActive={!!currentConversationId}
    />
  );
}
