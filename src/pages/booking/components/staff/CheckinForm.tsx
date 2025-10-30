import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Loader, Unlink } from "lucide-react";
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
import { useRef } from "react";
import { FileUploadForm } from "@/pages/booking/components/staff/FileUploadForm";
import { Label } from "@/components/ui/label";
import { TooltipWrapper } from "@/components/TooltipWrapper";

interface CheckinFormProps {
  form: ReturnType<typeof useForm<BookingCheckinsFormValues>>;
  onSubmit: (data: BookingCheckinsFormValues) => void;
  isPending: boolean;
  isLoading: boolean;
  bookingStatus?: BookingStatus;
  images?: string[];
}

export default function CheckinForm({
  form,
  onSubmit,
  isPending,
  isLoading,
  bookingStatus,
  images,
}: CheckinFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Card className="min-w-[300px] max-h-full">
      <CardContent className="font-inter flex-1 gap-5 flex flex-col min-h-fit">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-200">
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
              className="grid grid-cols-1 gap-6 overflow-y-auto h-[calc(100vh - 80px)]"
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
                          ref={inputRef}
                          type="datetime-local"
                          required
                          value={
                            field.value
                              ? dayjs(field.value).format("YYYY-MM-DDTHH:mm")
                              : ""
                          }
                          min={dayjs().format("YYYY-MM-DDTHH:mm")}
                          className={cn("w-full h-10 pl-10")}
                          onChange={(e) => field.onChange(e.target.value)}
                          readOnly={bookingStatus !== "ASSIGNED"}
                        />
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
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
                    <FormLabel>Odometer (km) *</FormLabel>
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
                        readOnly={bookingStatus !== "ASSIGNED"}
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
                        placeholder={
                          bookingStatus === "ASSIGNED" ? "Customer notes" : ""
                        }
                        {...field}
                        value={field.value ?? ""}
                        readOnly={bookingStatus !== "ASSIGNED"}
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
                        placeholder={
                          bookingStatus === "ASSIGNED"
                            ? "Enter description (one per line)"
                            : ""
                        }
                        {...field}
                        value={
                          Array.isArray(field.value)
                            ? field.value.join("\n")
                            : (field.value ?? "")
                        }
                        onChange={(e) =>
                          field.onChange(e.target.value.split("\n"))
                        }
                        readOnly={bookingStatus !== "ASSIGNED"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {images && images.length > 0 ? (
                <div className="space-y-2">
                  <Label>Attachments</Label>

                  <div className="flex gap-6 flex-wrap">
                    {images.map((item, index) => (
                      <div
                        key={index}
                        className="relative w-24 h-24 border rounded overflow-hidden"
                      >
                        <TooltipWrapper content="View Image">
                          <a
                            href={item}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={item}
                              alt={`handover-${index}`}
                              className="object-cover w-full h-full"
                            />
                          </a>
                        </TooltipWrapper>
                      </div>
                    ))}
                  </div>
                </div>
              ) : bookingStatus === "ASSIGNED" ? (
                <FileUploadForm
                  form={form}
                  onUploadSuccess={(files) =>
                    form.setValue("images", files, { shouldDirty: true })
                  }
                />
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

              {bookingStatus === "ASSIGNED" && (
                <div className="mt-4 flex justify-end">
                  <Button
                    type="submit"
                    disabled={!form.formState.isDirty || isPending}
                    className="!bg-purple-primary !text-white"
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
