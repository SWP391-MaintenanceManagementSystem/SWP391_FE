import { useState, useMemo, useEffect } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "@uidotdev/usehooks";
import type { EditWorkScheduleFormData } from "../../libs/schema";
import type { EmployeeTable } from "@/pages/employees/libs/table-types";
import type { UseFormReturn } from "react-hook-form";

interface EmployeeSelectorProps {
  form: UseFormReturn<EditWorkScheduleFormData>;
  employees: EmployeeTable[];
  disabled?: boolean;
}

export default function EmployeeSelector({
  form,
  employees,
  disabled,
}: EmployeeSelectorProps) {
  const employeeId = form.watch("employeeId");
  const initialEmployee = employees.find((e) => e.id === employeeId);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  // Display old employee if available
  useEffect(() => {
    if (initialEmployee) {
      setQuery(
        `${initialEmployee.profile?.firstName} ${initialEmployee.profile?.lastName} (${initialEmployee.email})`,
      );
    }
  }, [initialEmployee]);

  const filteredEmployees = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return [];
    return employees.filter((e) => {
      if (e.workCenter?.endDate !== null) return false;
      const firstName = e.profile?.firstName?.toLowerCase() ?? "";
      const lastName = e.profile?.lastName?.toLowerCase() ?? "";
      const email = e.email?.toLowerCase() ?? "";
      return firstName.includes(q) || lastName.includes(q) || email.includes(q);
    });
  }, [debouncedQuery, employees]);

  const handleSelect = (employee: EmployeeTable) => {
    form.setValue("employeeId", employee.id, { shouldDirty: true });
    setQuery(
      `${employee.profile?.firstName} ${employee.profile?.lastName} (${employee.email})`,
    );
    setOpen(false);
  };

  return (
    <FormField
      control={form.control}
      name="employeeId"
      render={() => (
        <FormItem>
          <FormLabel>Select Employee *</FormLabel>
          <div className="relative">
            <Input
              placeholder="Enter first name, last name, or email"
              value={query}
              disabled={disabled}
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
                        {employee.profile?.firstName}{" "}
                        {employee.profile?.lastName}
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
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
