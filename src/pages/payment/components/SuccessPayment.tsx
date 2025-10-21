import { CheckCircle2, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "react-router-dom";
import { usePaymentTransaction } from "@/services/payment/hooks/usePaymentTransaction";

export default function SuccessPayment() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id") ?? "";
  const { data, isLoading, isError } = usePaymentTransaction(sessionId);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Verifying your payment...</p>
      </div>
    );

  if (isError || !data?.data?.data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500">Payment verification failed.</p>
      </div>
    );

  const transaction = data.data.data;

  // const isBooking = transaction.referenceType === "BOOKING";
  

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 font-inter bg-gray-50 dark:bg-gray-900 transition-colors">
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors">

        <CardContent className="p-8 text-center space-y-6 bg-white dark:bg-gray-800 rounded-2xl">
  {/* Success Icon */}
  <div className="flex justify-center">
    <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
      <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
    </div>
  </div>

  {/* Success Message */}
  <div className="space-y-2">
    <h1 className="text-green-600 dark:text-green-400 text-2xl font-semibold">
      Payment Successful!
    </h1>
    <p className="text-gray-600 dark:text-gray-300">
      Your payment has been processed successfully. You will receive a
      confirmation email shortly.
    </p>
  </div>

  {/* Transaction Details */}
  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3 text-left border border-gray-200 dark:border-gray-700">
    <div className="flex justify-between items-center">
      <span className="text-gray-500 dark:text-gray-400">Amount</span>
      <span className="text-lg font-medium text-gray-800 dark:text-gray-100">
        ${transaction.amount.toFixed(2)}
      </span>
    </div>

    <Separator className="bg-gray-200 dark:bg-gray-700" />

    <div className="flex justify-between items-center">
      <span className="text-gray-500 dark:text-gray-400">Transaction ID</span>
      <Badge
        variant="outline"
        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600"
      >
        {transaction.id}
      </Badge>
    </div>

    <div className="flex justify-between items-center">
      <span className="text-gray-500 dark:text-gray-400">Status</span>
      <Badge
        className={`text-xs ${
          transaction.status === "SUCCESS"
            ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
            : "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800"
        }`}
      >
        {transaction.status}
      </Badge>
    </div>

    <div className="flex justify-between items-center">
      <span className="text-gray-500 dark:text-gray-400">Payment Method</span>
      <span className="text-gray-700 dark:text-gray-200">
        {transaction.method}
      </span>
    </div>

    <div className="flex justify-between items-center">
      <span className="text-gray-500 dark:text-gray-400">Date</span>
      <span className="text-gray-700 dark:text-gray-200">
        {new Date(transaction.createdAt).toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </span>
    </div>

    <div className="flex justify-between items-center">
      <span className="text-gray-500 dark:text-gray-400">Reference Type</span>
      <span className="text-gray-700 dark:text-gray-200">
        {transaction.referenceType}
      </span>
    </div>
  </div>

  {/* Email Confirmation */}
  <div className="flex items-center justify-center gap-2 text-sm text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800">
    <Mail className="w-4 h-4" />
    <span>Receipt sent to your registered email</span>
  </div>

  {/* Action Buttons */}
  <div className="space-y-3 pt-4">
    <Button
      variant="outline"
      className="w-full text-gray-700 dark:text-gray-200 dark:border-gray-600"
      size="lg"
      asChild
    >
      <a href="/">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </a>
    </Button>
  </div>

  {/* Support Info */}
  <p className="text-xs text-gray-500 dark:text-gray-400 pt-4">
    Need help? Contact our support team at{" "}
    <span className="text-green-600 dark:text-green-400">
      support@charged.com
    </span>
  </p>
</CardContent>

      </Card>
    </div>
  );
}
