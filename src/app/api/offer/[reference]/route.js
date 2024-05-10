import {connectDB} from "../../../../../utils/connect";
import Offer from "../../../../../models/cOfferModel";
import {NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";

export const dynamic = 'force-dynamic';
export async function GET(req, { params }) {
    const session = await getToken({req, secret:process.env.NEXTAUTH_SECRET})
    if (!session) {
        return NextResponse.json({error: "User is not authenticated"}, {status: 401})
    }
    const { reference } = params
    try {
        await connectDB()
        const offer = await Offer.find({reference: reference})
        return NextResponse.json(offer)
    } catch (e) {
        console.log(e)
        return NextResponse.error({ message: "Błąd pobierania ofert" }, { status: 404 })
    }
}