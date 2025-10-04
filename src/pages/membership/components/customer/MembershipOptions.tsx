import Loading from "@/components/Loading";
import MembershipCard from "./MembershipCard";
import { useMembership } from "@/services/membership/hooks/useMembership";

export default function MembershipOptions() {
    const {data, isLoading} = useMembership()
    if (isLoading) {
        return <Loading/>
    }
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-6">
        {data && data.map((m) => (
          <MembershipCard key={m.id} description={m.description ?? ""} title={m.name} price={m.price}   />
        ))}
      </div>
    </div>
  );
}
