import {
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { ServiceCenter } from "@/types/models/center";

interface ServiceCenterSelectorProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  centers: ServiceCenter[];
  disabled?: boolean;
}

export default function ServiceCenterSelector<T extends FieldValues>({
  form,
  centers,
  disabled = false,
}: ServiceCenterSelectorProps<T>) {
  const centerIdError = form.formState.errors?.centerId;
  const centerIdValue = form.watch("centerId" as Path<T>);

  return (
    <div className="space-y-2 w-full">
      <Label className="text-sm font-medium flex items-center gap-2">
        Service Center
      </Label>
      <Select
        value={centerIdValue as string}
        onValueChange={(value) =>
          form.setValue("centerId" as Path<T>, value as T[Path<T>])
        }
        disabled={disabled}
      >
        <SelectTrigger
          className={cn(
            centerIdError && "border-red-500",
            "w-full max-w-[460px]",
          )}
        >
          <SelectValue placeholder="Select service center" />
        </SelectTrigger>
        <SelectContent>
          {centers.map((center) => (
            <SelectItem
              key={center.id}
              value={center.id}
              className="py-2 px-3 flex flex-col items-start leading-tight"
            >
              <span className="text-sm font-medium">{center.name}</span>
              <span className="text-xs text-gray-500 truncate ">
                {center.address}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {centerIdError && (
        <p className="text-xs text-destructive">
          {String(centerIdError.message || "")}
        </p>
      )}
    </div>
  );
}
