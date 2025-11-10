import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActionBtn from "@/components/table/ActionBtn";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import { PencilLine, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { Conversation } from "@/types/models/chat";
import type { ConversationStatus } from "@/types/enums/conversationStatus";
import { useCreateConversation } from "@/services/chat/mutations/useCreateConversation";

interface ChatSidebarProps {
  conversations: Conversation[];
  currentConversationId?: string;
  onSelectConversation: (id: string) => void;
  isLoading?: boolean;
}

export default function ChatSidebar({
  conversations,
  currentConversationId,
  onSelectConversation,
  isLoading,
}: ChatSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<ConversationStatus>("OPEN");

  const { mutate: createConversation, isPending } = useCreateConversation();

  const filteredStatusConversations = conversations.filter(
    (c) => c.status === "OPEN" || c.status === "CLOSED"
  );

  const counts = {
    OPEN: filteredStatusConversations.filter((c) => c.status === "OPEN").length,
    CLOSED: filteredStatusConversations.filter((c) => c.status === "CLOSED")
      .length,
  };

  const filteredConversations = filteredStatusConversations.filter(
    (c) =>
      c.status === activeTab &&
      c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-72 border-r bg-white flex flex-col dark:bg-dark-sidebar">
      {/* Header */}
      <div className="flex items-center justify-between p-3 text-gray-800 dark:text-gray-200 border-b bg-white dark:bg-dark-sidebar">
        <span className="font-medium text-lg">Tickets</span>
        <TooltipWrapper content="Create new ticket">
          <ActionBtn
            icon={<PencilLine size={16} />}
            onClick={() => createConversation()}
            disabled={isPending}
            className="rounded-full p-2 border-none shadow-sm transition-all hover:scale-105
            bg-white hover:bg-gray-100 dark:bg-dark-surface dark:hover:bg-[#3a3a42]"
          />
        </TooltipWrapper>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(val) => setActiveTab(val as ConversationStatus)}
      >
        <TabsList className="w-full bg-gray-100 p-1 grid grid-cols-2 rounded-lg dark:bg-slate-100-dark">
          <TabsTrigger
            value="OPEN"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900 text-sm font-medium flex items-center gap-2 transition-all"
          >
            <span
              className={`w-2 h-2 rounded-full transition-colors ${
                activeTab === "OPEN" ? "bg-green-500" : "bg-green-300"
              }`}
            />
            Active ({counts.OPEN})
          </TabsTrigger>

          <TabsTrigger
            value="CLOSED"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900 text-sm font-medium flex items-center gap-2 transition-all"
          >
            <span
              className={`w-2 h-2 rounded-full transition-colors ${
                activeTab === "CLOSED" ? "bg-red-500" : "bg-red-300"
              }`}
            />
            Inactive ({counts.CLOSED})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search */}
      <div className="p-2 border-b bg-white dark:bg-dark-sidebar">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <Input
            placeholder="Search ticket ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 pr-3 py-1 text-sm bg-white dark:bg-slate-100-dark dark:text-gray-200 dark:border-[#3a3a42] rounded-md"
          />
        </div>
      </div>

      {/* Tickets list */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
            Loading...
          </div>
        ) : filteredConversations.length > 0 ? (
          filteredConversations.map((c) => (
            <div
              key={c.id}
              className={`p-3 border-b cursor-pointer transition-all 
              hover:bg-gray-50 dark:hover:bg-dark-surface
              ${
                c.id === currentConversationId
                  ? "bg-purple-50 dark:bg-[#5b486d]"
                  : "bg-white dark:bg-transparent"
              }`}
              onClick={() => onSelectConversation(c.id)}
            >
              <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">
                Ticket #{c.id.slice(0, 6)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {c.status}
              </p>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
            No tickets found
          </div>
        )}
      </div>
    </div>
  );
}
