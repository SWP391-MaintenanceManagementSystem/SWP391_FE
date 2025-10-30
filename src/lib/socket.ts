import { io } from "socket.io-client";
import { getAuthStorage } from "@/contexts/AuthContext";
const BASE_URL = import.meta.env.VITE_WEBSOCKET_URL ?? "http://localhost:3000";

// Get the token from localStorage
const getToken = () => {
    const auth = getAuthStorage()
    const token = auth.accessToken
    return token
};

export const socket = io(`${BASE_URL}/chat`, {
  transports: ["websocket"],
  auth: {
    token: getToken()
  },
  autoConnect: false, // Don't connect automatically, we'll connect when needed
  reconnection: true, // Enable auto-reconnection
  reconnectionAttempts: 5, // Try to reconnect 5 times
  reconnectionDelay: 1000, // Start with 1 second delay
  reconnectionDelayMax: 5000, // Maximum delay between reconnection attempts
});
