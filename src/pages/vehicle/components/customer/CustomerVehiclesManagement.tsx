import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import VehicleCard from "./VehicleCard";
import useVehicle from "@/services/vehicle/hooks/useVehicle";
import { tr } from "@faker-js/faker";
import Loading from "@/components/Loading";
import VehicleList from "./VehicleList";


const brands = ["Vinfast", "Toyota", "Honda", "Ford", "Hyundai"];
const models = ["VF e34", "Corolla", "Civic", "Focus", "Elantra"];
const statuses = ["ACTIVE", "INACTIVE"];

export const mockVehicles = Array.from({ length: 100 }, (_, i) => {
    const brand = brands[i % brands.length];
    const model = models[i % models.length];
    const status = statuses[i % statuses.length];

    return {
        id: Math.random().toString(36).substring(2, 15),
        vin: `VIN${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        model,
        brand,
        licensePlate: `51H-${Math.floor(10000 + Math.random() * 90000)}`,
        lastServiceDate: new Date(
            Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30)
        ).toISOString().split('T')[0],
        deletedAt: null,
        customerId: "c8d3ac95-c44a-4ead-9330-fa95030a52bf",
        status: status as "ACTIVE" | "INACTIVE",
        createdAt: new Date(
            Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365)
        ).toISOString(),
        updatedAt: new Date().toISOString(),
    };
});


export default function CustomerVehiclesManagement() {
    const { virtualizer, scrollRef, data, isLoading } = useVehicle();

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

            <MainContentLayout className="flex-1 overflow-auto">
                {/* <div ref={scrollRef} className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 h-screen"> 
                </div>*/}

                {/* {virtualizer.getVirtualItems().map((virtualRow) => {
                            const vehicle = data[virtualRow.index];
                            if (!vehicle) return null;
                            return (
                                <div style={{ transform: `translateY(${virtualRow.start}px)` }} key={virtualRow.index} className="absolute ">
                                    <VehicleCard vehicle={vehicle} />
                                </div>
                            )
                        })} */}
                {/* {data && data.map((vehicle) => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))} */}

                <VehicleList vehicles={data ?? []} />
            </MainContentLayout>
        </div>
    );
}

