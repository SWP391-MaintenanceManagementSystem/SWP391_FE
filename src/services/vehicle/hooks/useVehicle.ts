import { useRef } from "react";
import { useGetMyVehicle } from "../queries";
import { useVirtualizer } from "@tanstack/react-virtual";




export default function useVehicle() {
    const { data, isLoading, isError } = useGetMyVehicle();
    const scrollRef = useRef<HTMLDivElement>(null);
    const itemsPerRow = 4;
    const rowCount = Math.ceil(data?.length! ?? 0 / itemsPerRow);
    const virtualizer = useVirtualizer({
        count: rowCount ?? 0,
        getScrollElement: () => scrollRef.current,
        estimateSize: () => 450,
    })
    return { data, isLoading, isError, virtualizer, scrollRef };
}
