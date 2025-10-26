import type { Row } from "@tanstack/react-table";
import { PackagePlus } from "lucide-react";
import ActionBtn from "@/components/table/ActionBtn";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import type { Part, Category } from "@/types/models/part";
import { toast } from "sonner";

export interface ColActionsProps {
  row: Row<Part>;
  currentPage: number;
  currentPageSize: number;
  categoryList: Category[];
}

export default function ColActions({ row }: ColActionsProps) {
  const part = row.original;

  // const [isProcessing, setIsProcessing] = useState(false);

  //chỉ hiển thị khi LOW STOCK
  const shouldShowRequestBtn = part.status === "OUT_OF_STOCK";

  if (!shouldShowRequestBtn) return null;

  return (
    <div className="flex gap-1">
      <TooltipWrapper content="Request admin to restock this item">
        <ActionBtn
          icon={<PackagePlus size={12} />}
          onClick={() => {
            toast.success("Request Success");
          }}
        />
      </TooltipWrapper>
    </div>
  );
}
