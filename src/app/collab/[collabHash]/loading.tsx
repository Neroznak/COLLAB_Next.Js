export default function Loading() {
    return (
        <div className="animate-pulse space-y-4 p-4">
            <div className="h-10 w-10 rounded-full bg-gray-300"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
    );
}