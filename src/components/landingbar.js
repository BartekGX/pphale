import Link from "next/link";
import { Separator } from "@/components/ui/separator"

export default function Landingbar() {
    return (
        <div className=" w-full border-b-2 border-gray-700 flex justify-end py-3 flex-col">
            <div className="mx-auto">
            <div className="flex justify-center items-center w-full text-2xl font-bold">
                <Link href="/">
                    <img src="/pphale_w.svg" className="h-7" alt="logo p.p. hale"/>
                </Link>
            </div>
                <Separator className="mt-2 bg-white"/>
            <div className="flex justify-center items-center min-w-60 w-full">
                <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold text-red-400 sm:text-start text-center font-['Tw_Cen_MT_Condensed']">PRODUCENT KONSTRUKCJI STALOWYCH</h1>
            </div>
            </div>
        </div>
    )
}