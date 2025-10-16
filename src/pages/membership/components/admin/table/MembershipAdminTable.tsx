import { useState, useMemo } from "react";
import { DataTable } from "@/components/table/DataTable";
import { getColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddDialog } from "@/components/dialog/AddDialog";
import useMembership from "@/services/membership/hooks/useMembership";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PeriodType } from "@/types/enums/periodType";
import type { CreateMembershipsFormData } from "@/pages/membership/lib/schema";
import type { MembershipTable } from "@/pages/membership/lib/table-types";
import type { ColumnDef } from "@tanstack/react-table";

export default function MembershipAdminTable() {
  const { data, isLoading, form, onSubmit } = useMembership();
  const [openAdd, setOpenAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleConfirmAdd = (formData: CreateMembershipsFormData) => {
    onSubmit(formData);
    setOpenAdd(false);
    form.reset();
  };

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!searchTerm.trim()) return data;
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const columns = getColumns();

  return (
    <div className="w-full mt-4">
      <DataTable
        data={filteredData || []}
        columns={columns as ColumnDef<MembershipTable, unknown>[]}
        isLoading={isLoading}
        isSearch
        searchPlaceholder="Search membership name..."
        searchValue={["name"]}
        onSearchChange={(value) => setSearchTerm(value)}
        headerActions={
          <Button
            onClick={() => setOpenAdd(true)}
            variant="ghost"
            className="ml-3 h-9 text-white bg-purple-primary hover:bg-purple-primary-dark 
              dark:bg-purple-primary-dark dark:hover:bg-purple-landing dark:text-amber-primary caret-transparent"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Membership
          </Button>
        }
      />

      {/* Add Dialog */}
      <AddDialog
        open={openAdd}
        onOpenChange={setOpenAdd}
        onConfirm={handleConfirmAdd}
        form={form}
        title="Membership"
      >
        <div className="grid grid-cols-2 gap-4">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter membership name"
                    className="border p-2 rounded-md w-full text-sm 
                      text-gray-900 dark:text-white 
                      placeholder:text-gray-500 dark:placeholder:text-gray-400 
                      focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    {...field}
                    placeholder="Enter price"
                    className="border p-2 rounded-md w-full text-sm 
                      text-gray-900 dark:text-white 
                      placeholder:text-gray-500 dark:placeholder:text-gray-400 
                      focus:ring-2 focus:ring-primary focus:outline-none"
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? "" : parseFloat(e.target.value)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Duration */}
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Enter duration"
                    className="border p-2 rounded-md w-full text-sm 
                      text-gray-900 dark:text-white 
                      placeholder:text-gray-500 dark:placeholder:text-gray-400 
                      focus:ring-2 focus:ring-primary focus:outline-none"
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? "" : parseInt(e.target.value)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Period Type */}
          <FormField
            control={form.control}
            name="periodType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Period Type</FormLabel>
                <Select
                  onValueChange={(value: PeriodType) =>
                    form.setValue("periodType", value, { shouldDirty: true })
                  }
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger
                      className="border rounded-md w-full text-sm 
                        text-gray-900 dark:text-white 
                        placeholder:text-gray-500 dark:placeholder:text-gray-400 
                        focus:ring-2 focus:ring-primary focus:outline-none h-[38px] px-2"
                    >
                      <SelectValue placeholder="Select Period Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="DAY">Day</SelectItem>
                    <SelectItem value="MONTH">Month</SelectItem>
                    <SelectItem value="YEAR">Year</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter description"
                    className="border p-2 rounded-md w-full text-sm 
                      text-black dark:text-white 
                      placeholder:text-gray-500 dark:placeholder:text-gray-400 
                      focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </AddDialog>
    </div>
  );
}
