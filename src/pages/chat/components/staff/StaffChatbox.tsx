import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChat } from "@/hooks/use-chat";
import { useNavigate } from "react-router-dom";
import type { Message, Conversation } from "@/types/models/chat";
import { useGetConversation, useGetMessages } from "@/services/chat/queries";
import { ConversationStatus } from "@/types/enums/conversationStatus";
import { MessageCircle } from "lucide-react";

type Props = { userId: string | null };

const StaffChatbox: React.FC<Props> = ({ userId }) => {
  const navigate = useNavigate();
  const [currentConversationId, setCurrentConversationId] = useState<string>();
  const [input, setInput] = useState("");

  const {
    sendMessage,
    claimTicket,
    closeTicket,
    connected,
    messages: rtMessages,
  } = useChat(userId ?? "", "STAFF");

  const { data: conversations = [] } = useGetConversation();
  const { data: oldMessages = [] } = useGetMessages(currentConversationId || "");

  useEffect(() => {
    if (conversations.length > 0 && !currentConversationId) {
      setCurrentConversationId(conversations[0].id);
    }
  }, [conversations, currentConversationId]);

  const mergedMessages: Message[] = currentConversationId
    ? [...(oldMessages || []), ...(rtMessages[currentConversationId] || [])]
    : [];

  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input, currentConversationId);
    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mergedMessages]);

  useEffect(() => {
    if (!userId) navigate("/login", { replace: true });
  }, [userId, navigate]);

  const handleClaimTicket = () => {
    if (currentConversationId) claimTicket(currentConversationId);
  };

  const handleCloseTicket = () => {
    if (currentConversationId) closeTicket(currentConversationId);
  };

  return (
    <div className="flex h-full border rounded-2xl bg-[#f9fbff] overflow-hidden shadow-lg dark:bg-[#101418]">
      {/* Sidebar */}
      <div className="w-64 border-r bg-[#f1f6ff] flex flex-col dark:bg-[#18202b]">
        <div className="flex items-center gap-2 p-3 border-b text-sky-700 font-semibold dark:text-sky-300">
          <MessageCircle size={18} />
          <span>Support Inbox</span>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.length > 0 ? (
            conversations.map((c: Conversation) => (
              <div
                key={c.id}
                className={`p-3 border-b cursor-pointer transition hover:bg-[#e8f3ff] dark:hover:bg-[#203046] ${
                  c.id === currentConversationId
                    ? "bg-sky-100 border-l-4 border-sky-500 dark:bg-[#243b5a] dark:border-sky-400"
                    : ""
                }`}
                onClick={() => setCurrentConversationId(c.id)}
              >
                <p className="font-semibold text-sm text-sky-900 truncate dark:text-sky-100">
                  Ticket #{c.id.slice(0, 6)}
                </p>
                <p className="text-xs text-sky-600 dark:text-sky-300">{c.status}</p>

                {!c.staffId && c.status === ConversationStatus.OPEN && (
                  <Button
                    variant="outline"
                    className="mt-2 text-xs border-sky-400 text-sky-600 hover:bg-sky-50 dark:border-sky-500 dark:text-sky-300 dark:hover:bg-[#203046]"
                    onClick={handleClaimTicket}
                  >
                    Claim Ticket
                  </Button>
                )}

                {c.staffId && c.status === ConversationStatus.OPEN && (
                  <Button
                    variant="outline"
                    className="mt-2 text-xs border-rose-400 text-rose-600 hover:bg-rose-50 dark:border-rose-400 dark:text-rose-300 dark:hover:bg-[#3a2222]"
                    onClick={handleCloseTicket}
                  >
                    Close Ticket
                  </Button>
                )}
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-sky-600 dark:text-sky-400">
              No conversations
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-3 border-b bg-white flex items-center gap-2 text-sm text-sky-700 dark:bg-[#12191f] dark:border-[#2b2b2b] dark:text-sky-300">
          <div
            className={`w-2 h-2 rounded-full ${
              connected ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {connected ? "Connected as Staff" : "Disconnected..."}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#f5f9ff] dark:bg-[#0e1217]">
          {mergedMessages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[75%] p-3 rounded-2xl shadow-sm text-sm transition-all ${
                msg.senderId === userId
                  ? "bg-sky-500 text-white ml-auto rounded-br-none dark:bg-sky-600"
                  : "bg-white text-gray-800 rounded-bl-none border border-gray-100 dark:bg-[#1c2530] dark:text-gray-200"
              }`}
            >
              <p className="whitespace-pre-wrap break-words leading-relaxed">{msg.content}</p>
              <p className="text-[10px] opacity-70 mt-1 dark:text-gray-400">
                {msg.sentAt && new Date(msg.sentAt).toLocaleTimeString()}
              </p>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t p-3 bg-white flex gap-2 dark:bg-[#12191f] dark:border-[#2b2b2b]">
          <Input
            placeholder="Send a message..."
            disabled={!connected}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="flex-1 rounded-full dark:bg-[#1b2430] dark:text-gray-200 dark:border-[#3a3a42] dark:placeholder-gray-500"
          />
          <Button
            className="rounded-full bg-sky-500 hover:bg-sky-600 text-white dark:bg-sky-600 dark:hover:bg-sky-500"
            onClick={handleSend}
            disabled={!connected || !input.trim()}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StaffChatbox;
