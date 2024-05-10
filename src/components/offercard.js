import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const S3BucketName = process.env.AWS_S3_BUCKET_NAME;
const S3Region = process.env.AWS_S3_REGION;
function truncateText(text, maxLines) {
    const lines = text.split('\n');
    const truncatedLines = lines.slice(0, maxLines);
    let truncatedText = truncatedLines.join('\n');

    if (lines.length > maxLines) {
        truncatedText += '...';
    }

    return truncatedText;
}
export default function Offercard({ data }) {

    const photoURL = `https://${S3BucketName}.s3.${S3Region}.amazonaws.com/${data.photo}`

    const updatedAtFromMongoDB = new Date(data.updatedAt);
    const formattedDate = `${updatedAtFromMongoDB.getDate().toString().padStart(2, '0')}.` +
        `${(updatedAtFromMongoDB.getMonth() + 1).toString().padStart(2, '0')}.` +
        `${updatedAtFromMongoDB.getFullYear()} ` +
        `${updatedAtFromMongoDB.getHours().toString().padStart(2, '0')}:` +
        `${updatedAtFromMongoDB.getMinutes().toString().padStart(2, '0')}`;


    return (
        <Link href={`/${data.reference}`}>
            <Card className="w-full relative overflow-hidden flex flex-row font-['Tw_Cen_MT_Condensed'] p-2">
            <div className="md:w-[200px] sm:w-[100px] xsm:w-[60px] w-[50px] overflow-hidden aspect-square relative">
                <div className="relative w-full h-full flex justify-center items-center">
                    <img src={photoURL} alt={data.name} className="max-w-full max-h-full rounded-lg object-contain w-[200px] block flex-shrink-0 flex-grow-0"/>
                </div>
            </div>
            <div className="flex flex-row w-full sm:px-2 px-1 sm:py-4 py-2 justify-between items-center sm:gap-2 gap-1">
                <div className="h-full flex flex-col justify-between">
                    <div className="lg:text-4xl md:text-3xl xsm:text-2xl">
                        {truncateText(data.name, 3)}
                    </div>
                    <div>
                        <p className="xmd:text-xl sm:text-base sm:text-nowrap">Rawa Mazowiecka</p>
                    </div>
                </div>
                <div className="text-end h-full flex justify-between flex-col">
                    <p className="lg:text-4xl md:text-3xl xsm:text-2xl font-bold">{data.price.toLocaleString()} zł</p>
                    <p className="xmd:text-xl sm:text-base sm:text-nowrap">aktualizowane {formattedDate}</p>
                </div>
            </div>
        </Card>
        </Link>

    )
}