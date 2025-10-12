import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import type { Category, Part } from "@/types/models/part";
import type { PartItemFormData } from "../libs/schema";

interface AddEditGoodsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: PartItemFormData) => void;
  item?: Part | null;
  categories: Category[];
  handleAddCategory: (
    name: string,
    onSuccess: (newCat: Category) => void,
  ) => void;
  form: ReturnType<typeof useForm<PartItemFormData>>;
}

export function AddEditGoodsDialog({
  open,
  onOpenChange,
  onConfirm,
  item,
  categories,
  handleAddCategory,
  form,
}: AddEditGoodsDialogProps) {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const { control, watch, setValue, handleSubmit } = form;

  const onSubmit = async (values: PartItemFormData) => {
    const isValid = await form.trigger();
    if (!isValid) return;
    onConfirm(values);
    console.log(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[500px] font-inter"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{item ? "Edit Item" : "Add New Item"}</DialogTitle>
          <DialogDescription>
            {item
              ? "Update the item details below."
              : "Enter the details for the new inventory item."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Item Name + Unit Price */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Item Name" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Price *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0"
                        required
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(Number(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Quantity + Minimum Stock */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Quantity *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        required
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(Number(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="minStock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Stock *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        required
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(Number(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Category Select / Add New */}
            <div className="space-y-2 w-full">
              <Label>Category *</Label>
              {isAddingCategory ? (
                <div className="flex gap-2">
                  <Input
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New category name"
                    className="flex-1"
                    required
                  />
                  <Button
                    type="button"
                    size="sm"
                    disabled={!newCategory.trim()}
                    onClick={() => {
                      handleAddCategory(newCategory, (newCat) => {
                        setValue("categoryId", newCat.id, {
                          shouldDirty: true,
                        });
                        setIsAddingCategory(false);
                        setNewCategory("");
                      });
                    }}
                  >
                    Add
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAddingCategory(false)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Select
                  onValueChange={(value) => {
                    if (value === "add-new") {
                      setIsAddingCategory(true);
                    } else {
                      setValue("categoryId", value, { shouldDirty: true });
                    }
                  }}
                  value={watch("categoryId")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="add-new">+ Add New Category</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Description */}
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Optional description or notes"
                      rows={3}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Footer Buttons */}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="!outline-none bg-purple-primary"
                disabled={!form.formState.isDirty}
              >
                {item ? "Update Item" : "Add Item"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
