import { useGetAllMemberships, useGetMySubscription } from "../queries";
import {
  useAddMembershipMutation,
  useDeleteMembershipMutation,
  useUpdateMembershipMutation,
} from "../mutations";
import { useForm } from "react-hook-form";
import type { Membership } from "@/types/models/membership";

export default function useMembership() {
  const { data, isLoading, isError } = useGetAllMemberships();
  const { data: mySubscriptionData } = useGetMySubscription();
  const addMembershipMutation = useAddMembershipMutation();
  const deleteMembershipMutation = useDeleteMembershipMutation();
  const updateMembershipMutation = useUpdateMembershipMutation();

 
  const form = useForm<Membership>({
    defaultValues: {
      name: "",
      price: 0,
      duration: 1,
      periodType: "MONTH",
      status: "ACTIVE",
      description: "",
    },
  });

  const onSubmit = (formData: Membership) => {
    addMembershipMutation.mutate(formData);
  };

  const onDeleteMembership = (membershipId: string) => {
    deleteMembershipMutation.mutate(membershipId);
  };

 const onUpdateMembership = (membershipId: string, formData: Membership) => {
  updateMembershipMutation.mutate({ membershipId, formData });
};


  return {
    data,
    mySubscriptionData,
    isLoading,
    isError,
    form,
    onSubmit,
    onDeleteMembership,
    onUpdateMembership,
  };
}
