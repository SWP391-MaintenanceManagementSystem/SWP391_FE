"use client";

import { useState, useEffect } from "react";
import { type UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Car } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockVehicles } from "./mockData";
import { type BookingFormValues } from "../../lib/schema";

interface VehicleSelectorProps {
  form: UseFormReturn<BookingFormValues>;
}

export default function VehicleSelector({ form }: VehicleSelectorProps) {
  const [vehicleQuery, setVehicleQuery] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState(mockVehicles);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const query = vehicleQuery.trim().toLowerCase();
    if (!query) {
      setFilteredVehicles([]);
      return;
    }
    const result = mockVehicles.filter(
      (v) =>
        v.plate.toLowerCase().includes(query) ||
        v.vin.toLowerCase().includes(query) ||
        v.model.toLowerCase().includes(query)
    );
    setFilteredVehicles(result);
  }, [vehicleQuery]);

  const handleSelect = (vehicle: (typeof mockVehicles)[0]) => {
    form.setValue("vehicle", vehicle.plate);
    setVehicleQuery(vehicle.plate);
    setOpen(false);
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium flex items-center gap-2">
        <Car className="w-4 h-4" />
        Select Vehicle
      </Label>

      <div className="relative">
        <Input
          placeholder="Enter plate number, VIN, or model"
          value={vehicleQuery}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setVehicleQuery(e.target.value);
            form.setValue("vehicle", e.target.value);
            setOpen(true);
          }}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          className={cn(
            "pl-10",
            form.formState.errors.vehicle && "border-red-500"
          )}
        />

        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />

        {open && vehicleQuery && filteredVehicles.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.vin}
                className="p-3 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors border-b last:border-b-0"
                onMouseDown={() => handleSelect(vehicle)} // dùng onMouseDown tránh blur mất trước khi click
              >
                <div className="font-medium">{vehicle.plate}</div>
                <div className="text-sm text-muted-foreground">
                  {vehicle.model} • {vehicle.vin}
                </div>
              </div>
            ))}
          </div>
        )}

        {open && vehicleQuery && filteredVehicles.length === 0 && (
          <div className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-sm p-3 text-sm text-muted-foreground">
            No vehicles found.
          </div>
        )}
      </div>

      {form.formState.errors.vehicle && (
        <p className="text-xs text-destructive">
          {form.formState.errors.vehicle.message}
        </p>
      )}
    </div>
  );
}
