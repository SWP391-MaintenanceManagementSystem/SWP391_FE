import { useMarkAsReadMutation, useMarkAsReadAllMutation } from "../mutations";

export function useMarkAsRead() {
  const markAsReadMutation = useMarkAsReadMutation();
  const onMarkAsRead = (id: string) => {
    markAsReadMutation.mutate(id);
  };
  return { onMarkAsRead };
}

export function useMarkAsReadAll() {
  const markAsReadAllMutation = useMarkAsReadAllMutation();
  const onMarkAsReadAll = () => {
    markAsReadAllMutation.mutate();
  };
  return { onMarkAsReadAll };
}
