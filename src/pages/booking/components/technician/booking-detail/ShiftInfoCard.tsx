import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock4 } from "lucide-react";
import dayjs from "dayjs";

export type ShiftInfo = {
  id: string;
  name: string;
  startTime: Date;
  endTime: Date;
};

interface ShiftInfoCardProps {
  shift?: ShiftInfo;
}

export default function ShiftInfoCard({ shift }: ShiftInfoCardProps) {
  return (
    <Card className="hover:shadow-lg p-0 dark:hover:shadow-gray-700 transition-shadow duration-300 border border-gray-200 dark:border-[#262626] rounded-lg">
      <CardHeader className="flex rounded-t-lg flex-row items-center  gap-2 p-4 bg-gradient-to-r from-purple-50 to-gray-50 dark:from-purple-800 dark:to-purple-500">
        <Clock4 className="w-6 h-6 text-purple-500 dark:text-purple-100" />
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          {shift?.name || "Unnamed Shift"}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 flex flex-col gap-4">
        <CardDescription className="flex flex-col gap-2 text-gray-700 dark:text-gray-200">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-600 w-28 dark:text-gray-200">
              Start Time:
            </span>
            <span className="text-gray-900 dark:text-gray-200">
              {shift?.startTime
                ? dayjs.utc(shift.startTime).format("HH:mm")
                : "N/A"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-600 w-28 dark:text-gray-200">
              End Time:
            </span>
            <span className="text-gray-900 dark:text-gray-200">
              {shift?.endTime
                ? dayjs.utc(shift.endTime).format("HH:mm")
                : "N/A"}
            </span>
          </div>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
