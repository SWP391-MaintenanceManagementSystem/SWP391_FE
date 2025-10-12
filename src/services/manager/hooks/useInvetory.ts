import {
  useDeletePartItem,
  useAddCategory,
  useEditPartItem,
} from "../mutations";
import type { Category, Part } from "@/types/models/part";
import {
  type PartItemFormData,
  PartItemSchema,
} from "@/pages/inventory/libs/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useInventory = (
  currentPage: number,
  currentPageSize: number,
  part: Part,
) => {
  const deletePartMutaion = useDeletePartItem();
  const addCategoryMutation = useAddCategory();
  const editPartItemMatation = useEditPartItem();

  const form = useForm<PartItemFormData>({
    resolver: zodResolver(PartItemSchema),
    defaultValues: {
      name: part.name,
      categoryId: part.category.id || "",
      stock: Number(part.quantity) || 0,
      minStock: Number(part.minStock) || 0,
      price: Number(part.price) || 0,
      description: part.description || "",
    },
  });

  const handleEditPartItem = (id: string) => {
    editPartItemMatation.mutate({
      partId: id,
      data: form.getValues(),
      currentPage,
      currentPageSize,
    });
  };

  const handleDeletePart = (id: string) => {
    deletePartMutaion.mutate({
      id,
      currentPage,
      currentPageSize,
    });
  };

  const handleAddCategory = async (
    name: string,
    onSuccess?: (newCategory: Category) => void,
  ) => {
    addCategoryMutation.mutate(
      { name },
      {
        onSuccess: (newCategory) => {
          if (onSuccess) onSuccess(newCategory);
        },
      },
    );
  };

  return {
    handleDeletePart,
    handleAddCategory,
    form,
    handleEditPartItem,
  };
};
