import { useState, useMemo } from "react";
import { DataTable } from "@/components/table/DataTable";
import { getColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { AddDialog } from "@/components/dialog/AddDialog";
import useMembership from "@/services/membership/hooks/useMembership";

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

  const columns = getColumns(handleFilterChange, filters, handleDelete);

  return (
    <div className="w-full mt-4">
      <div className="flex items-center justify-between mb-3">
        <div className="relative w-1/3">
          <Search
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search memberships..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-9 pr-3 py-2 border border-gray-300 rounded-md w-full !outline-none focus:ring-2 focus:ring-primary"
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

      <DataTable
        data={filteredData || []}
        columns={columns}
        isLoading={isLoading}
        title="Membership List"
      />

      <AddDialog
        open={openAdd}
        onOpenChange={setOpenAdd}
        onConfirm={form.handleSubmit(handleConfirmAdd)}
        form={form}
        title=" Membership"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Name</label>
            <input
              {...form.register("name")}
              className="border p-2 rounded-md w-full"
              placeholder="Enter membership name"
            />
          </div>

          <div>
            <label>Price</label>
            <input
              type="number"
              step={"0.01"}
              {...form.register("price")}
              className="border p-2 rounded-md w-full"
              placeholder="Enter price"
            />
          </div>

          <div>
            <label>Duration</label>
            <input
              type="number"
              {...form.register("duration")}
              className="border p-2 rounded-md w-full"
              placeholder="Enter duration"
            />
          </div>

          <div>
            <label>Period Type</label>
            <select
              {...form.register("periodType")}
              className="border p-2 rounded-md w-full"
            >
              <option value="DAY">Day</option>
              <option value="MONTH">Month</option>
              <option value="YEAR">Year</option>
            </select>
          </div>

          <div className="col-span-2">
            <label>Description</label>
            <textarea
              {...form.register("description")}
              className="border p-2 rounded-md w-full"
              placeholder="Enter description"
            />
          </div>
        </div>
      </AddDialog>
    </div>
  );
}
