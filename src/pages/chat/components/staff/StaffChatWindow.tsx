import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import type { Message } from "@/types/models/chat";

interface Props {
  connected: boolean;
  mergedMessages: Message[];
  sendMessage: (content: string, conversationId?: string) => void;
  userId: string | null;
  currentConversationId?: string;
}

export default function StaffChatWindow({
  connected,
  mergedMessages,
  sendMessage,
  userId,
  currentConversationId,
}: Props) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim() || !currentConversationId) return;
    sendMessage(input, currentConversationId);
    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mergedMessages]);

  if (!currentConversationId) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
        Select a ticket to start chatting.
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-3 border-b bg-white flex items-center gap-2 text-sm dark:bg-[#121212] dark:border-[#2b2b2b] dark:text-gray-300">
        <div
          className={`w-2 h-2 rounded-full ${
            connected ? "bg-green-500" : "bg-red-500"
          }`}
        />
        {connected ? "Connected as Staff" : "Disconnected..."}
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100 dark:bg-[var(--color-dark-bg)]">
        {mergedMessages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[75%] p-3 rounded-xl shadow-sm text-sm transition-all duration-150
              ${
                msg.senderId === userId
                  ? "bg-purple-primary text-white ml-auto rounded-br-none dark:text-amber-primary dark:bg-purple-primary-dark"
                  : "bg-white text-gray-800 rounded-bl-none dark:bg-[var(--color-dark-surface)] dark:text-gray-200"
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

      {/* Input + Send */}
      <div className="border-t p-3 bg-white flex gap-2 dark:bg-[#121212] dark:border-[#2b2b2b]">
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
          onClick={handleSend}
          disabled={!connected || !input.trim()}
          className={`
            p-2 rounded-full transition-all duration-200
            ${
              !connected || !input.trim()
                ? " text-gray-500 cursor-not-allowed bg-purple-300 dark:bg-purple-300 opacity-70"
                : "bg-purple-700  dark:bg-purple-300  hover:brightness-110 active:scale-[0.97]"
            }
          `}
        >
          <SendHorizonal
            size={18}
            className={`
              transition-transform duration-200
              ${
                connected && input.trim()
                  ? "text-white hover:translate-x-[1px] hover:-translate-y-[1px]"
                  : "text-gray-500"
              }
            `}
          />
        </Button>
      </div>
    </div>
  );
}
