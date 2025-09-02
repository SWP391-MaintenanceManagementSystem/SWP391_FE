import { Spinner } from "./ui/shadcn-io/spinner"

export default function CircularIndeterminate() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <p className="text-black text-sm">Loading...</p>
            </div>
        </div>
    )
}
