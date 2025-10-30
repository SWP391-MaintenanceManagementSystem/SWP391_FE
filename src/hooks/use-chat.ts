import { useEffect, useState, useCallback } from "react";
import { socket } from "@/lib/socket";
import type { Message, Conversation } from "@/types/models/chat";
import { toast } from "sonner";

export function useChat(userId: string, role: "CUSTOMER" | "STAFF") {
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [connected, setConnected] = useState(false);

  // ✅ Connect socket + register user
  useEffect(() => {
    if (!userId) return;

    socket.connect();

    socket.on("connect", () => {
      setConnected(true);
      console.log("[Socket] Connected:", socket.id);
      socket.emit("register", userId);
    });

    socket.on("disconnect", () => {
      setConnected(false);
      console.log("[Socket] Disconnected");
      toast.error("Disconnected from chat service");
    });

    socket.on("connect_error", (err) => {
      setConnected(false);
      console.error("[Socket] Connect error:", err);
      toast.error("Failed to connect to chat");
    });

    // 🧩 Handle real-time message reception
    socket.on("message", (msg: Message) => {
      if (!msg.conversationId) return;
      console.log("[Socket] Message received:", msg);

      setMessages((prev) => ({
        ...prev,
        [msg.conversationId]: [...(prev[msg.conversationId] || []), msg],
      }));
    });

    // ✅ Confirmation for sent message
    socket.on("message_sent", (msg: Message) => {
      if (!msg.conversationId) return;
      console.log("[Socket] Message sent:", msg);

      setMessages((prev) => ({
        ...prev,
        [msg.conversationId]: [...(prev[msg.conversationId] || []), msg],
      }));
    });

    // ✅ Handle ticket claimed event (for STAFF)
    socket.on("ticket_claimed", (updatedConversation: Conversation) => {
      console.log("[Socket] Ticket claimed:", updatedConversation);

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === updatedConversation.id ? updatedConversation : conv
        )
      );
    });

    // ✅ Handle ticket updated event (for both CUSTOMER and STAFF)
    socket.on("ticket_updated", (updatedConversation: Conversation) => {
      console.log("[Socket] Ticket updated:", updatedConversation);

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === updatedConversation.id ? updatedConversation : conv
        )
      );
    });

    // ✅ Handle ticket closed event (for both CUSTOMER and STAFF)
    socket.on("ticket_closed", (closedConversation: Conversation) => {
      console.log("[Socket] Ticket closed:", closedConversation);

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === closedConversation.id ? closedConversation : conv
        )
      );
    });

    return () => {
      socket.off("message");
      socket.off("message_sent");
      socket.off("ticket_claimed");
      socket.off("ticket_updated");
      socket.off("ticket_closed");
      socket.disconnect();
    };
  }, [userId]);

  // ✅ Send message to server
  const sendMessage = useCallback(
    (content: string, conversationId?: string) => {
      if (!connected) {
        toast.error("Not connected to chat");
        return;
      }

      socket.emit("message", {
        message: content,
        conversationId: conversationId || null,
      });
    },
    [connected]
  );

  // ✅ Claim a ticket (for STAFF only)
  const claimTicket = useCallback(
    (conversationId: string) => {
      if (role === "STAFF" && connected) {
        console.log("[Socket] Claiming ticket:", conversationId);
        socket.emit("claim_ticket", conversationId );
      } else {
        toast.error("Not connected or wrong user role");
      }
    },
    [role, connected]
  );

  // ✅ Close a ticket (for STAFF only)
  const closeTicket = useCallback(
    (conversationId: string) => {
      if (role === "STAFF" && connected) {
        console.log("[Socket] Closing ticket:", conversationId);
        socket.emit("close_ticket", { conversationId });
      } else {
        toast.error("Not connected or wrong user role");
      }
    },
    [role, connected]
  );

  // ✅ Get conversations (for both CUSTOMER and STAFF)
  const getConversations = useCallback(() => {
    socket.emit("get_conversations");
  }, []);

  // ✅ Get messages for a specific conversation
  const getMessages = useCallback((conversationId: string) => {
    socket.emit("get_messages", conversationId);
  }, []);

  return {
    conversations, // List of conversations (with updated statuses)
    messages, // Realtime messages only
    connected,
    sendMessage,
    claimTicket, // Expose claimTicket method
    closeTicket, // Expose closeTicket method
    getConversations,
    getMessages,
  };
}
