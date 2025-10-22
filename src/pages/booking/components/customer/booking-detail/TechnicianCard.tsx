import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IdCardLanyard, Wrench } from "lucide-react";

interface TechnicianProps {
  technicians?: { firstName?: string; lastName?: string }[];
}

export default function TechnicianCard({ technicians }: TechnicianProps) {
  return (
    <Card className="hover:shadow-lg dark:hover:shadow-gray-700 transition-shadow duration-300 border border-gray-200 dark:border-[#262626] rounded-lg">
      <CardHeader className="flex flex-row items-center gap-2 p-4 bg-gradient-to-r from-purple-50 to-gray-50 dark:from-purple-800 dark:to-purple-500">
        <Wrench className="w-6 h-6 text-purple-500" />
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          Technician Information
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4 text-gray-700 dark:text-gray-200">
        {/* Technicians Grid */}
        <div className="space-y-2">
          {technicians?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {technicians.map((tech, index) => (
                <Card
                  key={index}
                  className="border border-gray-100 transition-colors duration-200 rounded-lg p-2"
                >
                  <CardContent className="p-2 flex items-center gap-2">
                    <span className="font-medium text-purple-600 dark:text-purple-100">
                      <IdCardLanyard />
                    </span>
                    <span className="text-gray-900 dark:text-gray-200">
                      {`${tech.firstName || ""} ${
                        tech.lastName || ""
                      }`.trim() || "N/A"}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray italic">No technicians assigned</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
