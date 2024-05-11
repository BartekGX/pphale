import {connectDB} from "../../../../../utils/connect";
import Offer from "../../../../../models/cOfferModel";
import {NextResponse} from "next/server";

export const dynamic = 'force-dynamic';
export async function GET() {
    try {
        await connectDB()
        const offers = await Offer.find({ isPublic: true }, {reference: 0, photo: 0, description: 0, photos: 0})
        return NextResponse.json(offers)
    } catch (e) {
        console.log(e)
    }
}