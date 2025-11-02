import MainContentLayout from "@/components/MainContentLayout";
import { useState } from "react";
import StaffChatWindowContainer from "./StaffChatWindowContainer";
import StaffSidebarContainer from "./StaffSidebarContainer";
import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";

export default function StaffChatboxPage() {
  const [currentConversationId, setCurrentConversationId] = useState<string>();

  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs pathTitles={{ staffChat: "Chat" }} />
      <MainContentLayout>
        <div className="flex h-full rounded-xl border overflow-hidden bg-white dark:bg-[#101418]">
          <StaffSidebarContainer
            currentConversationId={currentConversationId}
            onSelectConversation={setCurrentConversationId}
          />
          <StaffChatWindowContainer
            currentConversationId={currentConversationId}
          />
        </div>
      </MainContentLayout>
    </div>
  );
}
