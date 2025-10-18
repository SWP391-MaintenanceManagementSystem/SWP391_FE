import { type UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { type BookingFormValues } from "../../lib/schema";

interface ServiceCenterSelectorProps {
  form: UseFormReturn<BookingFormValues>;
  centers: { id: string; name: string }[];
}

export default function ServiceCenterSelector({
  form,
  centers,
}: ServiceCenterSelectorProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium flex items-center gap-2">
        <MapPin className="w-4 h-4" />
        Service Center
      </Label>
      <Select
        value={form.watch("centerId")}
        onValueChange={(value) => form.setValue("centerId", value)}
      >
        <SelectTrigger
          className={cn(form.formState.errors.centerId && "border-red-500")}
        >
          <SelectValue placeholder="Select service center" />
        </SelectTrigger>
        <SelectContent>
          {centers.map((center) => (
            <SelectItem key={center.id} value={center.id}>
              {center.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {form.formState.errors.centerId && (
        <p className="text-xs text-destructive">
          {form.formState.errors.centerId.message}
        </p>
      )}
    </div>
  );
}
