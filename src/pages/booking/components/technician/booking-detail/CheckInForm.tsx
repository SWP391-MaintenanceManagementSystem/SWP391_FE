import { Calendar, Unlink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import dayjs from "dayjs";
import { Label } from "@/components/ui/label";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import type { VehicleHandover } from "@/types/models/vehicle-handover";

interface CheckinFormProps {
  handover: VehicleHandover;
}

export default function CheckInForm({ handover }: CheckinFormProps) {
  const { date, odometer, note, description, images } = handover;

  return (
    <div className="flex flex-col gap-5 h-full font-inter">
      {/* Scrollable content only */}
      <div className="grid grid-cols-1 gap-6 overflow-y-auto max-h-[70vh] pr-2">
        {/* Date */}
        <div>
          <Label>Date</Label>
          <div className="relative">
            <Input
              type="datetime-local"
              value={date ? dayjs(date).format("YYYY-MM-DDTHH:mm") : ""}
              disabled
              className="w-full h-10 pl-10"
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        {/* Odometer */}
        <div>
          <Label>Odometer (km)</Label>
          <Input value={odometer ?? ""} disabled />
        </div>

        {/* Customer Note */}
        <div>
          <Label>Customer Note</Label>
          <Textarea value={note ?? ""} disabled />
        </div>

        {/* Vehicle Condition */}
        <div>
          <Label>Vehicle Condition Details</Label>
          <Textarea
            value={
              Array.isArray(description)
                ? description.join("\n")
                : description ?? ""
            }
            disabled
          />
        </div>

        {/* Images */}
        {images && images.length > 0 ? (
          <div className="space-y-2">
            <Label>Attachments</Label>
            <div className="flex flex-wrap gap-4">
              {images.map((item, index) => (
                <TooltipWrapper key={index} content="View Image">
                  <a
                    href={item}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-24 h-24 border rounded overflow-hidden"
                  >
                    <img src={item} className="object-cover w-full h-full" />
                  </a>
                </TooltipWrapper>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Label>Attachments</Label>
            <div className="flex items-center justify-center w-full h-24 border border-dashed rounded">
              <p className="text-gray-400 flex gap-2 items-center">
                <Unlink size={18} /> No attachments
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
