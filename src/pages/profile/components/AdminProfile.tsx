import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CircleUserRound, Eye, EyeOff, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import type { AccountWithProfile } from "@/types/models/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import AccountStatusTag from "@/components/AccountStatusTag";
import Tag from "@/components/Tag";

type AdminInfoProps = {
  user?: AccountWithProfile | null;
};
const AdminAvatarBox = ({ user }: AdminInfoProps) => {
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

const AdminInfoBox = ({ user }: AdminInfoProps) => {
  return (
    <div className="flex flex-col h-full justify-between gap-6 bg-slate-100 px-[42px] py-[25px] rounded-[20px] shadow-md">
      <div className="gap-5 flex flex-col">
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
          <p className="font-inter flex flex-row gap-2">
            <strong>Light/dark:</strong>
          </p>
        </InfoSection>
      </div>

      <NavLink to="/" className="mx-auto">
        <Button className="!font-inter !bg-purple-primary text-white hover:scale-105 transition-transform duration-300">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </NavLink>
    </div>
  );
};

const InputPasswordField = ({
  id,
  label,
  value,
  placeholder,
  styles,
  onChange,
}: {
  id: string;
  label: string;
  value: string | undefined;
  placeholder: string;
  styles?: React.CSSProperties;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="flex flex-col w-full items-start gap-1.5" style={styles}>
      <Label className="font-inter" htmlFor={id}>
        {label}
      </Label>
      <div className="relative w-full">
        <Input
          type={showPassword ? "text" : "password"}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="font-inter"
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 -translate-y-1/2 !bg-transparent text-gray-300 cursor-pointer"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      </div>
    </div>
  );
};

const DetailSettingBox = ({ user }: AdminInfoProps) => {
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  return (
    <div className="bg-slate-100 px-[42px] pt-10 flex-1 rounded-[20px] shadow-md grid grid-cols-2 grid-rows-5 gap-6">
      <h3 className="!font-inter font-bold text-3xl grid text-gray-text-header items-center">
        Detailed Settings
      </h3>
      <div className="flex flex-col w-full items-start gap-1 row-start-2 col-start-1 col-end-[-1]">
        <Label className="font-inter" htmlFor="email">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className="font-inter"
        />
      </div>
      <InputPasswordField
        id="password"
        label="Password"
        value={password}
        placeholder="Put your password"
        styles={{
          gridRowStart: 3,
        }}
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputPasswordField
        id="confirm-password"
        label=""
        value={confirmPassword}
        placeholder="Confirm your password"
        styles={{
          gridRowStart: 3,
          gridColumnStart: 2,
          justifyContent: "start",
          marginTop: "15px",
        }}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <InputPasswordField
        id="new-password"
        label="New Password"
        value={newPassword}
        placeholder="Put your new password"
        styles={{
          gridRowStart: 4,
        }}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <InputPasswordField
        id="confirm-new-password"
        label=""
        value={newPasswordConfirm}
        placeholder="Confirm your new password"
        styles={{
          gridRowStart: 4,
          gridColumnStart: 2,
          justifyContent: "start",
          marginTop: "15px",
        }}
        onChange={(e) => setNewPasswordConfirm(e.target.value)}
      />

      <Button
        className=" row-start-5 !font-inter max-w-[180px] !bg-purple-primary text-white !focus:outline-none !focus:ring-0 !focus:shadow-none hover:scale-105 transition-transform duration-300"
        type="submit"
        onClick={() => {
          // Handle save changes logic here
          console.log("Save changes clicked");
          console.log("Email:", email);
          console.log("New Password:", newPassword);
          console.log("Confirm New Password:", newPasswordConfirm);
          console.log("New Password:", newPassword);
          console.log("Confirm New Password:", newPasswordConfirm);
        }}
      >
        Save Changes
      </Button>
      <NavLink
        to="/forgot-password"
        className="row-start-5 col-start-2 font-inter !items-center !underline"
      >
        Forgot Password?
      </NavLink>
    </div>
  );
};

export default function AdminProfile() {
  const { auth } = useAuth();

  return (
    <div className=" w-full h-[calc(100vh-32px)]">
      <DynamicBreadcrumbs />
      <div className="mt-4 py-[48px] px-[12px] h-full  flex gap-12 flex-1">
        <div className="flex flex-col gap-8 ">
          <AdminAvatarBox user={auth.user} />
          <AdminInfoBox user={auth.user} />
        </div>
        <DetailSettingBox user={auth.user} />
      </div>
    </div>
  );
}
