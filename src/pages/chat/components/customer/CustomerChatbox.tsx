import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChat } from "@/hooks/use-chat";
import { useNavigate } from "react-router-dom";
import { MessagesSquare } from "lucide-react";
import type { Message } from "@/types/models/chat";
import { useGetConversation, useGetMessages } from "@/services/chat/queries";

type Props = { userId: string | null };

const CustomerChatbox: React.FC<Props> = ({ userId }) => {
  const navigate = useNavigate();
  const [currentConversationId, setCurrentConversationId] = useState<string>();
  const [input, setInput] = useState("");

  const { sendMessage, connected, messages: rtMessages } = useChat(
    userId ?? "",
    "CUSTOMER"
  );

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

  return (
    <div className="flex h-full border rounded-xl bg-white overflow-hidden shadow-md 
      dark:bg-bg-app ">

      {/* Sidebar */}
      <div className="w-64 border-r bg-gray-50 flex flex-col 
        dark:bg-[#1f1f1f] ">

        <div className="flex items-center gap-2 p-3 border-b text-gray-700 
          dark:text-gray-200 ">
          <MessagesSquare size={18} />
          <span>Support Tickets</span>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.length > 0 ? (
            conversations.map((c) => (
              <div
                key={c.id}
                className={`p-3 border-b cursor-pointer transition hover:bg-gray-100
                  dark:hover:bg-chat
                  ${
                    c.id === currentConversationId
                      ? "bg-purple-50 border-l-4 border-purple-500 dark:bg-[#2a2343] dark:border-[#9d7dff]"
                      : ""
                  }`}
                onClick={() => setCurrentConversationId(c.id)}
              >
                <p className="font-semibold text-sm text-gray-800 truncate 
                  dark:text-gray-100">
                  Ticket #{c.id.slice(0, 6)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{c.status}</p>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No conversations
            </div>
          )}
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col">

        <div className="p-3 border-b bg-white flex items-center gap-2 text-sm 
          dark:bg-[#121212] dark:border-[#2b2b2b] dark:text-gray-300">
          <div
            className={`w-2 h-2 rounded-full ${
              connected ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {connected ? "Connected to support" : "Disconnected..."}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100 
          dark:bg-[#111113]">
          {mergedMessages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[75%] p-3 rounded-xl shadow-sm text-sm
                ${
                  msg.senderId === userId
                    ? "bg-purple-primary text-white ml-auto rounded-br-none dark:bg-[#7c4dff]"
                    : "bg-white text-gray-800 rounded-bl-none dark:bg-[#2b2b2f] dark:text-gray-200"
                }`}
            >
              <p className="whitespace-pre-wrap break-words">{msg.content}</p>
              <p className="text-[10px] opacity-70 mt-1 dark:text-gray-400">
                {msg.sentAt && new Date(msg.sentAt).toLocaleTimeString()}
              </p>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t p-3 bg-white flex gap-2 
          dark:bg-[#121212] dark:border-[#2b2b2b]">
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
            className="flex-1 dark:bg-[#1c1c20] dark:text-gray-200 dark:border-[#3a3a42] dark:placeholder-gray-500"
          />

          <Button
            className="bg-purple-light text-black dark:bg-[#7c4dff] dark:text-white"
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

export default CustomerChatbox;
