import type { AccountWithProfile } from "@/types/models/account";

type Props = {
  status: AccountWithProfile["status"];
};

const getColor = (status: AccountWithProfile["status"]) => {
  switch (status) {
    case "VERIFIED":
      return {
        color: "var(--color-success)",
        text: "Verified",
        textColor: "black",
      };

    case "NOT_VERIFY":
      return {
        color: "var(--color-warning)",
        text: "Not Verified",
        textColor: "black",
      };
    case "DISABLED":
      return {
        color: "var(--color-disable)",
        text: "Disabled",
        textColor: "black",
      };
    case "BANNED":
      return {
        color: "var(--color-banned)",
        text: "Banned",
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

export default function AccountStatusTag({ status }: Props) {
  const { color, text, textColor } = getColor(status);

  return (
    <span
      className=" flex flex-row gap-2 items-center"
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
