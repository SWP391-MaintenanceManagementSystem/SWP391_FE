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
import { CheckCircle, Circle } from "lucide-react";
import { toast } from "sonner";
import {
  useCompleteTechnicianBookingMutation,
  useStartTechnicianBookingMutation,
} from "@/services/booking/mutations";
import type { CustomerBookingDetails } from "@/types/models/booking-with-detail";
import BookingTag from "@/components/tag/BookingTag";
import { BookingStatus } from "@/types/enums/bookingStatus";
import { Textarea } from "@/components/ui/textarea";

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
  services?: { id: string; name: string; done?: boolean }[];
};

export default function CheckListModal({
  open,
  onOpenChange,
  bookingData,
}: CheckListModalProps) {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [note, setNote] = useState("");
  const [isDone, setIsDone] = useState(false);
  const isCheckInStatus = bookingData?.status === BookingStatus.CHECKED_IN;
  const canCheck = bookingData?.status === BookingStatus.IN_PROGRESS && !isDone;

  const { mutate: startBooking, isPending: startPending } =
    useStartTechnicianBookingMutation();

  const handleStart = () => {
    startBooking(bookingData?.id ?? "");
  };

  const handleOnSuccess = () => {
    setTasks((prev) =>
      prev.map((t) => ({
        ...t,
        done: true,
        services: t.services?.map((s) => ({ ...s, done: true })) || t.services,
      }))
    );
    setIsDone(true);
    localStorage.removeItem(`booking-progress-${bookingData?.id}`);
  };

  const { mutate: completeBooking, isPending } =
    useCompleteTechnicianBookingMutation(handleOnSuccess);

  useEffect(() => {
    if (!bookingData) return;
    const saved = localStorage.getItem(`booking-progress-${bookingData.id}`);
    if (saved) {
      const parsed = JSON.parse(saved) as { tasks: TaskItem[]; note: string };
      setTasks(parsed.tasks);
      setNote(parsed.note);
      setIsDone(parsed.tasks.every((t) => t.done));
      return;
    }

    const newTasks: TaskItem[] = [];

    bookingData.bookingDetails?.packages?.forEach((pkg) => {
      newTasks.push({
        id: pkg.id,
        label: pkg.name,
        done: pkg.status === "COMPLETED",
        type: "package",
        services:
          pkg.services?.map((s) => ({
            id: s.id,
            name: s.name,
            done: pkg.status === "COMPLETED",
          })) || [],
      });
    });

    bookingData.bookingDetails?.services?.forEach((srv) => {
      newTasks.push({
        id: srv.id,
        label: srv.name,
        done: srv.status === "COMPLETED",
        type: "service",
      });
    });

    setTasks(newTasks);
    const allDone = newTasks.length > 0 && newTasks.every((t) => t.done);
    setIsDone(allDone);
  }, [bookingData]);

  const handleToggle = (id: string, parentId?: string) => {
    if (!canCheck) return; // ❌ Nếu chưa Start hoặc đã xong → không cho tick

    setTasks((prev) =>
      prev.map((t) => {
        if (parentId && t.id === parentId && t.services) {
          const updatedServices = t.services.map((srv) =>
            srv.id === id ? { ...srv, done: !srv.done } : srv
          );
          const allDone = updatedServices.every((srv) => srv.done);
          return { ...t, services: updatedServices, done: allDone };
        }

        if (t.id === id && t.type === "package") {
          if (t.services && t.services.length) {
            const allDone = t.services.every((srv) => srv.done);
            if (allDone) {
              return { ...t, done: !t.done };
            }
          } else {
            return { ...t, done: !t.done };
          }
        }

        if (t.id === id && t.type === "service") {
          return { ...t, done: !t.done };
        }

        return t;
      })
    );
  };

  const completed = tasks.filter((t) => t.done).length;
  const progress = tasks.length > 0 ? (completed / tasks.length) * 100 : 0;

  const handleUpdate = () => {
    const data = {
      tasks,
      note,
      bookingId: bookingData?.id,
    };
    localStorage.setItem(
      `booking-progress-${bookingData?.id}`,
      JSON.stringify(data)
    );
    toast.success("Saved successfully");
  };

  const handleDone = () => {
    if (!bookingData?.id) return;

    const packageIds =
      bookingData.bookingDetails?.packages?.map((p) => p.bookingDetailId) ?? [];
    const serviceIds =
      bookingData.bookingDetails?.services?.map((s) => s.bookingDetailId) ?? [];
    const detailIds = [...packageIds, ...serviceIds];

    completeBooking({
      bookingId: bookingData.id,
      detailIds,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="font-inter max-w-md bg-white text-gray-900 border border-gray-300 rounded-2xl dark:bg-neutral-950 dark:text-white dark:border-purple-500/30">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold flex flex-col items-center gap-2">
            <div className="flex flex-col items-center gap-2">
              <span>Checklist</span>
              {isDone && <BookingTag status={"COMPLETED" as BookingStatus} />}
            </div>
          </DialogTitle>

          <DialogDescription className="text-gray-500 dark:text-gray-400 flex flex-col items-center">
            {bookingData ? `Booking ID: ${bookingData.id}` : ""}
          </DialogDescription>
        </DialogHeader>

        {/* Progress */}
        <div className="mt-3">
          <Progress
            value={progress}
            className="h-2 bg-gray-200 dark:bg-gray-700 [&>div]:bg-green-600"
            color="oklch(62.7% 0.194 149.214)"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {completed} / {tasks.length} tasks completed
          </p>
        </div>

        {/* Scrollable content (Note + Task list + Buttons) */}
        <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2 p-2">
          {/* Note */}
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
              Technician Note
            </p>
            <Textarea
              value={note}
              onChange={(e) => !isDone && setNote(e.target.value)}
              disabled={isDone || !canCheck}
              className={`w-full bg-gray-100 text-gray-800 text-sm p-2 rounded-md border ${
                isDone
                  ? "opacity-50 cursor-not-allowed"
                  : "border-gray-300 !outline-none focus:ring-0 focus:border-transparent"
              } dark:bg-neutral-900 dark:text-gray-200 dark:border-gray-700`}
              placeholder="Type your notes here..."
              rows={2}
            />
          </div>

          {/* Task list */}
          <div className="mt-5 space-y-2">
            <Accordion type="multiple">
              {tasks.map((task) => (
                <AccordionItem
                  key={task.id}
                  value={task.id}
                  className="rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-neutral-900 overflow-hidden"
                >
                  {/* Header */}
                  <div
                    className={`flex items-center justify-between px-4 py-3 min-h-[52px] transition-colors ${
                      isDone
                        ? "opacity-60"
                        : "hover:bg-gray-200 dark:hover:bg-neutral-800"
                    }`}
                  >
                    <div
                      onClick={() => canCheck && handleToggle(task.id)}
                      className={`flex items-center gap-2 ${
                        canCheck
                          ? "cursor-pointer"
                          : "cursor-not-allowed opacity-60"
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

                    {task.type === "package" && (
                      <AccordionTrigger
                        className="ml-auto w-auto p-0 h-[20px] [&>svg]:h-4 [&>svg]:w-4 
                           [&>svg]:text-gray-500 hover:[&>svg]:text-gray-900 
                           dark:[&>svg]:text-gray-400 dark:hover:[&>svg]:text-white"
                      />
                    )}
                  </div>

                  {/* service  */}
                  {task.type === "package" && (
                    <AccordionContent className="bg-white dark:bg-neutral-950 border-t border-gray-200 dark:border-gray-800 rounded-b-xl">
                      <ul className="ml-8 mt-2 mb-3 list-disc space-y-1 text-gray-600 dark:text-gray-400">
                        {task.services?.map((srv) => (
                          <li
                            key={srv.id}
                            onClick={() =>
                              canCheck && handleToggle(srv.id, task.id)
                            }
                            className={`flex items-center gap-2 ${
                              canCheck
                                ? "cursor-pointer"
                                : "cursor-not-allowed opacity-60"
                            } ${srv.done ? "line-through text-gray-400" : ""}`}
                          >
                            {srv.done ? (
                              <CheckCircle className="text-green-600 dark:text-green-500 h-4 w-4" />
                            ) : (
                              <Circle className="text-gray-400 dark:text-gray-500 h-4 w-4" />
                            )}
                            {srv.name}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end space-x-3 pb-3">
            {isCheckInStatus ? (
              <Button
                onClick={handleStart}
                disabled={startPending}
                className="bg-purple-primary hover:bg-purple-500 dark:bg-purple-light dark:hover:bg-purple-950 dark:text-amber-primary text-white"
              >
                Start
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleUpdate}
                  variant="outline"
                  disabled={isDone}
                  className="border-purple-500 text-purple-600 hover:bg-purple-50
          dark:border-purple-300 dark:text-purple-200 dark:hover:bg-purple-700/30"
                >
                  Save
                </Button>

                <Button
                  onClick={handleDone}
                  disabled={isDone || completed !== tasks.length || isPending}
                  className="bg-purple-primary hover:bg-purple-500 dark:bg-purple-light dark:hover:bg-purple-950 dark:text-amber-primary text-white"
                >
                  {isPending ? "Completing..." : "Done"}
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
