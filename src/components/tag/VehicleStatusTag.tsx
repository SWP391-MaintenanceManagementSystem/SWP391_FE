import type { Vehicle } from "@/types/models/vehicle";

type Props = {
  status: Vehicle["status"];
};

const getColor = (status: Vehicle["status"]) => {
  switch (status) {
    case "ACTIVE":
      return {
        color: "var(--color-success)",
        text: "Active",
        textColor: "black",
      };

    case "INACTIVE":
      return {
        color: "var(--color-warning)",
        text: "Inactive",
        textColor: "black",
      };

    default:
      return {
        color: "gray",
        text: "Unknown",
        textColor: "black",
      };
  }
};

export default function VehicleStatusTag({ status }: Props) {
  const { color, text, textColor } = getColor(status);

  return (
    <span
      className=" flex flex-row gap-2 items-center dark:!text-white"
      style={{ color: textColor }}
    >
      <span
        className="h-3 w-3 border-gray-400 border-solid border-1 rounded-4xl"
        style={{ backgroundColor: color }}
      ></span>
      {text}
    </span>
  );
}
