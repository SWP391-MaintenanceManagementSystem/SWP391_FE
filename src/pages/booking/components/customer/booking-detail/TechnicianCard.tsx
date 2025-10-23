import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IdCardLanyard, Plus, Wrench } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

interface TechnicianProps {
  technicians?: { firstName?: string; lastName?: string }[];
  onAssign?: () => void;
  disabled?: boolean;
}

export default function TechnicianCard({
  technicians,
  onAssign,
  disabled,
}: TechnicianProps) {
  const { auth } = useAuth();
  const role = auth?.user?.role;
  return (
    <Card className="hover:shadow-lg dark:hover:shadow-gray-700 transition-shadow duration-300 border border-gray-200 dark:border-[#262626] rounded-lg">
      <CardHeader className="flex flex-row items-center justify-between gap-2 p-4 bg-gradient-to-r from-purple-50 to-gray-50 dark:from-purple-800 dark:to-purple-500">
        <div className="flex flex-row items-center gap-2">
          <Wrench className="w-6 h-6 text-purple-500  dark:text-purple-100" />
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
            Technician Information
          </CardTitle>
        </div>
        {role === "STAFF" && (
          <Button
            size="sm"
            className="bg-purple-primary dark:bg-purple-primary-dark dark:text-amber-primary"
            onClick={onAssign}
            disabled={disabled}
          >
            <Plus />
            Assign
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-4 space-y-4 text-gray-700 dark:text-gray-200">
        {/* Technicians Grid */}
        <div className="space-y-2">
          {technicians?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-[auto_auto]  gap-4">
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
            <p className="text-gray-500 dark:text-gray italic">
              No technicians assigned
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
