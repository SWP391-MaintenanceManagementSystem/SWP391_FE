import { useState } from "react"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import VehicleCard from "./VehicleCard"
import type { Vehicle } from "@/types/models/vehicle"

export default function VehicleList({ vehicles }: { vehicles: Vehicle[] }) {
    const [page, setPage] = useState(1)
    const pageSize = 4 
    const totalPages = Math.ceil(vehicles.length / pageSize)

    const start = (page - 1) * pageSize
    const paginated = vehicles.slice(start, start + pageSize)

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {paginated.map((v) => (
                    <VehicleCard key={v.id} vehicle={v} />
                ))}
            </div>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => setPage(Math.max(1, page - 1))} />
                    </PaginationItem>

                    {Array.from({ length: totalPages }).map((_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                isActive={page === i + 1}
                                onClick={() => setPage(i + 1)}
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext onClick={() => setPage(Math.min(totalPages, page + 1))} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
