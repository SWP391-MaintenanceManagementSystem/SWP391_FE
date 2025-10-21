import { useMemo, useState, useEffect } from "react";
import { type UseFormReturn } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { type CreateBookingFormValues } from "../lib/schema";

interface MultiSelectorProps<T> {
  form: UseFormReturn<CreateBookingFormValues>;
  fieldName: "serviceIds" | "packageIds";
  label: string;
  placeholder: string;
  hint?: string;
  useSearchHook: () => {
    keyword: string;
    setKeyword: (val: string) => void;
    data: T[] | undefined;
    isLoading: boolean;
  };
  onOpenDetailModal?: (item: T) => void;
}

export default function MultiSelector<T>({
  form,
  fieldName,
  label,
  placeholder,
  hint,
  useSearchHook,
  onOpenDetailModal,
}: MultiSelectorProps<T>) {
  const { setKeyword, data: items = [], isLoading } = useSearchHook();
  const [inputValue, setInputValue] = useState("");
  const [cacheItems, setCacheItems] = useState<T[]>([]);
  const currentIds = form.watch(fieldName) as string[];

  useEffect(() => {
    if (items.length > 0) {
      setCacheItems((prev) => {
        const map = new Map(prev.map((i: any) => [i.id, i]));
        items.forEach((i: any) => map.set(i.id, i));
        return Array.from(map.values());
      });
    }
  }, [items]);

  const addItem = (id: string) => {
    const current = form.getValues(fieldName) || [];
    if (!current.includes(id)) {
      form.setValue(fieldName, [...current, id]);
    }
    setKeyword("");
    setInputValue("");
  };

  const removeItem = (id: string) => {
    const current = form.getValues(fieldName) || [];
    form.setValue(
      fieldName,
      current.filter((v) => v !== id)
    );
  };

  const hasSelectionError = form.formState.errors[fieldName]?.message;

  const idToName = useMemo(
    () =>
      cacheItems.reduce<Record<string, string>>((acc: any, item: any) => {
        acc[item.id] = item.name;
        return acc;
      }, {}),
    [cacheItems]
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
              variant={fieldName === "packageIds" ? "outline" : "secondary"}
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
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setKeyword(e.target.value);
            }}
          />
        </div>

        {inputValue && (
          <div className="absolute z-50 w-full mt-2 bg-background border rounded-md shadow-lg max-h-48 overflow-auto">
            {isLoading ? (
              <div className="p-3 text-sm">Loading...</div>
            ) : items.length > 0 ? (
              items
                .filter((item: any) => !currentIds.includes(item.id))
                .map((item: any) => (
                  <div
                    key={item.id}
                    className="hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-between"
                  >
                    <div
                      className="flex-1 p-3 cursor-pointer"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addItem(item.id);
                      }}
                    >
                      {item.name}
                    </div>
                    <div className="p-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="px-2 py-1 h-auto hover:bg-primary/10"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onOpenDetailModal?.(item);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
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

      {hasSelectionError && (
        <p className="text-xs text-destructive">{hasSelectionError}</p>
      )}
    </div>
  );
}
