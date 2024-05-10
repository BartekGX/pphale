"use client"
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Dashboardtablerow from "@/components/dashboardtablerow";
import {useState} from "react";

export default function Dashboardtable({ _data }) {
    const [data, setData] = useState(_data);
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[60px] text-center">Lp.</TableHead>
                    <TableHead>Nazwa</TableHead>
                    <TableHead className="w-[250px] text-center">Cena</TableHead>
                    <TableHead className="text-center">Publiczny</TableHead>
                    <TableHead className="text-center w-[100px]">Sprzedany</TableHead>
                    <TableHead className="text-center">opcje</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data && data.length > 0 && data.map((item, index) => (
                    <Dashboardtablerow key={item.reference + index} item={item} index={index} setData={setData} />
                ))}
            </TableBody>
        </Table>
    )
}