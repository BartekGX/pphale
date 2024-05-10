"use client"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import {useEffect, useState} from "react";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Dashboardtablerow from "@/components/dashboardtablerow";

export default function page() {
    const [data, setData] = useState([])
    const [isFetched, setIsFetched] = useState(false)
    const getData = async () => {
        try {
            const res = await fetch(`/api/offer`, {
                method: "GET",
                cache: "no-store"
            })
            if (!res.ok) {
                console.log("Błąd pobierania danych")
                return false
            }
             const _data = await res.json()
            setIsFetched(true)
            setData(_data)
        } catch (e) {
            console.log(e)
            return false
        }
    }
    useEffect(() => {
        getData()
    }, []);
    return (
        <div>
            <div className="border-b-2 py-3 px-2 flex justify-between items-center">
                <div>
                    <p className="text-xl">
                        Opcje
                    </p>
                </div>
                <div>
                    <Button asChild>
                        <Link href="/dashboard/create">
                            Dodaj ogłoszenie
                        </Link>
                    </Button>
                </div>

            </div>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[60px] text-center">Lp.</TableHead>
                            <TableHead>Nazwa</TableHead>
                            <TableHead className="w-[250px] text-center">Cena</TableHead>
                            <TableHead className="text-center">Publiczny</TableHead>
                            <TableHead className="text-center">opcje</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data && data.length > 0 && data.map((item, index) => (
                            <Dashboardtablerow key={item.reference + index} item={item} index={index} setData={setData} />
                        ))}
                    </TableBody>
                </Table>
                {
                    isFetched ? (
                        !data ? (
                            <div className="text-center py-4">błąd pobierania postów</div>
                        ) : data.length === 0 ? (
                            <div className="text-center py-4">brak ogłoszeń</div>
                        ) : null
                    ) : (
                        <div className="text-center py-4">ładowanie...</div>
                    )
                }


            </div>
        </div>
    )
}