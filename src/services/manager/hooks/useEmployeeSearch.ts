import { useState, useMemo } from "react";
import { useGetEmployeesQuery } from "@/services/shift/queries";
import { useGetWorkSchedulesList } from "@/services/shift/queries";
import type { WorkSchedule } from "@/types/models/shift";

export function useTechnicianSearch({
  centerId,
  assignedIds = [],
  shiftId,
  bookingDate,
}: {
  centerId: string;
  assignedIds?: string[];
  shiftId?: string;
  bookingDate?: Date;
}) {
  const { data: employeesList, isLoading } = useGetEmployeesQuery();
  const { data: schedules } = useGetWorkSchedulesList({
    page: 1,
    pageSize: 500,
    centerId,
    shiftId,
    dateFrom: bookingDate?.toISOString(),
  });
  const [keyword, setKeywordState] = useState("");
  const setKeyword = (val: string) => setKeywordState(val.toLowerCase());
  const validIds = useMemo(() => {
    if (!schedules?.data) return [];
    return schedules.data.map((w: WorkSchedule) => w.account.id);
  }, [schedules]);
  const data = useMemo(() => {
    if (!employeesList) return undefined;
    return employeesList
      .filter((emp) => {
        return (
          emp.role === "TECHNICIAN" &&
          emp.status === "VERIFIED" &&
          emp.workCenter?.endDate === null &&
          validIds.includes(emp.id) &&
          !assignedIds.includes(emp.id) &&
          emp.email.toLowerCase().includes(keyword.toLowerCase())
        );
      })
      .map((emp) => ({ id: emp.id, email: emp.email }));
  }, [employeesList, keyword, assignedIds, validIds]);

  return { keyword, setKeyword, data, isLoading };
}

export function useEmployeesSearch({ centerId }: { centerId: string }) {
  const { data: employeesList, isLoading } = useGetEmployeesQuery();
  const [keyword, setKeywordState] = useState("");
  const setKeyword = (val: string) => setKeywordState(val);

  const data = useMemo(() => {
    if (!employeesList) return undefined;
    return employeesList
      .filter((emp) => emp.status === "VERIFIED")
      .filter(
        (emp) =>
          emp.workCenter?.id === centerId && emp.workCenter.endDate === null,
      )
      .filter((emp) => emp.email.toLowerCase().includes(keyword.toLowerCase()))
      .map((emp) => ({ id: emp.id, email: emp.email }));
  }, [employeesList, keyword, centerId]);

  return { keyword, setKeyword, data, isLoading };
}
