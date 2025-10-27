import AccountStatusTag from "@/components/tag/AccountStatusTag";
import { InfoSection } from "../InfoSection";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import type {
  AccountWithProfile,
  Customer,
  Employee,
} from "@/types/models/account";
import { AccountRole } from "@/types/enums/role";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { Card, CardContent } from "@/components/ui/card";

type InfoBoxProps = {
  user: AccountWithProfile | undefined;
  handleLogout: () => Promise<void>;
};

const InfoBox = ({ user, handleLogout }: InfoBoxProps) => {
  let customerProfile: Customer | undefined;
  let employeeProfile: Employee | undefined;
  switch (user?.role) {
    case AccountRole.CUSTOMER:
      customerProfile = user.profile as Customer;
      break;
    case AccountRole.STAFF:
    case AccountRole.TECHNICIAN:
      employeeProfile = user.profile as Employee;
      break;

    default:
      break;
  }

  const isAdmin = user?.role === AccountRole.ADMIN;

  return (
    <Card className="h-full ">
      <CardContent className="px-[42px] flex flex-col h-full justify-between gap-6">
        <div className="gap-5 flex flex-col font-inter">
          <InfoSection title="Information ">
            {user ? (
              <>
                {!isAdmin && (
                  <p>
                    <strong>Name:</strong>{" "}
                    {user.profile?.firstName + " " + user?.profile?.lastName}
                  </p>
                )}
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Role:</strong> {user.role}
                </p>
                {!isAdmin && user.phone && (
                  <p>
                    <strong>Tel:</strong> {user.phone}
                  </p>
                )}
                {customerProfile?.address && (
                  <p>
                    <strong>Address:</strong> {customerProfile?.address}
                  </p>
                )}
                {user.workCenter && (
                  <p>
                    <strong>Center:</strong> {user.workCenter.name}
                  </p>
                )}

                {employeeProfile?.certificate && (
                  <p>
                    <strong>Certificate:</strong> {employeeProfile?.certificate}
                  </p>
                )}
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
          <div className="mt-2">
            <InfoSection title="Preferences">
              <div className="flex flex-row gap-4 items-center">
                <span className="font-inter font-semibold">Modes:</span>
                <ModeToggle />
              </div>
            </InfoSection>
          </div>
        </div>

        <NavLink to="/" className="mx-auto">
          <Button
            className="!font-inter !bg-purple-primary !text-white dark:!text-black hover:scale-105 transition-transform duration-300"
            onClick={() => handleLogout()}
          >
            <LogOut className="mr-2 h-4 w-4 !text-white dark:!text-black" />
            Logout
          </Button>
        </NavLink>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
