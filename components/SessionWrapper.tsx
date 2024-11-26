
'use client'
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";

export const SessionWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </SessionProvider>
    )
}