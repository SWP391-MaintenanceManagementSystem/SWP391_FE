import { Card, CardContent } from "@/components/ui/card";
import AllMembershipCard from "./AllMembershipCard";
import type { Subscription } from "@/types/models/subscription";

interface AllMembershipListProps {
  subscriptions: Subscription[];
}

export default function AllMembershipList({ subscriptions }: AllMembershipListProps) {
  if (!subscriptions || subscriptions.length === 0) {
    return (
      <Card className="text-center py-10">
        <CardContent>
          <p className="text-muted-foreground">You don’t have any memberships yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {subscriptions.map((subscription) => (
        <AllMembershipCard key={subscription.id} subscription={subscription} />
      ))}
    </div>
  );
}
