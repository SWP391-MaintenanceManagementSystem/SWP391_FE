import { CircleUserRound } from "lucide-react";
import type { AccountWithProfile } from "@/types/models/account";
import { AccountRole } from "@/types/enums/role";
import Tag from "@/components/tag/Tag";
import { Card, CardContent } from "@/components/ui/card";

type AvatarBoxProps = {
  user: AccountWithProfile | undefined;
};
const AvatarBox = ({ user }: AvatarBoxProps) => {
  const isAdmin = user?.role === AccountRole.ADMIN;
  return (
    <Card>
      <CardContent className="flex font-inter flex-col gap-2 justify-center items-center">
        <CircleUserRound
          strokeWidth={1.4}
          size={160}
          className=" text-gray-primary"
        />
        {!isAdmin && (
          <span>
            {user?.profile?.firstName + " " + user?.profile?.lastName}
          </span>
        )}
        {user && <Tag text={user.role} />}
      </CardContent>
    </Card>
  );
};

export default AvatarBox;
