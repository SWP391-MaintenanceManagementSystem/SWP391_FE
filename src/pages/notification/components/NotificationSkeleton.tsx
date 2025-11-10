import { Skeleton } from "@/components/ui/skeleton";

export default function NotificationSkeleton() {
  const skeletonList = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="w-full h-screen font-inter">
      <div className="mt-4 grid grid-rows-[auto_auto_1fr] h-full overflow-visible pb-0 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 gap-3">
          <Skeleton className="w-8 h-8 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-48 rounded" />
            <Skeleton className="h-4 w-64 rounded" />
          </div>
          <Skeleton className="h-8 w-32 rounded" />
        </div>

        {/* Search bar */}
        <div className="mb-6">
          <Skeleton className="h-10 w-full rounded" />
        </div>

        <div>
          {/* Tabs */}
          <div className="flex min-h-5 gap-4 mb-6">
            <Skeleton className="h-8 w-24 rounded" />
            <Skeleton className="h-8 w-24 rounded" />
            <Skeleton className="h-8 w-24 rounded" />
            <Skeleton className="h-8 w-32 rounded ml-auto" />
          </div>

          {/* List items */}
          <div className="space-y-4">
            {skeletonList.map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
