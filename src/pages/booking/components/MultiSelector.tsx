import { useState, useMemo } from "react";
import { type UseFormReturn } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { type BookingFormValues } from "../lib/schema";
import { useDebounce } from "@uidotdev/usehooks";
interface MultiSelectorProps {
  form: UseFormReturn<BookingFormValues>;
  fieldName: "service" | "package";
  label: string;
  items: { id: string; name: string }[];
  placeholder: string;
  hint?: string;
}

export default function MultiSelector({
  form,
  fieldName,
  label,
  items,
  placeholder,
  hint,
}: MultiSelectorProps) {
  const [query, setQuery] = useState("");
  const currentIds = form.watch(fieldName) as string[];
  const debouncedQuery = useDebounce(query, 300);
  const filteredItems = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return [];
    return items.filter(
      (item) =>
        !currentIds.includes(item.id) && item.name.toLowerCase().includes(q)
    );
  }, [debouncedQuery, items, currentIds]);

  const addItem = (id: string) => {
    const current = form.getValues(fieldName) || [];
    if (!current.includes(id)) {
      form.setValue(fieldName, [...current, id]);
    }
    setQuery("");
  };

  const removeItem = (id: string) => {
    const current = form.getValues(fieldName) || [];
    form.setValue(
      fieldName,
      current.filter((v) => v !== id)
    );
  };

  const hasSelectionError =
    fieldName === "service"
      ? form.formState.errors.service?.message
      : form.formState.errors.package?.message;

  const idToName = useMemo(
    () =>
      items.reduce<Record<string, string>>((acc, item) => {
        acc[item.id] = item.name;
        return acc;
      }, {}),
    [items]
  );

  

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center gap-2">
        {label}
        {hint && (
          <span className="text-xs text-muted-foreground">({hint})</span>
        )}
      </label>

      <div className="relative">
        <div
          className={cn(
            "flex flex-wrap items-center gap-2 px-3 py-2 border rounded-md",
            hasSelectionError && "border-red-500"
          )}
        >
          {currentIds.map((id) => (
            <Badge
              key={id}
              variant={fieldName === "package" ? "outline" : "secondary"}
              className="flex items-center gap-1"
            >
              {idToName[id] || "Unknown"}
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
              hasSelectionError && "text-destructive"
            )}
            placeholder={currentIds.length === 0 ? placeholder : "Add more..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {query && filteredItems.length > 0 && (
          <div className="absolute z-50 w-full mt-2 bg-background border rounded-md shadow-lg max-h-48 overflow-auto">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-3 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                onMouseDown={() => addItem(item.id)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}

        {query && filteredItems.length === 0 && (
          <div className="absolute z-50 w-full mt-2 bg-background border rounded-md shadow p-3 text-sm text-muted-foreground">
            No items found.
          </div>
        )}
      </div>

      {form.formState.errors[fieldName] && (
        <p className="text-xs text-destructive">
          {form.formState.errors[fieldName]?.message}
        </p>
      )}
    </div>
  );
}
