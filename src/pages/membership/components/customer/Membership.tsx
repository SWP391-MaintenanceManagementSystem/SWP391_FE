import { useState } from "react";
import MainContentLayout from "@/components/MainContentLayout";
import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MembershipOptions from "./MembershipOptions";
import AllMembershipList from "./AllMembershipList";
import clsx from "clsx";
import { useGetMySubscriptions } from "@/services/membership/queries";

export default function Membership() {
  const { data: subscriptions = [], isLoading } = useGetMySubscriptions();
  const [activeTab, setActiveTab] = useState<"options" | "my">("options");

  return (
    <div className="w-full h-[calc(100vh-32px)]">
      <DynamicBreadcrumbs pathTitles={{ membership: "Memberships" }} />
      <MainContentLayout className={clsx("flex flex-col", activeTab === "my" && "items-start")}>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab("options")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors w-44 h-9 ${
              activeTab === "options"
                ? "bg-purple-primary text-white dark:text-amber-primary"
                : "text-gray-600 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-200"
            }`}
          >
            Available Plans
          </button>
          <button
            onClick={() => setActiveTab("my")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors w-44 h-9 ${
              activeTab === "my"
                ? "bg-purple-primary text-white dark:text-amber-primary"
                : "text-gray-600 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-200"
            }`}
          >
            My Memberships
          </button>
        </div>

        {/* Tab content */}
        {activeTab === "options" && <MembershipOptions />}
        {activeTab === "my" && (
          <>
            {isLoading ? (
              <p>Loading your memberships...</p>
            ) : (
              <AllMembershipList subscriptions={subscriptions} />
            )}
          </>
        )}
      </MainContentLayout>
    </div>
  );
}
