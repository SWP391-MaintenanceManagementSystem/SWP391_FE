import useMembership from "@/services/membership/hooks/useMembership"

export default function MyMembershipCard() {
  const { mySubscriptionData, isLoading } = useMembership()

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading subscription...</p>
      </div>
    )
  }

  if (!mySubscriptionData ) {
    return (
      <div className="flex justify-center">
        <p className="text-gray-500 dark:text-gray-400">No active membership</p>
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      <div className="w-full h-[200px] bg-gradient-to-r from-purple-300 to-pink-400 dark:from-purple-400 dark:to-pink-500 rounded-2xl shadow-xl p-6 flex flex-col justify-between relative">
        
        {/* Plan name */}
        <div className="flex justify-between items-start">
          <span className="text-white text-lg font-medium">
            {mySubscriptionData.membership.name}
          </span>
        </div>

        {/* Dates */}
        <div>
          <p className="text-white text-sm">
            Start date: {new Date(mySubscriptionData.startDate).toLocaleDateString()}
          </p>
          <p className="text-white text-sm">
            Expires: {new Date(mySubscriptionData.endDate).toLocaleDateString()}
          </p>
        </div>

        {/* Status */}
        <p
          className={`absolute bottom-3 right-4 text-sm font-semibold ${
            mySubscriptionData.status === "ACTIVE" ? "text-lime-600" : "text-red-500"
          }`}
        >
          {mySubscriptionData.status === "ACTIVE" ? "Active" : "Expired"}
        </p>
      </div>
    </div>
  )
}
