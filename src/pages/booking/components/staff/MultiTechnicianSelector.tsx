import { useMemo, useEffect, useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TriangleAlert, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BookingAssignmentFormValues } from "../../lib/schema";

interface MultiTechnicianSelectorProps<
  T extends { id: string; email: string },
> {
  form: UseFormReturn<BookingAssignmentFormValues>;
  fieldName: "employeeIds";
  label: string;
  placeholder: string;
  hint?: string;
  keyword: string;
  setKeyword: (val: string) => void;
  data: T[] | undefined;
  isLoading: boolean;
}

export default function MultiTechnicianSelector<
  T extends { id: string; email: string },
>({
  form,
  fieldName,
  label,
  placeholder,
  hint,
  keyword,
  setKeyword,
  data: items = [],
  isLoading,
}: MultiTechnicianSelectorProps<T>) {
  const [cacheItems, setCacheItems] = useState<T[]>([]);
  const currentIds = form.watch(fieldName) as string[];

  // Cache items for mapping ID to email
  useEffect(() => {
    if (items.length > 0) {
      setCacheItems((prev) => {
        const map = new Map(prev.map((i) => [i.id, i]));
        items.forEach((i) => map.set(i.id, i));
        return Array.from(map.values());
      });
    }
  }, [items]);

  useEffect(() => {
    (form as any)._formValuesCacheItems = cacheItems;
  }, [form, cacheItems]);

  const addItem = (id: string) => {
    const current = form.getValues(fieldName) || [];
    if (!current.includes(id)) form.setValue(fieldName, [...current, id]);
    setKeyword("");
  };

  const removeItem = (id: string) => {
    const current = form.getValues(fieldName) || [];
    form.setValue(
      fieldName,
      current.filter((v) => v !== id),
    );
  };

  const idToEmail = useMemo(
    () =>
      cacheItems.reduce(
        (acc: Record<string, string>, item: T) => {
          acc[item.id] = item.email;
          return acc;
        },
        {} as Record<string, string>,
      ),
    [cacheItems],
  );

  return (
    <div className="space-y-2 max-h-[320px] overflow-y-auto">
      <label
        className={cn(
          "text-sm font-medium flex items-center gap-2",
          form.formState.errors.employeeIds?.message
            ? "text-destructive"
            : "text-primary",
        )}
      >
        {label}{" "}
        {hint && (
          <span className="text-xs text-muted-foreground">({hint})</span>
        )}
      </label>
      <div className="relative ">
        <div
          className={cn(
            "flex flex-wrap items-center gap-2 px-3 py-2 border rounded-md",
            form.formState.errors.employeeIds?.message
              ? "border-destructive focus:ring-destructive"
              : "border-input focus:ring-primary",
          )}
        >
          {currentIds.map((id) => (
            <Badge
              key={id}
              variant="outline"
              className="flex items-center gap-1"
            >
              {idToEmail[id] || "Unknown"}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => removeItem(id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}

          <Input
            className={cn(
              "flex-1 bg-transparent border-none !ring-0 focus-visible:ring-0",
              form.formState.errors.employeeIds?.message
                ? "border-destructive focus:ring-destructive"
                : "border-input focus:ring-primary",
            )}
            placeholder={currentIds.length === 0 ? placeholder : "Add more..."}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            aria-invalid={!!form.formState.errors.employeeIds}
          />
        </div>

        {keyword && (
          <div className="absolute z-50 w-full mt-2 bg-background border rounded-md shadow-lg max-h-48 overflow-auto">
            {isLoading ? (
              <div className="p-3 text-sm">Loading...</div>
            ) : items.length > 0 ? (
              items
                .filter((i) => !currentIds.includes(i.id))
                .map((item) => (
                  <div
                    key={item.id}
                    className="hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-between"
                  >
                    <div
                      className="flex-1 p-3 cursor-pointer"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        addItem(item.id);
                      }}
                    >
                      {item.email}
                    </div>
                  </div>
                ))
            ) : (
              <div className="p-3 text-sm text-muted-foreground">
                No items found.
              </div>
            )}
          </div>
        )}
      </div>

      {form.formState.errors.employeeIds && (
        <div className="mt-3 rounded-md bg-red-50 p-3 border border-red-200">
          <p className="text-sm font-semibold text-red-600 mb-1 flex items-center gap-2 text-center">
            <TriangleAlert size={16} />
            Please review the following issues:
          </p>
          <div className="space-y-2">
            {form.formState.errors.employeeIds.message
              ?.split("\n")
              .map((msg, i) => {
                return (
                  <div key={i} className="text-sm text-red-700">
                    <span className="font-medium">{msg}</span>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
