import Offercard from "@/components/offercard";

const getData = async () => {
    const apiURL = process.env.API_URL
    try {
        const res = await fetch(`${apiURL}/api/offeru`, {
            method: "GET",
            cache: "no-store"
        })
        if (!res.ok) {
            console.log("Błąd pobierania danych")
            return []
        }
        const data = await res.json()
        return data
    } catch (e) {
        console.log(e)
        return []
    }
}

export async function generateMetadata() {
    const data = await fetch(`${process.env.API_URL}/api/offeru/meta`).then((res) => res.json())
    let products = ""
    data.forEach((product, index) => {
        products += `${index + 1}. ${product.name} | cena ${product.price}zł\n`;
    });
    return {
        title: "P.P.HALE PRODUCENT KONSTRUKCJI STALOWYCH",
        siteName: 'P.P.HALE - PRODUCENT KONSTRUKCJI STALOWYCH',
        description: "Producent Konstrukcji Stalowych, Piotr Wójcik - Rawa Mazowiecka",
        locale: 'pl_PL',
        type: 'website',
        keywords: "producent konstrukcja stalowa hale solidne wytrzymale dobre cena stalowe wiaty Rawa Mazowiecka na zamówienie polski produkt carport magazyn zadaszenie na pojazdy maszyny skrzynio-palety fotowoltawiczna Wójcik Piotr indywidualne tanio pphale"
    }
}


export default async function Home() {
    const data = await getData()
    return (
        <main className="flex min-h-screen flex-col items-center font-TwCenMTCondensed">
            <div className="w-full max-w-[1100px]">
                <div className="w-full pt-2 md:px-0 px-1">
                    <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold pt-3 text-center">OFERTA PRODUKTÓW</h1>
                </div>
                {data.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2 m-2">
                        {data.map(item => <Offercard key={item.id} data={item}/>)}
                    </div>
                ) : (
                    <div className="w-full">
                        <p className="text-center font-TwCenMTCondensed text-3xl">Brak ofert do wyświetlenia</p>
                    </div>
                )}
            </div>

        </main>
    );
}