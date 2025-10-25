import { useState, useMemo } from "react";
import { useGetEmployeesQuery } from "@/services/shift/queries";

export function useTechnicianSearch({
  centerId,
  assignedIds = [],
}: {
  centerId: string;
  assignedIds?: string[];
}) {
  const { data: employeesList, isLoading } = useGetEmployeesQuery();
  const [keyword, setKeywordState] = useState("");
  const setKeyword = (val: string) => setKeywordState(val);

  const data = useMemo(() => {
    if (!employeesList) return undefined;
    return employeesList
      .filter((emp) => emp.role === "TECHNICIAN")
      .filter((emp) => emp.status === "VERIFIED")
      .filter(
        (emp) =>
          emp.workCenter?.id === centerId && emp.workCenter.endDate === null,
      )
      .filter((emp) => !assignedIds.includes(emp.id))
      .filter((emp) => emp.email.toLowerCase().includes(keyword.toLowerCase()))
      .map((emp) => ({ id: emp.id, email: emp.email }));
  }, [employeesList, keyword, centerId, assignedIds]);

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
