import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react"; // Thêm icon từ lucide-react

interface CustomerInfoCardProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export default function CustomerInfoCard({
  firstName,
  lastName,
  email,
  phone,
}: CustomerInfoCardProps) {
  return (
    <Card className="hover:shadow-lg dark:hover:shadow-gray-700 transition-shadow duration-300 border border-gray-200 dark:border-[#262626] rounded-lg">
      <CardHeader className="flex flex-row items-center gap-2 p-4 bg-gradient-to-r from-purple-50 to-gray-50 dark:from-purple-800 dark:to-purple-500">
        <User className="w-6 h-6 text-purple-500 dark:text-white" />
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          Customer Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-4 text-gray-700 dark:text-gray-200">
        <p className="flex items-center gap-2">
          <span className="font-medium text-gray-600 dark:text-gray-200 w-20">Name:</span>
          <span className="text-gray-900 dark:text-gray-100">
            {`${firstName || ""} ${lastName || ""}`.trim() || "N/A"}
          </span>
        </p>
        <p className="flex items-center gap-2">
          <span className="font-medium text-gray-600 dark:text-gray-200 w-20">
            Email:
          </span>
          <span className=" font-medium text-gray-600 dark:text-gray-200 w-20">
            {email || "N/A"}
          </span>
        </p>
        <p className="flex items-center gap-2">
          <span className="font-medium text-gray-600 dark:text-gray-200 w-20">Phone:</span>
          <span className="text-gray-600 dark:text-gray-200">{phone || "N/A"}</span>
        </p>
      </CardContent>
    </Card>
  );
}
