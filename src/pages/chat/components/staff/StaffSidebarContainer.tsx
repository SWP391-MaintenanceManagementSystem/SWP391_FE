import { useGetConversation } from "@/services/chat/queries";
import StaffSidebar from "./StaffSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useChat } from "@/hooks/use-chat";

interface StaffSidebarContainerProps {
  currentConversationId?: string;
  onSelectConversation: (id: string) => void;
}

export default function StaffSidebarContainer({
  currentConversationId,
  onSelectConversation,
}: StaffSidebarContainerProps) {
  const {
    data: conversations = [],
    isLoading,
    refetch: refetchConversations,
  } = useGetConversation();
  const { auth } = useAuth();
  const { claimTicket, closeTicket } = useChat(auth.user?.id ?? "", "STAFF");

  return (
    <StaffSidebar
      conversations={conversations}
      currentConversationId={currentConversationId}
      onSelectConversation={onSelectConversation}
      claimTicket={claimTicket}
      closeTicket={closeTicket}
      isLoading={isLoading}
      refetchTicket={refetchConversations}
    />
  );
}
