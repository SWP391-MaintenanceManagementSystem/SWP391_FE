import { Textarea } from "@/components/ui/textarea";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

type NoteFieldProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
};

export default function NoteField<T extends FieldValues>({ form }: NoteFieldProps<T>) {
  return (
    <div className="max-w-md w-full">
      <label className="block mb-1 text-sm font-medium">Additional Notes</label>
      <Textarea
        {...form.register("note" as Path<T>)}
        placeholder="Enter any special instructions or requests..."
        className="w-full resize-none outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
}
