import MainContentLayout from "@/components/MainContentLayout";
import { useState } from "react";
import ChatWindowContainer from "./ChatWindowContainer";
import ChatSidebarContainer from "./ChatSideBarContainer";
import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";

export default function CustomerChatboxPage() {
  const [currentConversationId, setCurrentConversationId] = useState<string>();

  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
    <DynamicBreadcrumbs pathTitles={{ chat: "Inbox Support" }} />
      <MainContentLayout>
        <div className="flex  h-full rounded-xl border overflow-hidden white dark:bg-bg-app">
          <ChatSidebarContainer
            currentConversationId={currentConversationId}
            onSelectConversation={setCurrentConversationId}
          />
          <ChatWindowContainer currentConversationId={currentConversationId} />
        </div>
      </MainContentLayout>
    </div>
  );
}
