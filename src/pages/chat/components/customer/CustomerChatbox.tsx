import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChat } from "@/hooks/use-chat";
import { useNavigate } from "react-router-dom";

import type { Message } from "@/types/models/chat";
import { useGetConversation, useGetMessages } from "@/services/chat/queries";

type Props = { userId: string | null };

const CustomerChatbox: React.FC<Props> = ({ userId }) => {
  const navigate = useNavigate();
  const [currentConversationId, setCurrentConversationId] = useState<string>();
  const [input, setInput] = useState("");

  // ✅ Realtime chat socket data
  const {
    sendMessage,
    connected,
    messages: rtMessages,
  } = useChat(userId ?? "", "CUSTOMER");

  // ✅ Load conversations from API
  const { data: conversations = [] } = useGetConversation();

  // ✅ Load old messages when conversation selected
  const { data: oldMessages = [] } = useGetMessages(
    currentConversationId || ""
  );

  // ✅ Choose first conversation on load
  useEffect(() => {
    if (conversations.length > 0 && !currentConversationId) {
      setCurrentConversationId(conversations[0].id);
    }
  }, [conversations, currentConversationId]);

  // ✅ Merge old + realtime messages
  const mergedMessages: Message[] = currentConversationId
    ? [...(oldMessages || []), ...(rtMessages[currentConversationId] || [])]
    : [];

  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input, currentConversationId);
    setInput("");
  };

  // ✅ Scroll bottom on message change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mergedMessages]);

  // ✅ Force login
  useEffect(() => {
    if (!userId) navigate("/login", { replace: true });
  }, [userId, navigate]);

  return (
    <div className="flex h-full border rounded-xl bg-white overflow-hidden shadow-md">
      {/* Sidebar */}
      <div className="w-64 border-r bg-gray-50 flex flex-col">
        <div className="p-3 font-semibold border-b text-gray-700">
          💬 Support Tickets
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.length > 0 ? (
            conversations.map((c) => (
              <div
                key={c.id}
                className={`p-3 border-b cursor-pointer hover:bg-gray-100 transition ${
                  c.id === currentConversationId
                    ? "bg-blue-50 border-l-4 border-blue-500"
                    : ""
                }`}
                onClick={() => setCurrentConversationId(c.id)}
              >
                <p className="font-semibold text-sm text-gray-800 truncate">
                  Ticket #{c.id.slice(0, 6)}
                </p>
                <p className="text-xs text-gray-500">{c.status}</p>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No conversations
            </div>
          )}
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col">
        {/* Status */}
        <div className="p-3 border-b bg-white flex items-center gap-2 text-sm">
          <div
            className={`w-2 h-2 rounded-full ${
              connected ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {connected ? "Connected to support" : "Disconnected..."}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100">
          {mergedMessages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[75%] p-3 rounded-xl shadow-sm text-sm ${
                msg.senderId === userId
                  ? "bg-blue-600 text-white ml-auto rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none"
              }`}
            >
              <p className="whitespace-pre-wrap break-words">{msg.content}</p>
              <p className="text-[10px] opacity-70 mt-1">
                {msg.sentAt && new Date(msg.sentAt).toLocaleTimeString()}
              </p>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t p-3 bg-white flex gap-2">
          <Input
            placeholder="Type a message..."
            disabled={!connected}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={!connected || !input.trim()}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerChatbox;
