export default function Loader  ({ isLoading }) {
    if (!isLoading) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-t-blue-500 border-r-blue-500 border-b-blue-500 border-l-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-4 border-t-white border-r-white border-b-white border-l-transparent rounded-full animate-spin animation-delay-150"></div>
                <div className="absolute inset-4 border-4 border-t-blue-300 border-r-blue-300 border-b-blue-300 border-l-transparent rounded-full animate-spin animation-delay-300"></div>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}