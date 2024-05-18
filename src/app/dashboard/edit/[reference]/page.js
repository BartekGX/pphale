"use client"
import Dashboardeditbox from "@/components/dashboardeditbox";
import { useEffect, useState } from "react";


export default  function page({ params }) {
    const [data, setData] = useState([])
    const [isFetched, setIsFetched] = useState(false)

    const getData = async (reference) => {
        try {
            const res = await fetch(`/api/offer/${reference}`, {
                method: "GET",
                cache: "no-store"
            })
            if (!res.ok) {
                console.log("błąd pobierania danych")
                setData([])
            }
            const data = await res.json()
            setData(data[0])
            setIsFetched(true)
            console.log(data)
        } catch (e) {
            console.log("błąd podczas pobierania danych")
            return false
        }
    }



    const { reference } = params
    useEffect(() => {
        getData(reference)
    }, []);
    return (
        <div>
            {isFetched ? (
                data ? (
                    <Dashboardeditbox _data={data}/>
                ) : <div className="w-full text-center">brak takiego ogłoszenia</div>
            ) : (
                <div className="w-full text-center">pobieranie danych...</div>
            )}
        </div>
    )
}