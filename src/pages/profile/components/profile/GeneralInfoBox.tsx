import Tag from "@/components/Tag";
import type { AccountWithProfile } from "@/types/models/account";
import { CircleUserRound, LogOut } from "lucide-react";
import { InfoSection } from "../InfoSection";
import AccountStatusTag from "@/components/AccountStatusTag";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme/ModeToggle";

type GeneralInfoBoxProps = {
  user: AccountWithProfile | undefined;
  handleLogout: () => Promise<void>;
};

const GeneralInfoBox = ({ user, handleLogout }: GeneralInfoBoxProps) => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center bg-slate-100 px-[56px] py-[34px] rounded-[20px] shadow-md">
      <CircleUserRound
        strokeWidth={1.4}
        size={160}
        className="  text-gray-primary"
      />
      {user && <Tag text={user.role} />}
      <div className="gap-5 flex flex-col items-start w-full">
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
        {/* PREFERENCES */}
        <InfoSection title="Preferences">
          <div className="flex flex-row gap-4 items-center">
            <span className="font-inter font-semibold">Modes:</span>
            <ModeToggle />
          </div>
        </InfoSection>
      </div>
      <NavLink to="/" className="mx-auto">
        <Button
          className="!font-inter !bg-purple-primary text-white dark:text-black hover:scale-105 transition-transform duration-300"
          onClick={() => handleLogout()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </NavLink>
    </div>
  );
};

export default GeneralInfoBox;
