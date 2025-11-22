export const ConversationStatus = {
  OPEN: "OPEN",
  CLOSED: "CLOSED",
  PENDING: "PENDING",
} as const

export type ConversationStatus = (typeof ConversationStatus)[keyof typeof ConversationStatus];
