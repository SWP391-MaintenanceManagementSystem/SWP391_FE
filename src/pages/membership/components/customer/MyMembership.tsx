import { useSubscription } from "@/services/membership/hooks/useMembership";


export default function MyMembership() {
  const { data, isLoading } = useSubscription()

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading subscription...</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex justify-center">
        <p className="text-gray-500 dark:text-gray-400">No active membership</p>
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      <div className="w-[450px] h-[300px] bg-gradient-to-r from-purple-300 to-pink-400 dark:from-purple-400 dark:to-pink-500 rounded-2xl shadow-xl p-6 flex flex-col justify-between relative">
        
        {/* Plan name */}
        <div className="flex justify-between items-start">
          <span className="text-white text-lg font-medium">
            {data.membership.name}
          </span>
        </div>

        {/* Dates */}
        <div>
          <p className="text-white text-sm">
            Start date: {new Date(data.startDate).toLocaleDateString()}
          </p>
          <p className="text-white text-sm">
            Expires: {new Date(data.endDate).toLocaleDateString()}
          </p>
        </div>

        {/* Status */}
        <p
          className={`absolute bottom-3 right-4 text-sm font-semibold ${
            data.status === "ACTIVE" ? "text-lime-600" : "text-red-500"
          }`}
        >
          {data.status === "ACTIVE" ? "Active" : "Expired"}
        </p>
      </div>
    </div>
  )
}
