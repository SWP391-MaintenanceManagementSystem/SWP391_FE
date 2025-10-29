import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@/hooks/use-chat";
import type { Message } from "@/types/models/chat";
import { useNavigate } from "react-router-dom";

type Props = { userId: string | null };

const CustomerChatbox: React.FC<Props> = ({ userId }) => {
  const navigate = useNavigate();
  const [currentConversationId, setCurrentConversationId] = useState<string>();
  const [input, setInput] = useState("");

  const { conversations, messages, sendMessage, connected } = useChat(
    userId ?? "",
    "CUSTOMER"
  );

  // Redirect if not logged in
  useEffect(() => {
    if (!userId) navigate("/login", { replace: true });
  }, [userId, navigate]);

  // Auto-select first conversation
  useEffect(() => {
    if (conversations.length > 0 && !currentConversationId) {
      setCurrentConversationId(conversations[0].id);
    }
  }, [conversations, currentConversationId]);

  const currentMessages: Message[] = currentConversationId
    ? messages[currentConversationId] || []
    : [];

  const handleSend = () => {
    if (!input.trim()) return;

    sendMessage(input, currentConversationId);
    setInput(""); // clear input
  };

  return (
    <div className="flex h-full gap-4 relative">
      {/* Ticket/Conversation List */}
      <div className="w-64 border-r overflow-y-auto">
        {conversations.length > 0 ? (
          conversations.map((c) => (
            <div
              key={c.id}
              className={`p-2 cursor-pointer hover:bg-gray-50 ${
                c.id === currentConversationId ? "bg-gray-100" : ""
              }`}
              onClick={() => setCurrentConversationId(c.id)}
            >
              <p className="font-bold truncate">{c.customerId}</p>
              <p className="text-xs text-gray-500">{c.status}</p>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            No conversations yet
          </div>
        )}
      </div>

      {/* Chat Box */}
      <div className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 p-2">
          {currentMessages.length > 0 ? (
            currentMessages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 my-1 rounded-lg max-w-[80%] ${
                  msg.senderId === userId
                    ? "bg-blue-100 ml-auto text-blue-900"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                {msg.sentAt && (
                  <p className="text-xs mt-1 opacity-60">
                    {new Date(msg.sentAt).toLocaleTimeString()}
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              No messages yet
            </div>
          )}
        </ScrollArea>

        <div className="flex gap-2 p-4 border-t">
          <Input
            type="text"
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type a message..."
            disabled={!connected}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!connected || !input.trim()}
            variant="default"
          >
            Send
          </Button>
        </div>
      </div>

      {/* Connection status */}
      <div className="absolute top-0 left-0 right-0 p-2">
        {!connected ? (
          <div className="flex items-center justify-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-md shadow-md border border-red-200 animate-pulse">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span>Disconnected from chat service...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-md shadow-md border border-green-200">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Connected to chat service</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerChatbox;
