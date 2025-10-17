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

  return (
    <div className="w-full bg-gray-50 flex items-center justify-center p-4 font-inter">
      <Card className="w-full max-w-xl mx-auto shadow-md border border-gray-200 bg-white">
        <CardContent className="p-8 text-center space-y-6 ">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-purple-200 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-purple-primary" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h1 className="text-purple-primary text-2xl font-semibold">
              Payment Successful!
            </h1>
            <p className="text-gray-600">
              Your payment has been processed successfully. You will receive a
              confirmation email shortly.
            </p>
          </div>

          {/* Transaction Details */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3 text-left border border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Amount</span>
              <span className="text-lg font-medium text-gray-800">
                ${transaction.amount.toFixed(2)}
              </span>
            </div>

            <Separator className="bg-gray-200" />

            <div className="flex justify-between items-center">
              <span className="text-gray-500">Transaction ID</span>
              <Badge
                variant="outline"
                className="text-xs bg-gray-100 text-gray-700 border border-gray-300"
              >
                {transaction.id}
              </Badge>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500">Status</span>
              <Badge
                className={`text-xs ${
                  transaction.status === "SUCCESS"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-yellow-50 text-yellow-700 border-yellow-200"
                }`}
              >
                {transaction.status}
              </Badge>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500">Payment Method</span>
              <span className="text-gray-700">{transaction.method}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500">Date</span>
              <span className="text-gray-700">
                {new Date(transaction.createdAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500">Reference Type</span>
              <span className="text-gray-700">{transaction.referenceType}</span>
            </div>
          </div>

          {/* Email Confirmation */}
          <div className="flex items-center justify-center gap-2 text-sm text-purple-600 bg-purple-50 p-3 rounded-lg border border-purple-100">
            <Mail className="w-4 h-4" />
            <span>Receipt sent to your registered email</span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              variant="outline"
              className="w-full  text-gray-700 "
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
          <p className="text-xs text-gray-500 pt-4">
            Need help? Contact our support team at{" "}
            <span className="text-purple-600">support@charged.com</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
