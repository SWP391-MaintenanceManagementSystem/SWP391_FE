import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

interface StaffCardProps {
  staff?: { firstName?: string; lastName?: string; email?: string };
}

export default function StaffCard({ staff }: StaffCardProps) {
  return (
    <Card className="hover:shadow-lg dark:hover:shadow-gray-700 transition-shadow duration-300 border border-gray-200 dark:border-[#262626] rounded-lg">
      <CardHeader className="flex flex-row items-center gap-2 p-4 bg-gradient-to-r from-purple-50 to-gray-50 dark:from-purple-800 dark:to-purple-500">
        <Users className="w-6 h-6 text-purple-500 dark:text-purple-100" />
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          Staff Information
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-6 text-gray-700 dark:text-gray-200">
        {/* Staff Section */}
        <div className="">
          <p className="flex items-center gap-2">
            <span className="font-medium text-gray-600 dark:text-gray-200 w-20">
              Name:
            </span>
            <span className="text-gray-900 dark:text-gray-200">
              {`${staff?.firstName || ""} ${staff?.lastName || ""}`.trim() ||
                "N/A"}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <span className="font-medium text-gray-600 dark:text-gray-200 w-20">
              Email:
            </span>
            <span className="font-medium text-gray-600 dark:text-gray-200 w-20">
              {staff?.email || "N/A"}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
