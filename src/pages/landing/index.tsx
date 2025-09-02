import { Link, useNavigate } from "react-router-dom"

export default function LandingPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-md text-center">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome</h1>
                    <p className="text-gray-600 mb-8">Welcome to our SWP391 application</p>
                </div>
                <div className="space-y-4">
                    <Link
                        to="/login"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </div>
    )
}
