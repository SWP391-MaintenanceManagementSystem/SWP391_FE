import { useState, useMemo } from "react";
import { type UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WorkScheduleFormData } from "../../libs/schema";
import type { EmployeeTable } from "@/pages/employees/libs/table-types";
import { useDebounce } from "@uidotdev/usehooks";

interface EmployeeSelectorProps {
  form: UseFormReturn<WorkScheduleFormData>;
  employees: EmployeeTable[];
}

export default function EmployeeSelector({
  form,
  employees,
}: EmployeeSelectorProps) {
  const employeeIdFromForm = form.getValues("employeeId");
  const initialEmployee = employees.find((e) => e.id === employeeIdFromForm);
  const [query, setQuery] = useState(initialEmployee?.email || "");
  const [open, setOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  const filteredEmployees = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return [];
    return employees.filter(
      (e) =>
        e.profile?.firstName.toLowerCase().includes(q) ||
        e.profile?.lastName.toLowerCase().includes(q) ||
        e.email?.toLowerCase().includes(q),
    );
  }, [debouncedQuery, employees]);

  const handleSelect = (employee: EmployeeTable) => {
    form.setValue("employeeId", employee.id, { shouldDirty: true });
    setQuery(`${employee.profile?.firstName}`);
    setOpen(false);
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium flex items-center gap-2">
        Select Employee *
      </Label>

      <div className="relative">
        <Input
          placeholder="Enter first name, last name, or email"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
            if (!value) form.setValue("employeeId", "");
            setOpen(true);
          }}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          className={cn(
            "pl-10 focus-visible:ring-0 focus-visible:ring-offset-0",
            form.formState.errors.employeeId && "border-red-500",
          )}
        />

        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />

        {open && query && (
          <div className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <div
                  key={employee.id}
                  className="p-3 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors border-b last:border-b-0"
                  onMouseDown={() => handleSelect(employee)}
                >
                  <div className="font-medium">
                    {employee.profile?.firstName} {employee.profile?.lastName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {employee.email}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-3 text-sm text-muted-foreground">
                No employees found.
              </div>
            )}
          </div>
        )}
      </div>

      {form.formState.errors.employeeId && (
        <p className="text-xs text-destructive">
          {form.formState.errors.employeeId.message}
        </p>
      )}
    </div>
  );
}
