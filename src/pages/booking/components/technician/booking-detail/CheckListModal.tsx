import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { CheckCircle, Circle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useCompleteTechnicianBookingMutation } from "@/services/booking/mutations";
import type { CustomerBookingDetails } from "@/types/models/booking-with-detail";

interface CheckListModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingData?: CustomerBookingDetails;
}

type TaskItem = {
  id: string;
  label: string;
  done: boolean;
  type: "package" | "service";
  services?: { id: string; name: string }[];
};

export default function CheckListModal({
  open,
  onOpenChange,
  bookingData,
}: CheckListModalProps) {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [note, setNote] = useState("");
  const [isDone, setIsDone] = useState(false);

  const { mutate: completeBooking, isPending } =
    useCompleteTechnicianBookingMutation();

  useEffect(() => {
    if (!bookingData) return;

    const newTasks: TaskItem[] = [];

    bookingData.bookingDetails?.packages?.forEach((pkg) => {
      newTasks.push({
        id: pkg.id,
        label: pkg.name,
        done: false,
        type: "package",
        services: pkg.services || [],
      });
    });

    bookingData.bookingDetails?.services?.forEach((srv) => {
      newTasks.push({
        id: srv.id,
        label: srv.name,
        done: false,
        type: "service",
      });
    });

    setTasks(newTasks);
    setIsDone(bookingData.status === "COMPLETED");
  }, [bookingData]);

  const handleToggle = (id: string) => {
    if (isDone) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const completed = tasks.filter((t) => t.done).length;
  const progress = tasks.length > 0 ? (completed / tasks.length) * 100 : 0;

  const handleUpdate = () => {
    toast.info("Progress saved locally (demo)");
  };

  const handleDone = () => {
    if (!bookingData?.id) return;
    completeBooking(bookingData.id, {
      onSuccess: () => {
        setIsDone(true);
      },
      onError: (err) => {
        toast.error(err?.message || "Failed to complete booking");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className=" font-inter max-w-md bg-white text-gray-900 border border-gray-300 rounded-2xl 
                   dark:bg-neutral-950 dark:text-white dark:border-purple-500/30"
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold flex flex-col items-center gap-2">
            Checklist
            {isDone && (
              <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                (Completed)
              </span>
            )}
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            {bookingData
              ? `Booking ID: ${bookingData.id}`
              : " "}
          </DialogDescription>
        </DialogHeader>

        {/* Progress bar */}
        <div className="mt-3">
          <Progress
            value={progress}
            className="h-2 bg-gray-200 dark:bg-gray-700"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {completed} / {tasks.length} tasks completed
          </p>
        </div>

        {/* Note */}
        <div className="mt-4">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
            Technician Note
          </p>
          <textarea
            value={note}
            onChange={(e) => !isDone && setNote(e.target.value)}
            disabled={isDone}
            className={`w-full bg-gray-100 text-gray-800 text-sm p-2 rounded-md border ${
              isDone
                ? "opacity-50 cursor-not-allowed"
                : "border-gray-300 focus:ring-2 focus:ring-purple-500"
            } dark:bg-neutral-900 dark:text-gray-200 dark:border-gray-700`}
            placeholder="Type your notes here..."
            rows={2}
          />
        </div>

        {/* Task list */}
        <div className="mt-5 space-y-3">
          {tasks.map((task) =>
            task.type === "package" ? (
              <Accordion type="single" collapsible key={task.id}>
                <AccordionItem
                  value={task.id}
                  className="border border-gray-300 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3 p-2 bg-gray-100 dark:bg-neutral-900 rounded-t-lg">
                    <div
                      onClick={() => handleToggle(task.id)}
                      className={`flex items-center gap-2 ${
                        isDone
                          ? "cursor-not-allowed opacity-60"
                          : "cursor-pointer"
                      }`}
                    >
                      {task.done ? (
                        <CheckCircle className="text-green-600 dark:text-green-500 h-5 w-5" />
                      ) : (
                        <Circle className="text-gray-400 dark:text-gray-500 h-5 w-5" />
                      )}
                      <span
                        className={`font-medium ${
                          task.done
                            ? "line-through text-gray-400"
                            : "text-gray-800 dark:text-gray-100"
                        }`}
                      >
                        {task.label}
                      </span>
                    </div>
                    <AccordionTrigger className="ml-auto text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" />
                  </div>
                  <AccordionContent className="bg-white border-t border-gray-200 dark:bg-neutral-950 dark:border-gray-800">
                    <ul className="ml-8 mt-2 list-disc space-y-1 text-gray-600 dark:text-gray-400">
                      {task.services?.map((srv) => (
                        <li key={srv.id}>{srv.name}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <div
                key={task.id}
                className={`flex items-center gap-2 bg-gray-100 p-2 rounded-lg border border-gray-300 
                  dark:bg-neutral-900 dark:border-gray-700 ${
                    isDone ? "opacity-60" : ""
                  }`}
              >
                <div
                  onClick={() => handleToggle(task.id)}
                  className={isDone ? "cursor-not-allowed" : "cursor-pointer"}
                >
                  {task.done ? (
                    <CheckCircle className="text-green-600 dark:text-green-500 h-5 w-5" />
                  ) : (
                    <AlertCircle className="text-red-500 h-5 w-5" />
                  )}
                </div>
                <span
                  className={`text-sm ${
                    task.done
                      ? "line-through text-gray-400"
                      : "text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {task.label}
                </span>
              </div>
            )
          )}
        </div>

        {/* Done message */}
        {isDone && (
          <div className="mt-4 text-green-600 dark:text-green-400 text-sm font-medium text-center">
            Checklist completed — editing is locked.
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          <Button
            onClick={handleUpdate}
            disabled={isDone}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Update
          </Button>
          <Button
            onClick={handleDone}
            disabled={isDone || completed !== tasks.length || isPending}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isPending ? "Completing..." : "Done"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
