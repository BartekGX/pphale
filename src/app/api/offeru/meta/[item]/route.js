import {connectDB} from "../../../../../../utils/connect";
import Offer from "../../../../../../models/cOfferModel";
import {NextResponse} from "next/server";

export const dynamic = 'force-dynamic';
export async function GET(req, { params }) {
    const { item } = params
    try {
        await connectDB()
        const offer = await Offer.findOne({ isPublic: true, reference: item}, {photo: 0, photos: 0, createdAt: 0 , updatedAt: 0})
        return NextResponse.json(offer)
    } catch (e) {
        console.log(e)
        return NextResponse.error({ message: "Błąd pobierania ofert" }, { status: 404 })
    }
}