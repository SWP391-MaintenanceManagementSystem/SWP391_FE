import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";

interface CheckListModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CheckListModal({ open, onOpenChange }: CheckListModalProps) {
  const [tasks, setTasks] = useState([
    { id: 1, label: "Kiểm tra thiết bị điện", done: false },
    { id: 2, label: "Thay linh kiện hỏng", done: false },
    { id: 3, label: "Vệ sinh khu vực làm việc", done: false },
    { id: 4, label: "Hoàn tất báo cáo", done: false },
  ]);

  const handleToggle = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const completed = tasks.filter((t) => t.done).length;
  const progress = (completed / tasks.length) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Checklist công việc</DialogTitle>
          <DialogDescription>
            Đánh dấu các công việc bạn đã hoàn thành.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-500 mt-1">
            {completed} / {tasks.length} công việc hoàn thành
          </p>
        </div>

        <div className="mt-4 space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center space-x-3 border rounded-md p-2"
            >
              <Checkbox
                checked={task.done}
                onCheckedChange={() => handleToggle(task.id)}
              />
              <span
                className={`${
                  task.done ? "line-through text-gray-400" : "text-gray-800"
                }`}
              >
                {task.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Đóng
          </Button>
          <Button
            disabled={completed !== tasks.length}
            onClick={() => alert("Đã hoàn thành tất cả công việc! 🎉")}
          >
            Hoàn tất
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
