import {
  useDeletePartItem,
  useEditPartItem,
  useAddPartItem,
  useRequestRefillPart,
} from "../mutations";
import type { Part } from "@/types/models/part";
import {
  type PartItemFormData,
  PartItemSchema,
} from "@/pages/inventory/libs/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useInventory = (
  currentPage: number,
  currentPageSize: number,
  part?: Part
) => {
  const deletePartMutaion = useDeletePartItem();
  const editPartItemMutation = useEditPartItem();
  const addPartItemMutation = useAddPartItem();
  const requestRefillMutation = useRequestRefillPart();
  const form = useForm<PartItemFormData>({
    resolver: zodResolver(PartItemSchema),
    defaultValues: {
      name: part?.name ?? "",
      categoryId: part?.category?.id ?? "",
      stock: part ? Number(part.quantity) : 0,
      minStock: part ? Number(part.minStock) : 0,
      price: part ? Number(part.price) : 0,
      description: part?.description ?? "",
      status: part?.status,
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
        const msg = error.response?.data.message;
        if (apiErrors && typeof apiErrors === "object") {
          Object.entries(apiErrors).forEach(([field, msg]) => {
            form.setError(field as keyof PartItemFormData, {
              type: "server",
              message: msg as string,
            });
          });
        } else if (msg) {
          toast.error(msg);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
    }
  };

  const handleDeletePart = (id: string) => {
    deletePartMutaion.mutate(
      {
        id,
        currentPage,
        currentPageSize,
      },
      {
        onError: (error) => {
          if (error instanceof AxiosError) {
            const apiErrors = error.response?.data?.errors;
            const msg = error.response?.data.message;
            if (apiErrors && typeof apiErrors === "object") {
              Object.entries(apiErrors).forEach(([field, msg]) => {
                form.setError(field as keyof PartItemFormData, {
                  type: "server",
                  message: msg as string,
                });
              });
            } else if (msg) {
              toast.error(msg);
            } else {
              toast.error("Something went wrong. Please try again.");
            }
          }
        },
      }
    );
  };

  const handleAddPartItem = async (data: PartItemFormData) => {
    return new Promise<boolean>((resolve) => {
      addPartItemMutation.mutate(
        {
          data,
          currentPage,
          currentPageSize,
        },
        {
          onSuccess: () => {
            resolve(true);
          },
          onError: (error) => {
            if (error instanceof AxiosError) {
              const apiErrors = error.response?.data?.errors;
              const msg = error.response?.data.message;
              if (apiErrors && typeof apiErrors === "object") {
                Object.entries(apiErrors).forEach(([field, msg]) => {
                  form.setError(field as keyof PartItemFormData, {
                    type: "server",
                    message: msg as string,
                  });
                });
              } else if (msg) {
                toast.error(msg);
              } else {
                toast.error("Something went wrong. Please try again.");
              }
            }
            resolve(false);
          },
        }
      );
    });
  };

  const handleRequestRefill = (id: string, refillAmount: number) => {
    requestRefillMutation.mutate(
      { id, refillAmount },
      {
        onSuccess: (data) => {
          toast.success(
            `Refill request sent successfully for ${data.part.name}`
          );
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            const msg = error.response?.data?.message;
            if (msg) toast.error(msg);
            else toast.error("Failed to send refill request");
          } else {
            toast.error("Failed to send refill request");
          }
        },
      }
    );
  };

  return {
    handleDeletePart,
    form,
    handleEditPartItem,
    handleAddPartItem,
    handleRequestRefill,
    isPending:
      addPartItemMutation.isPending ||
      editPartItemMutation.isPending ||
      deletePartMutaion.isPending ||
      requestRefillMutation.isPending,
  };
};
