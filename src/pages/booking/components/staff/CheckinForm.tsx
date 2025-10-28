import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Loader } from "lucide-react";
import "animate.css";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { BookingCheckinsFormValues } from "../../lib/schema";
import { Textarea } from "@/components/ui/textarea";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import type { BookingStatus } from "@/types/enums/bookingStatus";

interface CheckinFormProps {
  form: ReturnType<typeof useForm<BookingCheckinsFormValues>>;
  onSubmit: (data: BookingCheckinsFormValues) => void;
  isPending: boolean;
  isLoading: boolean;
  bookingStatus?: BookingStatus;
}

export default function CheckinForm({
  form,
  onSubmit,
  isPending,
  isLoading,
  bookingStatus,
}: CheckinFormProps) {
  return (
    <Card className=" min-w-[300px] max-h-full">
      <CardContent className=" font-inter flex-1 gap-5 flex flex-col min-h-fit">
        <h3 className="!font-inter text-3xl font-bold text-gray-900 items-center">
          Vehicle Check-In Form
        </h3>
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader className="animate-spin text-gray-500 mx-auto" />
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-6"
            >
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="datetime-local"
                          required
                          value={
                            field.value
                              ? dayjs(field.value).format("YYYY-MM-DDTHH:mm")
                              : ""
                          }
                          min={dayjs().format("YYYY-MM-DDTHH:mm")}
                          className={cn("w-full h-10 pl-8")}
                          onChange={(e) => field.onChange(e.target.value)}
                          aria-invalid={!!form.formState.errors.date?.message}
                        />
                        <Calendar className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="odometer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Odometer *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter odometer value"
                        min="0"
                        required
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(Number(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Note</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Customer notes"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Condition Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter description (one per line)"
                        {...field}
                        value={
                          Array.isArray(field.value)
                            ? field.value.join("\n")
                            : (field.value ?? "")
                        }
                        onChange={(e) =>
                          field.onChange(e.target.value.split("\n"))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {bookingStatus === "ASSIGNED" && (
                <div className="mt-4 flex justify-start lg:justify-end">
                  <Button
                    type="submit"
                    disabled={!form.formState.isDirty || isPending}
                    className="!bg-purple-primary !text-white dark:!text-black cursor-pointer"
                  >
                    {isPending ? "Saving..." : "Save"}
                  </Button>
                </div>
              )}
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
