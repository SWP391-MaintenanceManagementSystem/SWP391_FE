import ProfileForm from "./ProfileForm";
import useChangeProfile from "@/services/profile/hooks/useChangeProfile";
import type { AccountWithProfile } from "@/types/models/account";
import { useChangePassword } from "@/services/auth/hooks/useChangePassword";
import ChangePasswordForm from "../ChangePasswordForm";


type DetailedSettingBoxProps = {
    user: AccountWithProfile | undefined;
}

const DetailSettingBox = ({ user }: DetailedSettingBoxProps) => {
    const { form, handleSubmit } = useChangeProfile(user);
    const { form: passwordForm, handleChangePassword } = useChangePassword();
    return (
        <div className="bg-slate-100 px-[42px] min-w-[200px] py-10 flex-1 rounded-[20px] shadow-md gap-3 flex flex-col min-h-fit">
            <h3 className="!font-inter font-bold text-3xl grid text-gray-text-header items-center">
                Detailed Settings
            </h3>
            <ProfileForm user={user} form={form} onSubmit={handleSubmit} />
            <ChangePasswordForm form={passwordForm} onSubmit={handleChangePassword} />
        </div>
    );
};

export default DetailSettingBox;