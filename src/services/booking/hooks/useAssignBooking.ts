import { useCreateBookingAssignmentMutation } from "../mutations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  BookingAssignmentSchema,
  type BookingAssignmentFormValues,
} from "@/pages/booking/lib/schema";
import { AxiosError } from "axios";

export const useAssignBooking = (options?: { onSuccess?: () => void }) => {
  const assignBookingMutation = useCreateBookingAssignmentMutation();

  const form = useForm<BookingAssignmentFormValues>({
    resolver: zodResolver(BookingAssignmentSchema),
    defaultValues: {
      bookingId: "",
      employeeIds: [],
    },
  });

  const onSubmit = async (data: BookingAssignmentFormValues) => {
    try {
      await assignBookingMutation.mutateAsync(
        { data: { ...data, bookingId: data.bookingId } },
        {
          onSuccess: () => {
            form.reset();
            options?.onSuccess?.();
          },
          onError: (error) => {
            if (error instanceof AxiosError) {
              const res = error.response?.data;
              const apiErrors = res?.errors;
              const msg = res?.message;
              if (
                apiErrors &&
                typeof apiErrors === "object" &&
                !Array.isArray(apiErrors)
              ) {
                Object.entries(apiErrors).forEach(([field, message]) => {
                  form.setError(field as keyof BookingAssignmentFormValues, {
                    type: "server",
                    message: message as string,
                  });
                });
              } else if (Array.isArray(apiErrors)) {
                const cacheItems = (form as any)._formValuesCacheItems || [];
                const emailsMap = new Map<string, string>();
                cacheItems.forEach((item: any) => {
                  emailsMap.set(item.id, item.email);
                });

                const mappedErrors = apiErrors.map((err: string) => {
                  const match = err.match(/accountId ([a-z0-9-]+)/i);
                  if (match) {
                    const email = emailsMap.get(match[1]);
                    if (email) {
                      return err.replace(match[0], `email ${email}`);
                    }
                  }
                  return err;
                });

                const joined = mappedErrors.join("\n");

                form.setError("employeeIds", {
                  type: "server",
                  message: joined,
                });

                toast.error(msg || "Some employees are unavailable");
              } else if (msg) {
                toast.error(msg);
              } else {
                toast.error("Something went wrong. Please try again.");
              }
            }
          },
        },
      );
    } catch (err) {
      console.error(err);
    }
  };

  const reset = () => form.reset();

  return {
    form,
    onSubmit,
    reset,
    isPending: assignBookingMutation.isPending,
    isSuccess: assignBookingMutation.isSuccess,
    isError: assignBookingMutation.isError,
  };
};
