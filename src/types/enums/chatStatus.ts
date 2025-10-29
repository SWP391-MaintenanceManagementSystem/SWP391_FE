export const ChatStatus = {
  OPEN: "OPEN",
  CLOSED: "CLOSED",
  PENDING: "PENDING",
} as const

export type ChatStatus = (typeof ChatStatus)[keyof typeof ChatStatus];
