import { useState } from "react";
import MainContentLayout from "@/components/MainContentLayout";
import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MembershipOptions from "./MembershipOptions";

export default function Membership() {
  const [activeTab, setActiveTab] = useState<"options" | "my">("options");

  return (
    <div>
      <DynamicBreadcrumbs pathTitles={{ membership: "Membership" }} />
      <MainContentLayout>
        <div className="flex gap-3 border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab("options")}
            className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
              activeTab === "options"
                ? "bg-purple-500 text-white"
                : "text-gray-600 dark:text-gray-300 hover:text-purple-500"
            }`}
          >
            Membership Options
          </button>
          <button
            onClick={() => setActiveTab("my")}
            className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
              activeTab === "my"
                ? "bg-purple-500 text-white"
                : "text-gray-600 dark:text-gray-300 hover:text-purple-500"
            }`}
          >
            My Membership
          </button>
        </div>

        <div>{activeTab === "options" && <MembershipOptions />}</div>
      </MainContentLayout>
    </div>
  );
}
