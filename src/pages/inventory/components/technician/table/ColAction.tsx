import { useState } from "react";
import type { Row } from "@tanstack/react-table";
import { PackagePlus } from "lucide-react";
import ActionBtn from "@/components/table/ActionBtn";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Part, Category } from "@/types/models/part";
import { useRequestRefillPart } from "@/services/manager/mutations";

export interface ColActionsProps {
  row: Row<Part>;
  currentPage: number;
  currentPageSize: number;
  categoryList: Category[];
}

export default function ColActions({ row }: ColActionsProps) {
  const part = row.original;

  // chỉ hiển thị khi LOW STOCK
  const shouldShowRequestBtn = part.status === "OUT_OF_STOCK";

  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(0);

  const { mutateAsync: requestRefillPart, isPending } = useRequestRefillPart();

  if (!shouldShowRequestBtn) return null;

  const handleSendRequest = async () => {
    if (amount <= 0) {
      toast.error("Please enter a valid refill amount");
      return;
    }
    try {
      await requestRefillPart({ id: part.id, refillAmount: amount });
      toast.success("Refill request sent successfully");
      setIsOpen(false);
      setAmount(0);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to send refill request");
      } else {
        toast.error(String(error) || "Failed to send refill request");
      }
    }
  };

  return (
    <>
      <div className="flex gap-1">
        <TooltipWrapper content="Request admin to restock this item">
          <ActionBtn
            icon={<PackagePlus size={12} />}
            onClick={() => setIsOpen(true)}
          />
        </TooltipWrapper>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[400px] font-inter">
          <DialogHeader>
            <DialogTitle>Request Refill</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-2 mt-2">
            <span>Part: {part.name}</span>
            <Input
              type="number"
              value={amount}
              min={1}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter refill amount"
            />
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="destructive" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendRequest} disabled={isPending}>
              {isPending ? "Sending..." : "Send Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
