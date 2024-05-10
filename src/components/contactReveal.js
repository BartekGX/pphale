"use client"
import {Button} from "@/components/ui/button";
import {useState} from "react";

export default function ContactReveal() {
    const [isShow, setIsShow] = useState(false)
    return (
        <>
            {!isShow ? (
                <Button className="w-full sm:text-3xl text-2xl" onClick={() => setIsShow(true)}>
                    POKAŻ NUMER
                </Button>
            ) : (
                <div className="border-white px-4 py-2 flex justify-center items-center rounded-md border-2 h-10">
                    <p className="text-center sm:text-3xl text-2xl">NUMER: +48 602 220 044</p>
                </div>
            )}
        </>
    )
}