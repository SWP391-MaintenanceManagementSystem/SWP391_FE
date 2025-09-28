import { CircleUserRound } from "lucide-react";
import Tag from "@/components/Tag";
import type { AccountWithProfile } from "@/types/models/account";


type AvatarBoxProps = {
     user: AccountWithProfile | undefined;
}
const AvatarBox = ({ user }: AvatarBoxProps) => {
    return (
        <div className="flex flex-col gap-2 justify-center items-center bg-slate-100 px-[56px] py-[34px] rounded-[20px] shadow-md">
            <CircleUserRound
                strokeWidth={1.4}
                size={160}
                className="  text-gray-primary"
            />
            <span>{user?.profile?.firstName + " " + user?.profile?.lastName}</span>
            {user && (
                <Tag
                    text={user.role}
                    bg="var(--color-purple-secondary)"
                    textColor="var(--color-brown-primary)"
                />
            )}
        </div>
    );
};

export default AvatarBox;