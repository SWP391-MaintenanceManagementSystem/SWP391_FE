import type { Row } from "@tanstack/react-table";
import type { CustomerTable } from "./columns";
import { Maximize2, Pencil, Trash } from "lucide-react";
import ActionBtn from "@/components/table/ActionBtn";

interface ColActionsProps {
  row: Row<CustomerTable>;
}

export default function ColActions({ row }: ColActionsProps) {
  return (
    <div className="flex gap-1">
      <ActionBtn
        icon={<Maximize2 size={12} />}
        onClick={() => console.log("View Detail")}
      />
      <ActionBtn
        icon={<Pencil size={12} />}
        onClick={() => console.log("Edit")}
      />
      <ActionBtn
        icon={<Trash size={12} />}
        onClick={() => console.log("Delete")}
      />
    </div>
  );
}
