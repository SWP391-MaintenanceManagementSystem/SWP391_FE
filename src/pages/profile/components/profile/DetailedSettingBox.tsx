import ProfileForm from "./ProfileForm";
import useChangeProfile from "@/services/profile/hooks/useChangeProfile";
import type { AccountWithProfile } from "@/types/models/account";
import { useChangePassword } from "@/services/auth/hooks/useChangePassword";
import ChangePasswordForm from "../ChangePasswordForm";
import { AccountRole } from "@/types/enums/role";
import { Card, CardContent } from "@/components/ui/card";

type DetailedSettingBoxProps = {
  user: AccountWithProfile | undefined;
};

const DetailSettingBox = ({ user }: DetailedSettingBoxProps) => {
  const { form, handleSubmit } = useChangeProfile(user);
  const { form: passwordForm, handleChangePassword } = useChangePassword();
  const isAdmin = user?.role === AccountRole.ADMIN;

  return (
    <Card className=" min-w-[300px]">
      <CardContent className=" font-inter px-[24px] pt-4 pb-5 flex-1 gap-5 flex flex-col min-h-fit">
        <h3 className="!font-inter font-bold text-3xl grid text-gray-text-header items-center">
          Detailed Settings
        </h3>
        {!isAdmin && (
          <ProfileForm user={user} form={form} onSubmit={handleSubmit} />
        )}
        <ChangePasswordForm
          form={passwordForm}
          onSubmit={handleChangePassword}
        />
      </CardContent>
    </Card>
  );
};

export default DetailSettingBox;
