import { useState, useMemo } from "react";
import { DataTable } from "@/components/table/DataTable";
import { getColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
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

export default function MembershipAdminTable() {
  const { data, isLoading, form, onSubmit, onDeleteMembership } =
    useMembership();

  const [openAdd, setOpenAdd] = useState(false);
  const [filters, setFilters] = useState({ status: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (field: string, value: string | undefined) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirmAdd = (formData: any) => {
    onSubmit(formData);
    setOpenAdd(false);
    form.reset();
  };

  const handleDelete = (id: string) => {
    onDeleteMembership(id);
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
      {/* Search + Add */}
      <div className="flex items-center justify-between mb-3">
        <div className="relative w-1/3">
          <Search
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
          <Input
            type="text"
            placeholder="Search memberships..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-9"
          />
        </div>

        <Button
          onClick={() => setOpenAdd(true)}
          variant={"ghost"}
          className="ml-3 h-9 text-white bg-purple-primary hover:bg-purple-primary-dark dark:bg-purple-primary-dark dark:hover:bg-purple-landing dark:text-amber-primary caret-transparent"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Membership
        </Button>
      </div>

      {/* Table */}
      <DataTable
        data={filteredData || []}
        columns={columns}
        isLoading={isLoading}
        title="Membership List"
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
                    className="border p-2 rounded-md w-full text-sm text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
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
                    className="border p-2 rounded-md w-full text-sm text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
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
                    className="border p-2 rounded-md w-full text-sm text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || 0)
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
                    <SelectTrigger className="border rounded-md w-full text-sm text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:outline-none h-[38px] px-2">
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
                    className="border p-2 rounded-md w-full text-sm text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
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
