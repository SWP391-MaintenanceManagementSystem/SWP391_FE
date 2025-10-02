import { CircleUserRound } from "lucide-react";
import Tag from "@/components/tag/Tag";
import type { AccountWithProfile } from "@/types/models/account";
import { AccountRole } from "@/types/enums/role";

type AvatarBoxProps = {
  user: AccountWithProfile | undefined;
};
const AvatarBox = ({ user }: AvatarBoxProps) => {
  const isAdmin = user?.role === AccountRole.ADMIN;
  return (
    <div className="flex flex-col gap-2 justify-center items-center bg-slate-100 px-[56px] py-[34px] rounded-[20px] shadow-md">
      <CircleUserRound
        strokeWidth={1.4}
        size={160}
        className=" text-gray-primary"
      />
      {!isAdmin && (
        <span>{user?.profile?.firstName + " " + user?.profile?.lastName}</span>
      )}
      {user && <Tag text={user.role} />}
    </div>
  );
};

export default AvatarBox;
