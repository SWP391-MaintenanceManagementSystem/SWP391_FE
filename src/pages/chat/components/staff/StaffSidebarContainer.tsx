import { useGetConversation } from "@/services/chat/queries";
import StaffSidebar from "./StaffSidebar";

interface StaffSidebarContainerProps {
  currentConversationId?: string;
  onSelectConversation: (id: string) => void;
}

export default function StaffSidebarContainer({
  currentConversationId,
  onSelectConversation,
}: StaffSidebarContainerProps) {
  const { data: conversations = [], isLoading } = useGetConversation();

  return (
    <StaffSidebar
      conversations={conversations}
      currentConversationId={currentConversationId}
      onSelectConversation={onSelectConversation}
      isLoading={isLoading}
    />
  );
}
