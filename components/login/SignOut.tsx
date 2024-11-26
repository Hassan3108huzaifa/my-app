'use client'
import { signOut } from "next-auth/react";

export default function SignOutComponent(){
    return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-6">
            <h1 className="text-2xl font-bold mb-4">Sign Out</h1>
            <button 
                onClick={() => signOut()}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 
                          transition-colors duration-200 font-semibold"
            >
                Sign Out
            </button>
        </div>
    )
}