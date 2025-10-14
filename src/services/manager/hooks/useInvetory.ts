import {
  useDeletePartItem,
  useEditPartItem,
  useAddPartItem,
} from "../mutations";
import type { Part } from "@/types/models/part";
import {
  type PartItemFormData,
  PartItemSchema,
} from "@/pages/inventory/libs/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";

export const useInventory = (
  currentPage: number,
  currentPageSize: number,
  part?: Part,
) => {
  const deletePartMutaion = useDeletePartItem();
  const editPartItemMutation = useEditPartItem();
  const addPartItemMutation = useAddPartItem();

  const form = useForm<PartItemFormData>({
    resolver: zodResolver(PartItemSchema),
    defaultValues: {
      name: part?.name ?? "",
      categoryId: part?.category?.id ?? "",
      stock: part ? Number(part.quantity) : 0,
      minStock: part ? Number(part.minStock) : 0,
      price: part ? Number(part.price) : 0,
      description: part?.description ?? "",
    },
  });

  const handleEditPartItem = async (id: string, data: PartItemFormData) => {
    try {
      await editPartItemMutation.mutateAsync({
        partId: id,
        data,
        currentPage,
        currentPageSize,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        const apiErrors = error.response?.data?.errors;
        if (apiErrors && typeof apiErrors === "object") {
          Object.entries(apiErrors).forEach(([field, msg]) => {
            form.setError(field as keyof PartItemFormData, {
              type: "server",
              message: msg as string,
            });
          });
        }
      }
    }
  };

  const handleDeletePart = (id: string) => {
    deletePartMutaion.mutate({
      id,
      currentPage,
      currentPageSize,
    });
  };

  const handleAddPartItem = async (data: PartItemFormData) => {
    addPartItemMutation.mutate(
      {
        data,
        currentPage,
        currentPageSize,
      },
      {
        onError: (error) => {
          if (error instanceof AxiosError) {
            const apiErrors = error.response?.data?.errors;
            if (apiErrors && typeof apiErrors === "object") {
              Object.entries(apiErrors).forEach(([field, msg]) => {
                form.setError(field as keyof PartItemFormData, {
                  type: "server",
                  message: msg as string,
                });
              });
            }
          }
        },
      },
    );
  };

  return {
    handleDeletePart,
    form,
    handleEditPartItem,
    handleAddPartItem,
  };
};
