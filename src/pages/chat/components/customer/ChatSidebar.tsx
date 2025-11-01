import ActionBtn from "@/components/table/ActionBtn";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import { PencilLine, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type Conversation = {
  id: string;
  status: string;
};

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

  const filteredConversations = conversations.filter((c) =>
    c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-72 border-r bg-gray-50 dark:bg-[#1f1f1f] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3  text-gray-700 dark:text-gray-200">
        <div className="flex items-center gap-2">
          <span className="font-medium">Tickets</span>
        </div>

        <TooltipWrapper content="Create new ticket">
          <ActionBtn
            icon={<PencilLine size={16} />}
            onClick={() => console.log("Create new ticket")}
            className=" rounded-full p-2 border-none shadow-sm transition-transform hover:scale-105
      bg-white hover:bg-gray-100
      dark:bg-[#2b2b2f] dark:hover:bg-[#3a3a42]"
          />
        </TooltipWrapper>
      </div>

      {/* Search bar */}
      <div className="p-2 border-b dark:border-[#2a2a2a]">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <Input
            placeholder="Search ticket ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 pr-3 py-1 text-sm bg-white dark:bg-[#2a2a2a] dark:text-gray-200 dark:border-[#3a3a42] rounded-md"
          />
        </div>
      </div>

      {/* List Ticket */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            Loading...
          </div>
        ) : filteredConversations.length > 0 ? (
          filteredConversations.map((c) => (
            <div
              key={c.id}
              className={`p-3 border-b cursor-pointer transition-all hover:bg-gray-100 dark:hover:bg-[var(--color-dark-hover-bg)]
 ${c.id === currentConversationId ? "bg-purple-100   dark:bg-[#2a2343] " : ""}`}
              onClick={() => onSelectConversation(c.id)}
            >
              <p className="font-semibold text-sm text-gray-800 truncate dark:text-gray-100">
                Ticket #{c.id.slice(0, 6)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {c.status}
              </p>
            </div>
          ))
        ) : (
          <div className="p-4 text-center  text-gray-500 dark:text-gray-400">
            No tickets found
          </div>
        )}
      </div>
    </div>
  );
}
