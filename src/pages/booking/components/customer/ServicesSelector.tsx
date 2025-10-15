import { type UseFormReturn } from "react-hook-form";
import MultiSelector from "../MultiSelector";
import { mockServices } from "./mockData";
import { type BookingFormValues } from "../../lib/schema";

export default function ServicesSelector({
  form,
}: {
  form: UseFormReturn<BookingFormValues>;
}) {
  return (
    <MultiSelector
      form={form}
      fieldName="service"
      label="Services"
      items={mockServices}
      placeholder="Type to search services... (or select packages below)"
      hint="Optional - select services OR packages"
    />
  );
}
