import { type UseFormReturn } from "react-hook-form";
import MultiSelector from "../MultiSelector";
import { mockPackages } from "./mockData";
import { type BookingFormValues } from "../../lib/schema";

export default function PackagesSelector({
  form,
}: {
  form: UseFormReturn<BookingFormValues>;
}) {
  return (
    <MultiSelector
      form={form}
      fieldName="package"
      label="Packages"
      items={mockPackages}
      placeholder="Type to search packages... (or select services above)"
      hint="Optional - select services OR packages"
    />
  );
}
