import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@/hooks/use-chat";
import type { Conversation, Message } from "@/types/models/chat";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Props = {
  userId: string | null;
};

const StaffChatbox: React.FC<Props> = ({ userId }) => {
  const navigate = useNavigate();
  const [currentConversationId, setCurrentConversationId] = useState<string | undefined>();
  const [input, setInput] = useState("");

   const chatHook = useChat(userId ?? '', "STAFF");
  const { conversations: tickets, messages, sendMessage, claimConversation, connected: isConnected } = chatHook;

  useEffect(() => {
    if (!userId) {
      navigate("/login", { replace: true });
    }
  }, [userId, navigate]);

  // Set initial conversation
  useEffect(() => {
    if (Array.isArray(tickets) && tickets.length > 0 && !currentConversationId) {
      setCurrentConversationId(tickets[0]?.id);
    }
  }, [tickets, currentConversationId]);

  if (!userId) {
    return null;
  }

  // Monitor connection status
  useEffect(() => {
    if (!isConnected) {
      toast.error("Disconnected from chat service. Attempting to reconnect...", {
        duration: 5000
      });
    }
  }, [isConnected]);

  const currentMessages: Message[] = currentConversationId
    ? messages[currentConversationId] || []
    : [];

  const currentTicket: Conversation | undefined = Array.isArray(tickets) 
    ? tickets.find((t) => t.id === currentConversationId)
    : undefined;

  const handleSend = () => {
    if (!input.trim() || !currentConversationId) return;
    if (!isConnected) {
      toast.error("Not connected to chat service");
      return;
    }
    sendMessage(currentConversationId, input, currentTicket?.customerId);
    setInput("");
  };

  const handleClaim = () => {
    if (!currentConversationId) return;
    if (!isConnected) {
      toast.error("Not connected to chat service");
      return;
    }
    claimConversation(currentConversationId);
  };

  return (
    <div className="flex h-full min-h-[calc(100vh-5rem)] gap-4 relative">
      {/* Ticket List */}
      <div className="w-64 border-r">
        {Array.isArray(tickets) && tickets.map((t) => (
          <div
            key={t.id}
            className={`p-2 cursor-pointer hover:bg-gray-50 ${
              t.id === currentConversationId ? "bg-gray-100" : ""
            }`}
            onClick={() => setCurrentConversationId(t.id)}
          >
            <p className="font-bold truncate">{t.customerId}</p>
            <p className="text-xs text-gray-500">{t.status}</p>
            {t.lastMessage && (
              <p className="text-sm text-gray-600 truncate">{t.lastMessage.content}</p>
            )}
          </div>
        ))}
        {(!tickets || tickets.length === 0) && (
          <div className="p-4 text-center text-gray-500">
            No conversations yet
          </div>
        )}
      </div>

      {/* Chat Box */}
      <div className="flex-1 flex flex-col">
        {currentTicket && !currentTicket.staffId && currentTicket.status === "OPEN" && (
          <Button onClick={handleClaim} className="mb-2" disabled={!isConnected}>
            Claim Ticket
          </Button>
        )}
        <ScrollArea className="flex-1 p-2">
          {currentMessages.map((msg) => (
            <div
              key={msg.id}
              className={`p-2 my-1 rounded max-w-[80%] ${
                msg.senderId === userId
                  ? "bg-blue-100 ml-auto"
                  : "bg-gray-100"
              }`}
            >
              <p className="text-sm break-words">{msg.content}</p>
              {msg.sentAt && (
                <p className="text-xs text-gray-500">
                  {new Date(msg.sentAt).toLocaleTimeString()}
                </p>
              )}
            </div>
          ))}
          {currentMessages.length === 0 && (
            <div className="h-full flex items-center justify-center text-gray-500">
              No messages yet
            </div>
          )}
        </ScrollArea>
        <div className="flex gap-2 p-4 border-t">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type a message..."
            disabled={!isConnected || !currentTicket?.staffId}
          />
          <Button 
            onClick={handleSend} 
            disabled={!isConnected || !currentTicket?.staffId || !input.trim()}
          >
            Send
          </Button>
        </div>
      </div>

      {/* Connection Status */}
      <div className="absolute top-0 left-0 right-0 p-2">
        {!isConnected && (
          <div className="flex items-center justify-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-md shadow-md border border-red-200 animate-pulse">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span>Disconnected from chat service - Attempting to reconnect...</span>
          </div>
        )}
        {isConnected && (
          <div className="flex items-center justify-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-md shadow-md border border-green-200">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Connected to chat service</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffChatbox;
