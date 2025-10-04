type MyMembershipProps = {
  planName: string;
  startDate: string;
  expiryDate: string;
  status: "active" | "expired";
};

export default function MyMembership({planName, startDate, expiryDate, status}: MyMembershipProps) {
  return (
    <div className="rounded-xl p-6 shadow-md bg-white dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-4">Your Membership</h2>

      <div className="border p-4 rounded-lg dark:border-gray-600">
        <p className="text-lg font-bold">{planName}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Start Date: {startDate}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          End Date: {expiryDate}
        </p>
        <p
          className={`mt-2 text-sm font-semibold ${
            status === "active" ? "text-green-600" : "text-red-500"
          }`}
        >
          Status: {status === "active" ? "Active" : "Expired"}
        </p>
      </div>

      <button className="mt-4 w-full py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition">
        {status === "active" ? "Renew" : "Buy Membership"}
      </button>
    </div>
  );
}
