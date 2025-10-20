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
  }) => ["shiftsList", params] as const,

  workSchedulesList: (params: {
    page: number;
    pageSize: number;
    centerId?: string;
    employeeId?: string;
    shiftId?: string;
    dateFrom?: string;
    dateTo?: string;
    sortBy?: string;
    orderBy?: "asc" | "desc";
  }) => ["workSchedulesList", params] as const,
};
