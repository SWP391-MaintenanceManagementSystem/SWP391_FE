import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import vehicleImg from "@/assets/vehicle_img.png";
import type { Vehicle } from "@/types/models/vehicle";



type VehicleCardProps = {
    vehicle: Vehicle
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
    return (
        <Card className="w-full max-w-sm md:max-w-xs lg:max-w-[368px] h-fit">
            <CardHeader>
                <CardTitle className="dark:text-white">{vehicle.licensePlate}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <img
                    src={vehicleImg}
                    alt="Vehicle Image"
                    className="w-full h-48 object-cover rounded "
                />
                <CardDescription className="flex flex-col gap-1">
                    <span>
                        <strong className="text-black dark:text-white">Model:</strong> {vehicle.model}
                    </span>
                    <span>
                        <strong className="text-black dark:text-white">Brand:</strong> {vehicle.brand}
                    </span>
                    <span>
                        <strong className="text-black dark:text-white">VIN:</strong> {vehicle.vin}
                    </span>
                    {vehicle.lastService && (
                        <span>
                            <strong className="text-black dark:text-white">Last Service:</strong> {vehicle.lastService}
                        </span>
                    )}
                </CardDescription>
            </CardContent>
            <CardFooter className="flex gap-2 justify-around flex-wrap">
                <Button variant={"outline"} className="flex-1 min-w-[120px] text-purple-primary">Book Service</Button>
                <Button variant={"outline"} className="flex-1 min-w-[120px] text-purple-primary">Book Service</Button>
            </CardFooter>
        </Card>
    );
}
