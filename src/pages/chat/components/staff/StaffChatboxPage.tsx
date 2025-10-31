import MainContentLayout from "@/components/MainContentLayout";
import StaffChatbox from "./StaffChatbox";
import { useAuth } from "@/contexts/AuthContext";

export default function StaffChatboxPage() {
  const { auth } = useAuth();

  return (
    <div>
      <MainContentLayout className=" ">
        <StaffChatbox userId={auth.user?.id ?? null} />
      </MainContentLayout>
    </div>
  );
}
