import { useState, useEffect } from "react";
import { type UseFormReturn } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { type BookingFormValues } from "../lib/schema";

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
  const [filteredItems, setFilteredItems] = useState(items);
  const currentItems = form.watch(fieldName) as string[];

  useEffect(() => {
    if (!query.trim()) {
      setFilteredItems([]);
      return;
    }
    const filtered = items.filter(
      (item) =>
        !currentItems.includes(item.name) &&
        item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [query, currentItems, items]);

  const addItem = (value: string) => {
    const current = form.getValues(fieldName);
    if (!current.includes(value)) {
      form.setValue(fieldName, [...current, value]);
    }
    setQuery("");
  };

  const removeItem = (value: string) => {
    const current = form.getValues(fieldName);
    form.setValue(
      fieldName,
      current.filter((v) => v !== value)
    );
  };

  const hasSelectionError =
    fieldName === "service"
      ? form.formState.errors.service?.message
      : form.formState.errors.package?.message;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center gap-2">
        {label}
        {hint && (
          <span className="text-xs text-muted-foreground">({hint})</span>
        )}
      </label>
      <div className="relative">
        <div className="flex flex-wrap items-center gap-2 p-3 border rounded-md min-h-[44px]">
          {currentItems.map((item) => (
            <Badge
              key={item}
              variant={fieldName === "package" ? "outline" : "secondary"}
              className="flex items-center gap-1"
            >
              {item}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => removeItem(item)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          <Input
            className={cn(
              "flex-1 bg-transparent border-none !ring-0",
              hasSelectionError && "text-destructive"
            )}
            placeholder={
              currentItems.length === 0 ? placeholder : "Add more..."
            }
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
                onClick={() => addItem(item.name)}
              >
                {item.name}
              </div>
            ))}
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
