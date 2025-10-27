export const queryKeys = {
  search: (name: string) => ["services", "search", name] as const,
};
