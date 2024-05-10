import {connectDB} from "../../../../../utils/connect";
import Offer from "../../../../../models/cOfferModel";
import {NextResponse} from "next/server";

export const dynamic = 'force-dynamic';
export async function GET(req, { params }) {
    const { reference } = params
    try {
        await connectDB()
        const offer = await Offer.find({ isPublic: true, reference: reference})
        return NextResponse.json(offer)
    } catch (e) {
        console.log(e)
        return NextResponse.error({ message: "Błąd pobierania ofert" }, { status: 404 })
    }
}