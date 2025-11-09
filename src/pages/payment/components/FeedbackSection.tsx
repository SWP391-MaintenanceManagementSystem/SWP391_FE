import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; // nếu em có dùng sonner để hiển thị thông báo
import { useSubmitBookingFeedbackMutation } from "@/services/booking/mutations";

interface FeedbackSectionProps {
  bookingId: string;
}

export default function FeedbackSection({ bookingId }: FeedbackSectionProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();
  const { mutate: submitFeedback, isPending } = useSubmitBookingFeedbackMutation();

  const handleSubmit = () => {
    if (!rating) return toast.error("Please select a rating first!");

    submitFeedback(
      {
        bookingId,
        feedback: comment || "No feedback provided",
        rating,
      },
      {
        onSuccess: () => {
          toast.success("Thank you for your feedback!");
          setIsSubmitted(true);
        },
        onError: () => {
          toast.error("Failed to submit feedback, please try again.");
        },
      },
    );
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
      <p className="text-gray-700 dark:text-gray-200 font-medium">
        How was your booking experience?
      </p>

      {/* Star Rating */}
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-7 h-7 cursor-pointer transition-colors ${
              (hover ?? rating ?? 0) >= star
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
          />
        ))}
      </div>

      {rating && (
        <>
          {!isSubmitted ? (
            <>
              <textarea
                placeholder="Leave your feedback (optional)"
                className="w-full mt-3 p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm resize-none"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <Button
                className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white"
                size="lg"
                onClick={handleSubmit}
                disabled={isPending}
              >
                {isPending ? "Submitting..." : "Submit Feedback"}
              </Button>
            </>
          ) : (
            <Button
              className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white"
              size="lg"
              onClick={handleBack}
            >
              Back to Dashboard
            </Button>
          )}
        </>
      )}
    </div>
  );
}
