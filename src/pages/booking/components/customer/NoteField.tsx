import { Textarea } from "@/components/ui/textarea";
import type { CreateBookingFormValues } from "../../lib/schema";
import type { UseFormReturn } from "react-hook-form";

type NoteFieldProps = {
  form: UseFormReturn<CreateBookingFormValues>;
};

export default function NoteField({ form }: NoteFieldProps) {
  return (
    <div className="max-w-md w-full">
      <label className="block mb-1 text-sm font-medium">Additional Notes</label>
      <Textarea
        {...form.register("note")}
        placeholder="Enter any special instructions or requests..."
        className="w-full resize-none outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
}
