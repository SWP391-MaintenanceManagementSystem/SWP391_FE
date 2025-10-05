import { useState } from "react";
import MainContentLayout from "@/components/MainContentLayout";
import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MembershipOptions from "./MembershipOptions";

export default function Membership() {
  const [activeTab, setActiveTab] = useState<"options" | "my">("options");

  return (
    <div>
      <DynamicBreadcrumbs pathTitles={{ membership: "Membership" }} />
      <MainContentLayout className="flex flex-col">
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab("options")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors w-44 h-9  ${
              activeTab === "options"
                ? "bg-purple-primary text-white"
                : "text-gray-600 dark:text-gray-300 hover:text-purple-500"
            }`}
          >
            Available Plans
          </button>
          <button
            onClick={() => setActiveTab("my")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors w-44 h-9  ${
              activeTab === "my"
                ? "bg-purple-primary text-white"
                : "text-gray-600 dark:text-gray-300 hover:text-purple-500"
            }`}
          >
            My Membership
          </button>
        </div>

        {activeTab === "options" && <MembershipOptions />}
      </MainContentLayout>
    </div>
  );
}
