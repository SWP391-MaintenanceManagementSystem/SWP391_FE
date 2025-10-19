import { type UseFormReturn } from "react-hook-form";
import MultiSelector from "../MultiSelector";
import { type BookingFormValues } from "../../lib/schema";
import useSearchServices from "@/services/service/hooks/useSearchServices";

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
      useSearchHook={useSearchServices}
      placeholder="Type to search services... (or select packages below)"
      hint="Optional - select services OR packages"
    />
  );
}
