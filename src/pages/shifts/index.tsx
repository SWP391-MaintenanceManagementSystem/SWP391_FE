import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import ShiftsManagementPage from "./components/shifts/ShiftManagement";
import WorkScheduleList from "./components/schedules/WorkScheduleList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function WorkShiftsManagementPage() {
  const [currentTab, setCurrentTab] = useState("workSchedule");

  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs
        pathTitles={{
          shifts: "Work Shift Management",
        }}
      />

      <MainContentLayout className="pt-4 grid grid-cols-1">
        <Tabs
          value={currentTab}
          onValueChange={setCurrentTab}
          className="w-full h-full"
        >
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="workSchedule">Work Schedule</TabsTrigger>
              <TabsTrigger value="shiftManagement">
                Shift Management
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="workSchedule">
            <WorkScheduleList />
          </TabsContent>
          <TabsContent value="shiftManagement">
            <ShiftsManagementPage />
          </TabsContent>
        </Tabs>
      </MainContentLayout>
    </div>
  );
}
