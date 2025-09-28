import type { Row } from "@tanstack/react-table";
import type { CustomerTable } from "./columns";
import type { ReactNode } from "react";
import { Maximize2, Pencil, Trash } from "lucide-react";

interface ColActionsProps {
  row: Row<CustomerTable>;
}
interface ActionsBtnProps {
  icon: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ActionBtn = ({ icon, onClick }: ActionsBtnProps) => {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded hover:bg-accent bg-white transition border-1 border-[#CED4DA] !outline-none "
    >
      {icon}
    </button>
  );
};

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
