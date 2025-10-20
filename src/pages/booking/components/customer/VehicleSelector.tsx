import { useState, useMemo } from "react";
import { type UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { type CreateBookingFormValues } from "../../lib/schema";
import type { Vehicle } from "@/types/models/vehicle";
import { useDebounce } from "@uidotdev/usehooks";
interface VehicleSelectorProps {
  form: UseFormReturn<CreateBookingFormValues>;
  vehicles: Vehicle[];
}

export default function VehicleSelector({
  form,
  vehicles,
}: VehicleSelectorProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  const filteredVehicles = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return [];
    return vehicles.filter(
      (v) =>
        v.licensePlate.toLowerCase().includes(q) ||
        v.vin.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q)
    );
  }, [debouncedQuery, vehicles]);

  const handleSelect = (vehicle: Vehicle) => {
    form.setValue("vehicleId", vehicle.id);
    setQuery(vehicle.licensePlate);
    setOpen(false);
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium flex items-center gap-2">
        Select Vehicle
      </Label>

      <div className="relative">
        <Input
          placeholder="Enter plate number, VIN, or model"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
            if (!value) form.setValue("vehicleId", "");
            setOpen(true);
          }}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          className={cn(
            "pl-10 focus-visible:ring-0 focus-visible:ring-offset-0",
            form.formState.errors.vehicleId && "border-red-500"
          )}
        />

        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />

        {/* Dropdown results */}
        {open && query && (
          <div className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="p-3 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors border-b last:border-b-0"
                  onMouseDown={() => handleSelect(vehicle)}
                >
                  <div className="font-medium">{vehicle.licensePlate}</div>
                  <div className="text-sm text-muted-foreground">
                    {vehicle.model} • {vehicle.vin}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-3 text-sm text-muted-foreground">
                No vehicles found.
              </div>
            )}
          </div>
        )}
      </div>

      {form.formState.errors.vehicleId && (
        <p className="text-xs text-destructive">
          {form.formState.errors.vehicleId.message}
        </p>
      )}
    </div>
  );
}
