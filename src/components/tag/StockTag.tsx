import type { Part } from "@/types/models/part";
import { Badge } from "../ui/badge";

type Props = {
  status: Part["status"];
};

const getColor = (status: Part["status"]) => {
  if (status === "INSTOCK") {
    return {
      label: "Low Stock",
      variant: "destructive",
    };
  } else {
    return {
      label: "In Stock",
      variant: "default",
    };
  }
};

export default function StockStatusTag({ status }: Props) {
  const { label, variant } = getColor(status);

  return <Badge variant={variant}>{label}</Badge>;
}
