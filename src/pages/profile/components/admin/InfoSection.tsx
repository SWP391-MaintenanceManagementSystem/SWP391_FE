import { NavLink } from "react-router-dom";
import { CircleUserRound, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import type { AccountWithProfile } from "@/types/models/account";
import { Button } from "@/components/ui/button";
import AccountStatusTag from "@/components/AccountStatusTag";
import Tag from "@/components/Tag";
import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChangePasswordForm from "../ChangePasswordForm";
import { useChangePassword } from "@/services/auth/hooks/useChangePassword";

type AdminInfoProps = {
  user?: AccountWithProfile | null;
};
export const AdminAvatarBox = ({ user }: AdminInfoProps) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center bg-slate-100 px-[56px] py-[34px] rounded-[20px] shadow-md">
      <CircleUserRound
        strokeWidth={1.4}
        size={160}
        className="  text-gray-primary"
      />
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

const InfoSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-2">
    <h3 className="text-2xl font-semibold font-inter">{title}</h3>
    {children}
  </div>
);

const InfoContent = ({ user }: AdminInfoProps) => (
  <>
    <InfoSection title="Information">
      {user ? (
        <>
          <p className="font-inter">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="font-inter flex flex-row gap-2">
            <strong>Status:</strong>
            <span className="inline-flex">
              <AccountStatusTag status={user.status} />
            </span>
          </p>
        </>
      ) : (
        <p className="font-inter text-center text-gray-400">
          No data available
        </p>
      )}
    </InfoSection>

    <InfoSection title="Preferences">
      <p className="font-inter flex flex-row gap-2">
        <strong>Light/dark:</strong>
      </p>
    </InfoSection>
  </>
);

export const AdminInfoBox = ({ user }: AdminInfoProps) => {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  const onLogout = async () => {
    await handleLogout();
    navigate("/login", { replace: true });
  };
  return (
    <div className="flex flex-col h-full justify-between gap-6 bg-slate-100 px-[42px] py-[25px] rounded-[20px] shadow-md">
      <div className="gap-5 flex flex-col">
        <InfoContent user={user} />
      </div>

      <Button
        onClick={onLogout}
        className="!font-inter !bg-purple-primary text-white hover:scale-105 transition-transform duration-300 mx-auto"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  );
};

export const GeneralInfoBox = ({ user }: AdminInfoProps) => {
  const { height, width = 0 } = useWindowSize();
  const [isBreakpoint, setIsBreakpoint] = useState(false);
  useEffect(() => {
    if (!width || !height) return;
    setIsBreakpoint(width > 450);
  }, [width, height]);

  return (
    <div className="flex flex-col gap-5 justify-center items-center bg-slate-100 px-[44px] py-[34px] rounded-[20px] shadow-md">
      <CircleUserRound
        strokeWidth={1.4}
        size={160}
        className="text-gray-primary"
      />

      {user && (
        <Tag
          text={user.role}
          bg="var(--color-purple-secondary)"
          textColor="var(--color-brown-primary)"
        />
      )}

      <div
        className={`gap-5 flex w-full ${isBreakpoint ? "flex-row justify-around" : "flex-col justify-around"
          }`}
      >
        <InfoContent user={user} />
      </div>

      <NavLink to="/">
        <Button className="!font-inter !bg-purple-primary text-white hover:scale-105 transition-transform duration-300">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </NavLink>
    </div>
  );
};

export const DetailSettingBox = () => {
  const { form, handleChangePassword } = useChangePassword();
  return (
    <div className="bg-slate-100 px-[42px] min-w-[200px] pt-10 flex-1 rounded-[20px] shadow-md flex flex-col gap-[10%] min-h-[500px]">
      <h3 className="!font-inter font-bold text-3xl grid text-gray-text-header items-center">
        Detailed Settings
      </h3>
      <ChangePasswordForm form={form} onSubmit={handleChangePassword} />
    </div>
  );
};
