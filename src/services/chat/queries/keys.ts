export const queryKeys = {
  messages: (conversationId: string) => ["shiftsList", conversationId] as const,

  conversations: ["conversations"],
}