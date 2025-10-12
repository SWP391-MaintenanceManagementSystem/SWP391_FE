import type { Part } from "@/types/models/part";
import { Badge } from "../ui/badge";

type Props = {
  status: Part["status"];
};

type BadgeVariant = "default" | "destructive" | "outline" | "secondary";

const getColor = (
  status: Part["status"],
): {
  label: string;
  variant: BadgeVariant;
} => {
  if (status === "OUT_OF_STOCK") {
    return {
      label: "Low Stock",
      variant: "destructive",
    };
  } else if (status === "AVAILABLE") {
    return {
      label: "In Stock",
      variant: "default",
    };
  } else {
    return {
      label: "Discontinue",
      variant: "secondary",
    };
  }
};

export default function StockStatusTag({ status }: Props) {
  const { label, variant } = getColor(status);
  return <Badge variant={variant}>{label}</Badge>;
}
