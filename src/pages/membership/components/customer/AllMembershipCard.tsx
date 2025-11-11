import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, Goal } from "lucide-react";
import { format } from "date-fns";
import type { Subscription } from "@/types/models/subscription";
import { useState } from "react";
import MembershipInfoModal from "./MembershipInfoModal";

export default function AllMembershipCard({
  subscription,
}: {
  subscription: Subscription;
}) {
  const [openModal, setOpenModal] = useState(false);

  const membership = subscription.membership;
  if (!membership) return null;

  const getStatusBadgeStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border border-green-300 dark:bg-green-900/40 dark:text-green-200 dark:border-green-700/50";
      case "inactive":
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  return (
    <>
      <Card className="w-full px-5 shadow-md border border-gray-200 dark:border-dark-sidebar rounded-lg font-inter">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2 items-center">
            <Goal className="w-6 h-6 text-gray-500" />
            <h2 className="text-md font-semibold">{membership.name}</h2>
          </div>
          <Badge
            className={`px-3 py-1 rounded-full text-[10px] ${getStatusBadgeStyle(
              subscription.status
            )}`}
          >
            {subscription.status}
          </Badge>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <div>
            <p className="text-gray-500 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400" /> Start Date
            </p>
            <p className="font-semibold">
              {format(subscription.startDate, "MMM dd, yyyy")}
            </p>
          </div>

          <div>
            <p className="text-gray-500 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400" /> End Date
            </p>
            <p className="font-semibold">
              {format(subscription.endDate, "MMM dd, yyyy")}
            </p>
          </div>

          <div>
            <p className="text-gray-500 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-gray-400" /> Price
            </p>
            <p className="font-semibold">
              ${membership.price.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            variant="outline"
            className="flex-1 flex items-center justify-center gap-2 py-2 border-purple-500 text-purple-600 hover:bg-purple-50 dark:border-purple-300 dark:text-purple-200 dark:hover:bg-purple-700/30"
            onClick={() => setOpenModal(true)}
          >
            View Details
          </Button>
        </div>
      </Card>

      {/* Membership Info Modal */}
      <MembershipInfoModal
        open={openModal}
        onOpenChange={setOpenModal}
        membership={membership}
      />
    </>
  );
}
