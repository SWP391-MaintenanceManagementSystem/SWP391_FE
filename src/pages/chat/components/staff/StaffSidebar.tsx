import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Search } from "lucide-react";
import { ConversationStatus } from "@/types/enums/conversationStatus";
import type { Conversation } from "@/types/models/chat";

interface StaffSidebarProps {
  conversations: Conversation[];
  currentConversationId?: string;
  onSelectConversation: (id: string) => void;
  isLoading?: boolean;
  claimTicket: (id: string) => void;
  closeTicket: (id: string) => void;
}

const TABS = [
  { key: "OPEN", label: "Active" },
  { key: "PENDING", label: "New" },
  { key: "CLOSED", label: "Inactive" },
] as const;

export default function StaffSidebar({
  conversations,
  currentConversationId,
  onSelectConversation,
  isLoading,
  claimTicket,
  closeTicket,
}: StaffSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("OPEN");

  const counts = {
    OPEN: conversations.filter((c) => c.staffId && c.status === "OPEN").length,
    PENDING: conversations.filter((c) => !c.staffId && c.status === "OPEN").length,
    CLOSED: conversations.filter((c) => c.status === "CLOSED").length,
  };

  const filteredConversations = conversations
    .filter((c) => {
      if (activeTab === "PENDING") return !c.staffId && c.status === "OPEN";
      if (activeTab === "OPEN") return c.staffId && c.status === "OPEN";
      if (activeTab === "CLOSED") return c.status === "CLOSED";
      return true;
    })
    .filter((c) => c.id.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="w-72 border-r bg-white flex flex-col dark:bg-dark-sidebar">
      {/* Header */}
      <div className="flex items-center justify-between p-3 text-gray-800 dark:text-gray-200">
        <span className="font-medium text-lg">Tickets</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-2 pb-2 border-b">
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
            {/* Status Dot */}
            <span
              className={`w-2 h-2 rounded-full ${
                tab.key === "OPEN"
                  ? activeTab === "OPEN" ? "bg-green-500" : "bg-green-300"
                  : tab.key === "PENDING"
                  ? activeTab === "PENDING" ? "bg-yellow-500" : "bg-yellow-300"
                  : activeTab === "CLOSED"
                  ? "bg-red-500"
                  : "bg-red-300"
              }`}
            />

            {/* Label + Count */}
            {tab.label} ({counts[tab.key]})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="p-2 border-b bg-white dark:bg-dark-sidebar">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search ticket ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 pr-3 py-1 text-sm bg-white dark:bg-slate-100-dark dark:text-gray-200 dark:border-[#3a3a42] rounded-md"
          />
        </div>
      </div>

      {/* Ticket List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
            Loading...
          </div>
        ) : filteredConversations.length > 0 ? (
          filteredConversations.map((c) => (
            <div
              key={c.id}
              className={`p-3 border-b cursor-pointer transition-all hover:bg-gray-100 dark:hover:bg-dark-surface
                ${
                  c.id === currentConversationId
                    ? "bg-purple-50 dark:bg-[#5b486d]"
                    : "bg-white dark:bg-transparent"
                }`}
              onClick={() => onSelectConversation(c.id)}
            >
              <p className="font-semibold text-sm text-gray-800 truncate dark:text-gray-100">
                Ticket #{c.id.slice(0, 6)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{c.status}</p>

              {!c.staffId && c.status === ConversationStatus.OPEN && (
                <Button
                  variant="outline"
                  className="mt-2 text-xs border-purple-400 text-purple-600 hover:bg-purple-50 dark:border-purple-500 dark:text-purple-300 dark:hover:bg-[#372d4b]"
                  onClick={(e) => {
                    e.stopPropagation();
                    claimTicket(c.id);
                  }}
                >
                  Claim Ticket
                </Button>
              )}

              {c.staffId && c.status === ConversationStatus.OPEN && (
                <Button
                  variant="outline"
                  className="mt-2 text-xs border-rose-400 text-rose-600 hover:bg-rose-50 dark:border-rose-400 dark:text-rose-300 dark:hover:bg-[#3a2222]"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTicket(c.id);
                  }}
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
