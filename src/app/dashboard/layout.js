"use client"

import {Button} from "@/components/ui/button";
import {signOut} from "next-auth/react";
import Link from "next/link";
import {AuthProvider} from "@/app/Providers";

export default function layout({ children }) {
    return (
        <AuthProvider>
            <div className="flex flex-col max-w-screen-2xl mx-auto">
                <div className="border-b-2 p-2 flex flex-row justify-between">
                    <div className="py-3">
                        <Link href="/dashboard">
                            <h1 className="sm:text-4xl text-2xl font-bold font-['Tw_Cen_MT_Condensed'] flex gap-2">
                                DASHBOARD
                                <img src="/pphaleminwhite.svg" alt="logo pphale" className="w-[30px]"/>
                            </h1>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <div>
                            <Button asChild>
                                <Link href="/dashboard/changepassword">
                                    Zmień hasło
                                </Link>
                            </Button>
                        </div>
                        <div>
                            <Button onClick={() => signOut()}>Wyloguj</Button>
                        </div>
                    </div>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </AuthProvider>
    )
}