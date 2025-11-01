import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Search } from "lucide-react";
import { ConversationStatus } from "@/types/enums/conversationStatus";
import { useChat } from "@/hooks/use-chat";
import type { Conversation } from "@/types/models/chat";

interface StaffSidebarProps {
  conversations: Conversation[];
  currentConversationId?: string;
  onSelectConversation: (id: string) => void;
  isLoading?: boolean;
}

const TABS = [
  { key: "OPEN", label: "Active" },
  { key: "PENDING", label: "New" },
  { key: "CLOSED", label: "Inactive" },
];

export default function StaffSidebar({
  conversations,
  currentConversationId,
  onSelectConversation,
  isLoading,
}: StaffSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("OPEN");
  const { claimTicket, closeTicket } = useChat("", "STAFF");
  const filteredConversations = conversations
    .filter((c) => {
      if (activeTab === "PENDING") return !c.staffId; // staffId null => new ticket
      if (activeTab === "OPEN") return c.staffId && c.status === "OPEN";
      if (activeTab === "CLOSED") return c.status === "CLOSED";
      return true;
    })
    .filter((c) => c.id.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="w-72 border-r bg-gray-50 dark:bg-[#1f1f1f] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 text-gray-700 dark:text-gray-200">
        <span className="font-medium">Tickets</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-2 pb-2 border-b dark:border-[#2a2a2a]">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-2 transition
        ${
          activeTab === tab.key
            ? "bg-gray-200 dark:bg-[#2b2b2f] text-gray-900 dark:text-white"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"
        }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                tab.key === "OPEN"
                  ? activeTab === "OPEN"
                    ? "bg-green-500"
                    : "bg-green-300"
                  : tab.key === "PENDING"
                  ? activeTab === "PENDING"
                    ? "bg-yellow-500"
                    : "bg-yellow-300"
                  : activeTab === "CLOSED"
                  ? "bg-red-500"
                  : "bg-red-300"
              }`}
            ></span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
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

      {/* Ticket List */}
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
                ${
                  c.id === currentConversationId
                    ? "bg-purple-100 dark:bg-[#2a2343]"
                    : ""
                }`}
              onClick={() => onSelectConversation(c.id)}
            >
              <p className="font-semibold text-sm text-gray-800 truncate dark:text-gray-100">
                Ticket #{c.id.slice(0, 6)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {c.status}
              </p>

              {/* Claim / Close Ticket */}
              {!c.staffId && c.status === ConversationStatus.OPEN && (
                <Button
                  variant="outline"
                  className="mt-2 text-xs border-purple-400 text-purple-600 hover:bg-purple-50 dark:border-purple-500 dark:text-purple-300 dark:hover:bg-[#372d4b]"
                  onClick={() => claimTicket(c.id)}
                >
                  Claim Ticket
                </Button>
              )}

              {c.staffId && c.status === ConversationStatus.OPEN && (
                <Button
                  variant="outline"
                  className="mt-2 text-xs border-rose-400 text-rose-600 hover:bg-rose-50 dark:border-rose-400 dark:text-rose-300 dark:hover:bg-[#3a2222]"
                  onClick={() => closeTicket(c.id)}
                >
                  Close Ticket
                </Button>
              )}
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No tickets found
          </div>
        )}
      </div>
    </div>
  );
}
