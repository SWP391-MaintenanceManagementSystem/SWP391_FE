import { useEffect, useState, useCallback } from "react";
import { socket } from "@/lib/socket";
import type { Conversation, Message } from "@/types/models/chat";
import { toast } from "sonner";

export function useChat(userId: string, role: "CUSTOMER" | "STAFF") {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!userId) return;

    socket.connect();

    // Connected
    socket.on("connect", () => {
      setConnected(true);
      console.log("[Socket] connected:", socket.id);
      socket.emit("register", userId);
    });

    // Disconnected
    socket.on("disconnect", () => {
      setConnected(false);
      console.log("[Socket] disconnected");
      toast.error("Disconnected from chat service");
    });

    // Connection error
    socket.on("connect_error", (err) => {
      setConnected(false);
      console.error("[Socket] connect_error:", err);
      toast.error("Failed to connect to chat service");
    });

    // General error from server
    socket.on("error", (data: { message: string }) => {
      console.error("[Socket] error:", data.message);
      toast.error(data.message);
    });

    // New ticket (for staff)
    socket.on("new_ticket", (msg: Message) => {
      if (role !== "STAFF") return;
      if (!msg.conversationId) return;

      setConversations((prev) => [
        {
          id: msg.conversationId,
          customerId: msg.senderId,
          status: "OPEN",
          lastMessage: msg,
        },
        ...prev.filter((c) => c.id !== msg.conversationId),
      ]);

      setMessages((prev) => ({
        ...prev,
        [msg.conversationId]: [msg],
      }));

      toast.info("New ticket received");
    });

    // Any new message
    socket.on("message", (msg: Message) => {

      if (!msg.conversationId) return;
      console.log("[Socket] message received:", msg);

      setMessages((prev) => ({
        ...prev,
        [msg.conversationId]: [...(prev[msg.conversationId] || []), msg],
      }));

      setConversations((prev) =>
        prev.map((c) =>
          c.id === msg.conversationId ? { ...c, lastMessage: msg } : c
        )
      );
    });

    // Message sent confirmation
    socket.on("message_sent", (msg: Message) => {
      if (!msg.conversationId) return;
      console.log("[Socket] message sent confirmation:", msg);

      setMessages((prev) => ({
        ...prev,
        [msg.conversationId]: [...(prev[msg.conversationId] || []), msg],
      }));

      setConversations((prev) =>
        prev.map((c) =>
          c.id === msg.conversationId ? { ...c, lastMessage: msg } : c
        )
      );
    });

    // Ticket claimed
    socket.on("ticket_claimed", (conv: Conversation) => {
      console.log("[Socket] ticket claimed:", conv);
      setConversations((prev) =>
        prev.map((c) => (c.id === conv.id ? conv : c))
      );
      if (role === "STAFF") toast.success("Ticket claimed successfully");
    });

    // Ticket updated
    socket.on("ticket_updated", (conv: Conversation) => {
      console.log("[Socket] ticket updated:", conv);
      setConversations((prev) =>
        prev.map((c) => (c.id === conv.id ? conv : c))
      );
    });

    return () => {
      socket.disconnect();
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("error");
      socket.off("new_ticket");
      socket.off("message");
      socket.off("message_sent");
      socket.off("ticket_claimed");
      socket.off("ticket_updated");
    };
  }, [userId, role]);

  // Send message
  const sendMessage = useCallback(
    (content: string, conversationId?: string) => {
      if (!connected) {
        toast.error("Not connected to chat service");
        return;
      }
      socket.emit("message", {
        message: content,
        conversationId: conversationId || null,
      });
    },
    [connected]
  );

  // Claim ticket (staff only)
  const claimConversation = useCallback(
    (conversationId: string) => {
      if (role !== "STAFF" || !connected) return;
      socket.emit("claim_ticket", conversationId);
    },
    [role, connected]
  );

  return {
    conversations,
    messages,
    onlineUsers,
    connected,
    sendMessage,
    claimConversation,
  };
}
