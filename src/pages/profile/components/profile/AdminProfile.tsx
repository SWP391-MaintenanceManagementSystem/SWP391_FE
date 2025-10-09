import { useAuth } from "@/contexts/AuthContext";
import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import MainContentLayout from "@/components/MainContentLayout";
import DetailSettingBox from "./DetailedSettingBox";
import AvatarBox from "./AvatarBox";
import GeneralInfoBox from "./GeneralInfoBox";
import InfoBox from "./InfoBox";
import { useGetProfile } from "@/services/profile/queries";
import Loading from "@/components/Loading";

export default function AdminProfile() {
  const { handleLogout } = useAuth();
  const { height, width = 0 } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  const { data: profile, isLoading } = useGetProfile();

  useEffect(() => {
    if (!width || !height) return;

    if (width < 1024) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width, height]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className=" w-full h-[calc(100vh-32px)]">
      <DynamicBreadcrumbs />
      <MainContentLayout className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 ">
        {isMobile ? (
          <GeneralInfoBox user={profile} handleLogout={handleLogout} />
        ) : (
          <div className="flex flex-col gap-5 ">
            <AvatarBox user={profile} />
            <InfoBox user={profile} handleLogout={handleLogout} />
          </div>
        )}
        <DetailSettingBox user={profile} />
      </MainContentLayout>
    </div>
  );
}
