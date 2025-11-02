import { useEffect, useState, useCallback } from "react";
import { socket } from "@/lib/socket";
import type { Message, Conversation } from "@/types/models/chat";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/services/chat/queries/keys";
export function useChat(userId: string, role: "CUSTOMER" | "STAFF") {
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [connected, setConnected] = useState(false);
  const queryClient = useQueryClient();

  // Connect socket + register user
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

    // Handle real-time message reception
    socket.on("message", (msg: Message) => {
      if (!msg.conversationId) return;
      console.log("[Socket] Message received:", msg);

      setMessages((prev) => {
        const list = prev[msg.conversationId] || [];
        const exists = list.some((m) => m.id === msg.id);
        if (exists) return prev;
        return { ...prev, [msg.conversationId]: [...list, msg] };
      });
    });

    //Confirmation for sent message
    socket.on("message_sent", (msg: Message) => {
      if (!msg.conversationId) return;
      console.log("[Socket] Message sent:", msg);

      setMessages((prev) => {
        const list = prev[msg.conversationId] || [];
        const exists = list.some((m) => m.id === msg.id);
        if (exists) return prev;
        return { ...prev, [msg.conversationId]: [...list, msg] };
      });
    });

    //Handle ticket claimed event (for STAFF)
    socket.on("ticket_claimed", (updatedConversation: Conversation) => {
      console.log("[Socket] Ticket claimed:", updatedConversation);
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === updatedConversation.id ? updatedConversation : conv
        )
      );
      queryClient.invalidateQueries({
        queryKey: queryKeys.conversations,
      });
    });

    //Handle ticket updated event (for both CUSTOMER and STAFF)
    socket.on("ticket_updated", (updatedConversation: Conversation) => {
      console.log("[Socket] Ticket updated:", updatedConversation);

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === updatedConversation.id ? updatedConversation : conv
        )
      );
      // queryClient.invalidateQueries({
      //   queryKey: queryKeys.conversations,
      // });
    });

    //Handle ticket closed event (for both CUSTOMER and STAFF)
    socket.on("ticket_closed", (closedConversation: Conversation) => {
      console.log("[Socket] Ticket closed:", closedConversation);

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === closedConversation.id ? closedConversation : conv
        )
      );
      queryClient.invalidateQueries({
        queryKey: queryKeys.conversations,
      });
    });

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [userId]);

  // Send message to server
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

  //Claim a ticket (for STAFF only)
  const claimTicket = useCallback(
    (conversationId: string) => {
      if (role === "STAFF") {
        console.log("[Socket] Claiming ticket:", conversationId);
        socket.emit("claim_ticket", conversationId);
      } else {
        toast.error("Not connected or wrong user role");
      }
    },
    [role, connected]
  );

  //Close a ticket (for STAFF only)
  const closeTicket = useCallback(
    (conversationId: string) => {
      if (role === "STAFF") {
        console.log("[Socket] Closing ticket:", conversationId);
        socket.emit("close_ticket", conversationId);
      } else {
        toast.error("Not connected or wrong user role");
      }
    },
    [role, connected]
  );

  //Get conversations (for both CUSTOMER and STAFF)
  const getConversations = useCallback(() => {
    socket.emit("get_conversations");
  }, []);

  //Get messages for a specific conversation
  const getMessages = useCallback((conversationId: string) => {
    socket.emit("get_messages", conversationId);
  }, []);

  return {
    conversations,
    messages,
    connected,
    sendMessage,
    claimTicket,
    closeTicket,
    getConversations,
    getMessages,
  };
}
