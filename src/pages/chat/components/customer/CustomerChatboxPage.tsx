import MainContentLayout from "@/components/MainContentLayout";
import CustomerChatbox from "./CustomerChatbox";
import { useAuth } from "@/contexts/AuthContext";

export default function CustomerChatboxPage() {
  const { auth } = useAuth();

  return (
    <div>
      <MainContentLayout className=" font-inter">
        <CustomerChatbox userId={auth.user?.id ?? null} />
      </MainContentLayout>
    </div>
  );
}
