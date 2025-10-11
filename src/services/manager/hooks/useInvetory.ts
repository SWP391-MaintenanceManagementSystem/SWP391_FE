import { useDeletePartItem } from "../mutations";

export const useInventory = (currentPage: number, currentPageSize: number) => {
  const deletePartMutaion = useDeletePartItem();

  const handleDeletePart = (id: string) => {
    deletePartMutaion.mutate({
      id,
      currentPage,
      currentPageSize,
    });
  };

  return {
    handleDeletePart,
  };
};
