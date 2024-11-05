export default function Home () {
    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_BACKEND_TUNNEL_URL}/auth/google`;
    };
    console.log(import.meta.env.VITE_BACKEND_TUNNEL_URL);
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                <h1 className="text-5xl font-extrabold text-gray-800 mb-6">Google Calendar App</h1>
                <p className="text-lg text-gray-600 mb-4">
                    Manage your events seamlessly with Google Calendar integration.
                </p>
                <button
                    onClick={handleGoogleLogin}
                    className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

