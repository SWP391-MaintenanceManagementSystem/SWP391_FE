export const queryKeys = {
  customers: (page: number, pageSize: number) =>
    ["customers", { page, pageSize }] as const,

  customer: ["customer"],
};
