import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import AvatarBox from "./AvatarBox";
import GeneralInfoBox from "./GeneralInfoBox";
import InfoBox from "./InfoBox";
import DetailSettingBox from "./DetailedSettingBox";
import { useGetProfile } from "@/services/profile/queries";
import Loading from "@/components/Loading";


export default function Profile() {
    const { handleLogout } = useAuth();
    const { data: profile, isLoading } = useGetProfile();
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

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className=" w-full h-[calc(100vh-32px)]">
            <DynamicBreadcrumbs />
            <MainContentLayout className="lg:flex-row flex-col gap-12">
                {isMobile ? (
                    <GeneralInfoBox user={profile} handleLogout={handleLogout} />
                ) : (
                    <div className="flex flex-col md:gap-8 gap-0 ">
                        <AvatarBox user={profile} />
                        <InfoBox user={profile} handleLogout={handleLogout} />
                    </div>
                )}
                <DetailSettingBox user={profile} />
            </MainContentLayout>
        </div>
    )
}
