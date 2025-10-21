import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { useGetAccountList } from "@/services/manager/queries";
import "animate.css";
import { Loader } from "lucide-react";

export default function AddNewSchedulePage() {
  const [currentTab, setCurrentTab] = useState<"STAFF" | "TECHNICIAN">("STAFF");
  const [filterType, setFilterType] = useState<"STAFF" | "TECHNICIAN">("STAFF");

  useEffect(() => {
    setFilterType(currentTab);
  }, [currentTab]);

  const { data: employees, isLoading } = useGetAccountList({
    type: filterType,
    page: 1,
    pageSize: 100,
  });
  const verifiedEmployees = employees?.data?.filter(
    (e) => e.status === "VERIFIED",
  );

  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs
        pathTitles={{
          shifts: "Work Shifts Management",
          addNewSchedule: "Create New Schedule",
        }}
      />

      <MainContentLayout className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 pt-4 h-full">
        {/* LEFT SIDEBAR */}
        <Card className="w-[320px] h-[calc(100vh-100px)] flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl">Available Employees</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            <Tabs
              value={currentTab}
              onValueChange={(v) => setCurrentTab(v as "STAFF" | "TECHNICIAN")}
              className="flex flex-col h-full"
            >
              {/* Tabs header */}
              <div className="flex items-center justify-between p-4 pt-0 border-b">
                <TabsList className="w-full">
                  <TabsTrigger value="STAFF" className="flex-1">
                    Staff
                  </TabsTrigger>
                  <TabsTrigger value="TECHNICIAN" className="flex-1">
                    Technician
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Tab content area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {isLoading ? (
                  <Loader className="animate-spin text-gray-500 mx-auto" />
                ) : Array.isArray(verifiedEmployees) ? (
                  verifiedEmployees.map((employee) => (
                    <div
                      key={employee.id}
                      className="p-2 rounded-md hover:bg-accent/30"
                    >
                      {employee.profile?.firstName} {employee.profile?.lastName}
                    </div>
                  ))
                ) : (
                  <div>No {filterType.toLowerCase()}s found</div>
                )}
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* RIGHT CALENDAR */}
        <Card>
          <CardHeader>
            <CardTitle>SCHEDULER</CardTitle>
          </CardHeader>
        </Card>
      </MainContentLayout>
    </div>
  );
}
