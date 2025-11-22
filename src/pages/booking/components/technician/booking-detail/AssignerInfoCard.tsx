import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IdCardLanyard, UserCheck } from "lucide-react";

interface AssignerInfoCardProps {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export default function AssignerInfoCard({
  firstName,
  lastName,
  email,
}: AssignerInfoCardProps) {
  return (
    <Card className="hover:shadow-lg p-0 dark:hover:shadow-gray-700 transition-shadow duration-300 border border-gray-200 dark:border-[#262626] rounded-lg">
      <CardHeader className="flex rounded-t-lg flex-row items-center gap-2 p-4 bg-gradient-to-r from-purple-50 to-gray-50 dark:from-purple-800 dark:to-purple-500">
        <UserCheck className="w-6 h-6 text-purple-500 dark:text-purple-100" />
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          Assigner Information
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 space-y-4 text-gray-700 dark:text-gray-200">
        <div className="space-y-2">
          <Card className="border dark:border-gray-600 transition-colors duration-200 rounded-lg p-2">
            <CardContent className="px-2 flex items-center gap-3 my-auto">
              <span className="font-medium text-purple-600 dark:text-purple-100">
                <IdCardLanyard />
              </span>

              <div className="flex flex-col justify-center">
                <span className="text-gray-900 dark:text-gray-200">
                  {`${firstName || ""} ${lastName || ""}`.trim() || "N/A"}
                </span>

                {email && (
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {email}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
