"use client"
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {

  const router = useRouter();

    return (
      <div className="bg-gray-100 h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
          <div className="flex justify-center items-center mb-4">
            <svg
              className="w-16 h-16 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18.364 5.636l-12.728 12.728m12.728 0L5.636 5.636"
              ></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Unauthorized Access</h1>
          <p className="text-gray-600 mb-4">You do not have permission to view this page.</p>
          <a
            className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-blue-600" onClick={() => router.back()}
          >
            Go Back
          </a>
        </div>
      </div>
    );
  }
  