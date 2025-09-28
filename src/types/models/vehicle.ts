
const VehicleStatus = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE"
} as const;

type VehicleStatus = typeof VehicleStatus[keyof typeof VehicleStatus];

export type Vehicle = {
    "id": string,
    "vin": string,
    "model": string,
    "brand": string,
    "licensePlate": string,
    "customerId": string,
    "status": VehicleStatus,
    "deletedAt": string | null,
    "lastServiceDate": string | null,
    "createdAt": string,
    "updatedAt": string,
}


