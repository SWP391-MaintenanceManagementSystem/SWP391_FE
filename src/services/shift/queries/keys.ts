export const queryKeys = {
  shiftsList: (params: {
    page: number;
    pageSize: number;
    name?: string;
    status?: string;
    startTime?: string;
    endTime?: string;
    centerId?: string;
    sortBy?: string;
    orderBy?: "asc" | "desc";
    type?: "CUSTOMER" | "STAFF" | "TECHNICIAN";
  }) => ["shiftsList", params] as const,
};
