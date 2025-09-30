import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import VehicleCard from "./VehicleCard";
import useVehicle from "@/services/vehicle/hooks/useVehicle";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import AddVehicleFormModal from "./AddVehicleFormModal";
export default function CustomerVehiclesManagement() {
    const { data, isLoading, onSubmit, form } = useVehicle();
    const [openCreateVehicleModal, setOpenCreateVehicleModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredVehicles = useMemo(() => {
        if (!searchTerm) return data;
        if (!data) return [];
        const lowerSearch = searchTerm.toLowerCase();
        return data.filter(
            (v) =>
                v.licensePlate.toLowerCase().includes(lowerSearch) ||
                v.model.toLowerCase().includes(lowerSearch) ||
                v.brand.toLowerCase().includes(lowerSearch)
        );
    }, [searchTerm, data]);

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="w-full h-[calc(100vh-32px)] flex flex-col">
            <DynamicBreadcrumbs
                pathTitles={{
                    vehicles: "My Vehicles",
                }}
            />
            {openCreateVehicleModal && (
                <AddVehicleFormModal open={openCreateVehicleModal} onClose={() => setOpenCreateVehicleModal(false)} form={form} onSubmit={onSubmit} />
            )}
            <MainContentLayout className="flex flex-col font-inter">
                <div className="flex w-full justify-between items-center mb-6">
                    <span className="text-lg font-bold mb-4">Vehicle Information</span>
                    <div className="flex gap-4 w-full max-w-md">
                        <Input
                            placeholder="Search by license plate or model..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button className="bg-purple-primary text-white dark:text-amber-primary" onClick={() => setOpenCreateVehicleModal(true)}>
                            <Plus />
                            Add Vehicle
                        </Button>
                    </div>
                </div>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 h-screen overflow-auto">
                    {filteredVehicles && filteredVehicles.map((vehicle) => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                    {data && data.length === 0 && (
                        <div className="col-span-full text-center text-gray-500">
                            No vehicles found. Please add a vehicle to get started.
                        </div>
                    )}
                </div>
            </MainContentLayout>
        </div>
    );
}

