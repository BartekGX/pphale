import {Card} from "@/components/ui/card";
import Link from "next/link";

const S3BucketName = process.env.AWS_S3_BUCKET_NAME;
const S3Region = process.env.AWS_S3_REGION;
export default function Offercard({ data }) {
    const photoURL = `https://${S3BucketName}.s3.${S3Region}.amazonaws.com/${data.photo}`
    return (
        <Link href={`/${data.reference}`}>
            <Card className="w-full relative overflow-hidden flex xsm:flex-row flex-col font-['Tw_Cen_MT_Condensed'] p-2">
            <div className="md:w-[200px] sm:w-[80px] w-full overflow-hidden relative">
                <div className="relative w-full h-full flex justify-center items-center">
                    <img src={photoURL} alt={data.name} className="max-w-full max-h-full rounded-lg object-contain w-[200px] block flex-shrink-0 flex-grow-0"/>
                </div>
            </div>
            <div className="flex sm:flex-row flex-col w-full sm:px-2 px-1 sm:py-4 py-2 justify-between items-center sm:gap-2 gap-1">
                <div className="h-full flex flex-col justify-between">
                    <div className="lg:text-3xl md:text-2xl xsm:text-xl text-lg">
                        {data.name}
                    </div>
                </div>
                <div className="text-end h-full flex justify-between flex-col sm:w-auto w-full">
                    <p className="lg:text-4xl md:text-3xl text-2xl text-nowrap font-bold sm:text-end text-start sm:w-auto w-full">{data?.price ? data.price.toLocaleString() : "brak informacji"} zł</p>
                </div>
                <div className="block sm:hidden w-full text-end">
                    <p className="xmd:text-xl sm:text-base sm:text-nowrap">Rawa Mazowiecka</p>
                </div>
            </div>
            </Card>
        </Link>

    )
}
