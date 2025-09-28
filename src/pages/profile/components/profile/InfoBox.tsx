import AccountStatusTag from "@/components/AccountStatusTag";
import { InfoSection } from "../InfoSection";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import type { AccountWithProfile, Customer, Employee } from "@/types/models/account";
import { AccountRole } from "@/types/enums/role";
import { Switch } from "@/components/ui/switch";
type InfoBoxProps = {
    user: AccountWithProfile | undefined;
    handleLogout: () => Promise<void>;
}

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


    return (
        <div className="flex flex-col h-full justify-between gap-6 bg-slate-100 px-[42px] py-[25px] rounded-[20px] shadow-md">
            <div className="gap-5 flex flex-col">
                <InfoSection title="Information">
                    {user ? (
                        <>
                            <p className="font-inter">
                                <strong>Name:</strong> {user.profile?.firstName + " " + user?.profile?.lastName}
                            </p>
                            <p className="font-inter">
                                <strong>Email:</strong> {user.email}
                            </p>
                            {user.phone && (
                                <p className="font-inter">
                                    <strong>Tel:</strong> {user.phone}
                                </p>
                            )}
                            {(customerProfile?.address) && (
                                <p className="font-inter">
                                    <strong>Address:</strong> {customerProfile?.address}
                                </p>
                            )}
                            {employeeProfile?.certificate && (
                                <p className="font-inter">
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
                <InfoSection title="Preferences">
                    <div className="font-inter flex flex-row items-center gap-3">
                        <p>
                            <strong>Light/dark:</strong>
                        </p>
                        <Switch className="data-[state=checked]:bg-purple-primary" />
                    </div>
                </InfoSection>
            </div>

            <NavLink to="/" className="mx-auto">
                <Button className="!font-inter !bg-purple-primary text-white hover:scale-105 transition-transform duration-300" onClick={() => handleLogout()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </NavLink>
        </div>
    );
};

export default InfoBox;