import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import parser from "html-react-parser"
import "../../../components/tiptapstyle.css"
import Link from "next/link";
import ImageSlider from "@/components/imageslider";
import ContactReveal from "@/components/contactReveal";

const getData = async (name) => {
    const apiURL = process.env.API_URL
    try {
        const res = await fetch(`${apiURL}/api/offeru/${name}`, {
            method: "GET",
            cache: "no-store"
        })
        if (!res.ok) {
            console.log("Błąd pobierania danych")
            return false
        }
        const data = await res.json()
        return data[0]
    } catch (e) {
        console.log(e)
        return false
    }
}
export default async function page({ params }) {
    const { name } = params
    const data = await getData(name)
    const allPhotos = [data.photo, ...data.photos]
    const updatedAtFromMongoDB = new Date(data.updatedAt);
    const formattedDate = `${updatedAtFromMongoDB.getDate().toString().padStart(2, '0')}.` +
        `${(updatedAtFromMongoDB.getMonth() + 1).toString().padStart(2, '0')}.` +
        `${updatedAtFromMongoDB.getFullYear()} ` +
        `${updatedAtFromMongoDB.getHours().toString().padStart(2, '0')}:` +
        `${updatedAtFromMongoDB.getMinutes().toString().padStart(2, '0')}`;
    return (
            <div className="flex relative sm:px-3 px-0 py-3 gap-2 md:flex-row flex-col-reverse w-full font-['Tw_Cen_MT_Condensed']">

                {data ? (
                    <div className="grid lg:grid-cols-[1fr_400px] grid-cols-1 gap-3 w-full">
                        <div className="w-full flex flex-col gap-2 row-start-2 lg:row-start-auto">
                            <Card className="flex justify-center">
                                {data.photos.length + data.photo.length > 0 ? (
                                    <ImageSlider urls={allPhotos}/>
                                ) : (
                                    <div className="py-32">
                                        brak zdjęć
                                    </div>
                                )}
                            </Card>
                            <Card className="lg:w-[400px] w-full block lg:hidden">
                                <CardHeader>
                                    <CardTitle className="font-normal text-3xl">{data.name}</CardTitle>
                                    <div className="flex flex-wrap flex-col">
                                        <span className="text-gray-400 text-2xl">cena</span>
                                        <p className="font-medium whitespace-nowrap text-3xl">{data.price.toLocaleString()} zł</p>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ContactReveal/>
                                    <div>
                                        <p className="text-xl mt-2">ostatnio edytowane: {formattedDate}</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Opis
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-box text-xl">
                                        {parser(data.description)}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className=" h-full">
                            <Card className="lg:w-[400px] w-full lg:sticky lg:top-2 lg:block hidden">
                                <CardHeader>
                                    <CardTitle className="font-normal text-3xl">{data.name}</CardTitle>
                                    <div className="flex flex-wrap flex-col">
                                        <span className="text-gray-400 text-2xl">cena</span>
                                        <p className="font-medium whitespace-nowrap text-3xl">{data.price.toLocaleString()} zł</p>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ContactReveal/>
                                    <div>
                                        <p className="text-xl mt-2">ostatnio edytowane: {formattedDate}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ) : (<div className="py-10 w-full text-center"><p className="text-2xl">Niepoprawny odnościk - brak
                    takiego zasobu</p>
                    <Link href="/" className="text-gray-400 text-lg">strona główna</Link></div>)}
            </div>
    )
}