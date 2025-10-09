"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import dayjs from "dayjs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Clock, X } from "lucide-react";

type BookingFormValues = {
  vehicle: string;
  center: string;
  service: string[];
  package: string[];
  dateTime: Date;
};

// Mock data
const mockVehicles = [
  { plate: "51A-12345", vin: "VIN123", model: "Toyota Camry" },
  { plate: "52B-54321", vin: "VIN456", model: "Honda Civic" },
];
const mockServices = [
  { id: "1", name: "Oil Change" },
  { id: "2", name: "Brake Check" },
  { id: "3", name: "Tire Rotation" },
];
const mockPackages = [
  { id: "1", name: "Basic Package" },
  { id: "2", name: "Premium Package" },
  { id: "3", name: "VIP Package" },
];

const fetchCenters = async () => [
  { id: "1", name: "Center A" },
  { id: "2", name: "Center B" },
];

export default function BookingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [centers, setCenters] = useState<{ id: string; name: string }[]>([]);
  const [vehicleQuery, setVehicleQuery] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState(mockVehicles);

  const [serviceQuery, setServiceQuery] = useState("");
  const [filteredServices, setFilteredServices] = useState(mockServices);

  const [packageQuery, setPackageQuery] = useState("");
  const [filteredPackages, setFilteredPackages] = useState(mockPackages);

  const form = useForm<BookingFormValues>({
    defaultValues: {
      vehicle: "",
      center: "",
      service: [],
      package: [],
      dateTime: new Date(),
    },
  });

  useEffect(() => {
    fetchCenters().then(setCenters);
  }, []);

  useEffect(() => {
    setFilteredVehicles(
      mockVehicles.filter(
        (v) =>
          v.plate.includes(vehicleQuery) ||
          v.vin.includes(vehicleQuery) ||
          v.model.toLowerCase().includes(vehicleQuery.toLowerCase())
      )
    );
  }, [vehicleQuery]);

  useEffect(() => {
    setFilteredServices(
      mockServices.filter((s) =>
        s.name.toLowerCase().includes(serviceQuery.toLowerCase())
      )
    );
  }, [serviceQuery]);

  useEffect(() => {
    setFilteredPackages(
      mockPackages.filter((p) =>
        p.name.toLowerCase().includes(packageQuery.toLowerCase())
      )
    );
  }, [packageQuery]);

  const onSubmit = (data: BookingFormValues) => {
    console.log("Booking data:", data);
    onClose();
  };

  const addItem = (
    value: string,
    field: "service" | "package",
    setQuery: (v: string) => void
  ) => {
    const current = form.getValues(field);
    if (!current.includes(value)) form.setValue(field, [...current, value]);
    setQuery("");
  };

  const removeItem = (value: string, field: "service" | "package") => {
    const current = form.getValues(field);
    form.setValue(
      field,
      current.filter((v) => v !== value)
    );
  };

  const renderAutocompleteInput = (
    fieldName: "service" | "package",
    query: string,
    setQuery: (v: string) => void,
    filteredItems: { id: string; name: string }[],
    label: string
  ) => (
    <div className="w-full relative">
      <Label className="text-sm font-medium mb-1">{label}</Label>
      <div className="flex flex-wrap items-center gap-1 border rounded px-2 py-2 min-h-[44px] bg-white focus-within:ring-2 focus-within:ring-blue-500">
        {/* Tags */}
        {form.watch(fieldName).map((item) => (
          <span
            key={item}
            className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded flex items-center gap-1"
          >
            {item}
            <X
              className="w-3 h-3 cursor-pointer"
              onClick={() => removeItem(item, fieldName)}
            />
          </span>
        ))}
        {/* Input */}
        <input
          className="flex-1 text-sm outline-none py-1"
          placeholder={
            form.watch(fieldName).length === 0
              ? `Type to search ${label.toLowerCase()}`
              : ""
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {/* Dropdown */}
      {query && filteredItems.length > 0 && (
        <div className="absolute z-20 mt-1 w-full max-h-40 overflow-y-auto rounded border bg-white shadow-lg text-sm">
          {filteredItems.map((i) => (
            <div
              key={i.id}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => addItem(i.name, fieldName, setQuery)}
            >
              {i.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg w-full font-sans p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Book a Service
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-2 text-sm"
        >
          {/* Vehicle */}
          <div className="w-full relative">
            <Label className="text-sm font-medium mb-1">Vehicle</Label>
            <input
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Enter plate, VIN, or model"
              value={vehicleQuery}
              onChange={(e) => {
                setVehicleQuery(e.target.value);
                form.setValue("vehicle", e.target.value);
              }}
            />
            {vehicleQuery && filteredVehicles.length > 0 && (
              <div className="border rounded mt-1 max-h-32 overflow-y-auto absolute z-10 w-full bg-white shadow-md text-sm">
                {filteredVehicles.map((v) => (
                  <div
                    key={v.vin}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      form.setValue("vehicle", v.plate);
                      setVehicleQuery(v.plate);
                      setFilteredVehicles([]);
                    }}
                  >
                    {v.plate} - {v.model}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Center */}
          <div className="w-full">
            <Label className="text-sm font-medium mb-1">Service Center</Label>
            <select
              className="w-full border rounded px-3 py-2 text-sm"
              value={form.watch("center")}
              onChange={(e) => form.setValue("center", e.target.value)}
            >
              <option value="">Select center</option>
              {centers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* DateTime Picker */}
          {/* DateTime Picker */}
          <div className="flex gap-2">
            <Controller
              control={form.control}
              name="dateTime"
              render={({ field }) => {
                const [dateOpen, setDateOpen] = useState(false);
                const [timeOpen, setTimeOpen] = useState(false);
                const [timeValue, setTimeValue] = useState(
                  dayjs(field.value).format("HH:mm")
                );

                const updateDateTime = (date: Date, timeStr: string) => {
                  const [h, m] = timeStr.split(":").map(Number);
                  const newDate = dayjs(date).hour(h).minute(m).toDate();
                  field.onChange(newDate);
                };

                return (
                  <>
                    {/* Date Picker */}
                    <div className="flex-1 relative">
                      <button
                        type="button"
                        className="w-full border rounded flex items-center justify-between px-3 py-2 text-sm"
                        onClick={() => setDateOpen(!dateOpen)}
                      >
                        <span>{dayjs(field.value).format("DD/MM/YYYY")}</span>
                        <CalendarIcon className="w-4 h-4 text-gray-400" />
                      </button>
                      {dateOpen && (
                        <div className="absolute z-20 mt-1">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              updateDateTime(date!, timeValue);
                              setDateOpen(false);
                            }}
                            captionLayout="dropdown"
                          />
                        </div>
                      )}
                    </div>

                    {/* Time Picker */}
                    <div className="flex-1 relative">
                      <button
                        type="button"
                        className="w-full border rounded flex items-center justify-between px-3 py-2 text-sm"
                        onClick={() => setTimeOpen(!timeOpen)}
                      >
                        <span>{timeValue}</span>
                        <Clock className="w-4 h-4 text-gray-400" />
                      </button>
                      {timeOpen && (
                        <div className="absolute z-20 mt-1 w-32 border rounded bg-white shadow-lg p-2">
                          <input
                            type="time"
                            className="w-full text-sm"
                            value={timeValue}
                            onChange={(e) => {
                              setTimeValue(e.target.value);
                              updateDateTime(field.value, e.target.value);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </>
                );
              }}
            />
          </div>
          {/* Multi Service */}
          {renderAutocompleteInput(
            "service",
            serviceQuery,
            setServiceQuery,
            filteredServices,
            "Select service(s)"
          )}

          {/* Multi Package */}
          {renderAutocompleteInput(
            "package",
            packageQuery,
            setPackageQuery,
            filteredPackages,
            "Select package(s)"
          )}

          <DialogFooter>
            <Button type="submit" className="w-full py-2 text-sm">
              Book Now
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
