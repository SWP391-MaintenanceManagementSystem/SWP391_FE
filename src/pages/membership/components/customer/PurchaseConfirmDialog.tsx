import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart } from "lucide-react";

type PurchaseConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  plan: {
    name: string;
    price: number;
    duration: number;
    periodType?: string; 
    description?: string;
  };
};


function formatDuration(duration: number, periodType?: string) {
  const type = (periodType ?? "").toUpperCase();
  let unit = "days";

  switch (type) {
    case "DAY":
      unit = duration === 1 ? "day" : "days";
      break;
    case "MONTH":
      unit = duration === 1 ? "month" : "months";
      break;
    case "YEAR":
      unit = duration === 1 ? "year" : "years";
      break;
  }

  return `(${duration} ${unit})`;
}

export default function PurchaseConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  plan,
}: PurchaseConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay mờ */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative border border-gray-100 font-inter">
              
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
              >
                <X size={20} />
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gray-100 rounded-full">
                  <ShoppingCart size={28} className="text-gray-700" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
                Confirm Purchase
              </h2>

              {/* Content */}
              <p className="text-gray-600 text-center mb-5 leading-relaxed">
                Are you sure you want to buy the{" "}
                <strong>{plan.name}</strong> plan for{" "}
                <strong>${plan.price.toFixed(2)}</strong>{" "}
                {formatDuration(plan.duration, plan.periodType)}?
              </p>

              <div className="flex justify-center gap-3 mt-6">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="px-5 py-2.5 rounded-lg font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-sm"
                >
                  Confirm
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
