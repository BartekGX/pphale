import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import parser from "html-react-parser"
import "../../../components/tiptapstyle.css"
import Link from "next/link";
import ImageSlider from "@/components/imageslider";
import ContactReveal from "@/components/contactReveal";
import Myhead from "@/components/head";
import striptags from "striptags";


export async function generateMetadata({ params }) {
    const product = await fetch(`${process.env.API_URL}/api/offeru/meta/${params.name}`).then((res) => res.json())
    return {
        title: product?.name || "zły odnościk",
        applicationName: "P.P.HALE",
        siteName: 'P.P.HALE - PRODUCENT KONSTRUKCJI STALOWYCH',
        description: striptags(product?.description) || "P.P.HALE - PRODUCENT KONSTRUKCJI STALOWYCH",
        locale: 'pl_PL',
        openGraph: {
            images: [product?.image],
        },
        type: 'website',
        keywords: "producent konstrukcja stalowa hale solidne wytrzymale dobre cena stalowe wiaty Rawa Mazowiecka na zamówienie polski produkt carport magazyn zadaszenie na pojazdy maszyny skrzynio-palety fotowoltawiczna Wójcik Piotr indywidualne"
    }
}

const getData = async (name) => {
    if(!name) return false
    try {
        const res = await fetch(`${process.env.API_URL}/api/offeru/${name}`, {
            method: "GET",
            cache: "no-store"
        })
        if (!res.ok) {
            console.log("Błąd pobierania danych")
            return false
        }
        return await res.json()
    } catch (e) {
        console.log(e)
        return false
    }
}
const formatDate = (toFormat) => {
    try {
        const updatedAtFromMongoDB = new Date(toFormat);
            return `${updatedAtFromMongoDB.getDate().toString().padStart(2, '0')}.` +
            `${(updatedAtFromMongoDB.getMonth() + 1).toString().padStart(2, '0')}.` +
            `${updatedAtFromMongoDB.getFullYear()} ` +
            `${updatedAtFromMongoDB.getHours().toString().padStart(2, '0')}:` +
            `${updatedAtFromMongoDB.getMinutes().toString().padStart(2, '0')}`;
    } catch (error) {
        console.error("Błąd podczas formatowania daty:", error);
        return "brak info";
    }

}
export default async function Page({ params }) {
    const { name } = params
    const data = await getData(name)
    let forFormat = 0
    if (data) {
        forFormat = data.updatedAt
    }
    const formattedDate = formatDate(forFormat)
    return (
            <div className="flex relative sm:px-3 px-0 py-3 gap-2 md:flex-row flex-col-reverse w-full font-TwCenMTCondensed">
                {data ? (
                    <div className="grid lg:grid-cols-[1fr_400px] grid-cols-1 gap-3 w-full">
                        <div className="w-full flex flex-col gap-2 row-start-2 lg:row-start-auto">
                            <Card className="flex justify-center">
                                {data.photos.length + data.photo.length > 0 ? (
                                    <ImageSlider urls={[data.photo, ...data.photos]}/>
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