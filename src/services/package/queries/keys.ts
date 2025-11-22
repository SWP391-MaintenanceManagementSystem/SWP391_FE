export const queryKeys = {
  search: (name: string) => ["packages", "search", name] as const,
};
