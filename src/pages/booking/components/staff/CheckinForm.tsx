import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "lucide-react";
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

interface CheckinFormProps {
  form: ReturnType<typeof useForm<BookingCheckinsFormValues>>;
  onSubmit: (data: BookingCheckinsFormValues) => void;
  isPending: boolean;
  isLoading: boolean;
}

export default function CheckinForm({
  form,
  onSubmit,
  isPending,
  isLoading,
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
              className="w-full h-full"
            >
              <div className="grid gap-4 w-full">
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="odometer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Kilometers</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            value={field.value ?? ""}
                            min={0}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber)
                            }
                            placeholder="Enter current kilometers"
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
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Description (each line = one item)"
                            value={
                              Array.isArray(field.value)
                                ? field.value.join("\n")
                                : ""
                            }
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  .split("\n")
                                  .filter((line) => line.trim() !== ""),
                              )
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
                        <FormLabel>Note</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Note"
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-4 flex justify-start lg:justify-end">
                  <Button
                    type="submit"
                    className="!bg-purple-primary !text-white dark:!text-black cursor-pointer"
                    disabled={!form.formState.isDirty || isPending}
                  >
                    {isPending ? "Saving..." : "Save Check-in"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
