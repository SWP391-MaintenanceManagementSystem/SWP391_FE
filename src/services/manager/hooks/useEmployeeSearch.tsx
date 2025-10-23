import { useState, useMemo } from "react";
import { useGetEmployeesQuery } from "@/services/shift/queries";

export function useTechnicianSearch({ centerId }: { centerId: string }) {
  const { data: employeesList, isLoading } = useGetEmployeesQuery();
  const [keyword, setKeywordState] = useState("");
  const setKeyword = (val: string) => setKeywordState(val);

  const data = useMemo(() => {
    if (!employeesList) return undefined;
    return employeesList
      .filter((emp) => emp.role === "TECHNICIAN")
      .filter((emp) => emp.status === "VERIFIED")
      .filter((emp) => emp.workCenter?.id === centerId)
      .filter((emp) => emp.email.toLowerCase().includes(keyword.toLowerCase()))
      .map((emp) => ({ id: emp.id, email: emp.email }));
  }, [employeesList, keyword, centerId]);

  return { keyword, setKeyword, data, isLoading };
}
