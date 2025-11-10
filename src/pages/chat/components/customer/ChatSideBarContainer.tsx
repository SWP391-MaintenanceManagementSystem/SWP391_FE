import { useGetConversation } from "@/services/chat/queries";
import ChatSidebar from "./ChatSidebar";

interface ChatSidebarContainerProps {
  currentConversationId?: string;
  onSelectConversation: (id: string) => void;
}

export default function ChatSidebarContainer({
  currentConversationId,
  onSelectConversation,
}: ChatSidebarContainerProps) {
  const { data: conversations = [], isLoading } = useGetConversation();

  return (
    <ChatSidebar
      conversations={conversations}
      currentConversationId={currentConversationId}
      onSelectConversation={onSelectConversation}
      isLoading={isLoading}
    />
  );
}
