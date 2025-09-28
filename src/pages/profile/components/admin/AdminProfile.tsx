import { useAuth } from "@/contexts/AuthContext";
import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import MainContentLayout from "@/components/MainContentLayout";
import {
  GeneralInfoBox,
  AdminAvatarBox,
  AdminInfoBox,
  DetailSettingBox,
} from "./InfoSection";

export default function AdminProfile() {
  const { auth } = useAuth();
  const { height, width = 0 } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!width || !height) return;

    if (width < 1024) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width, height]);

  return (
    <div className=" w-full h-[calc(100vh-32px)]">
      <DynamicBreadcrumbs />
      <MainContentLayout className="lg:flex-row flex-col gap-12 ">
        {isMobile ? (
          <GeneralInfoBox user={auth.user} />
        ) : (
          <div className="flex flex-col gap-5 ">
            <AdminAvatarBox user={auth.user} />
            <AdminInfoBox user={auth.user} />
          </div>
        )}
        <DetailSettingBox />
      </MainContentLayout>
    </div>
  );
}
