import {connectDB} from "../../../../utils/connect";
import UserModel from "../../../../models/userModel";
import {NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";

export async function POST(req) {
    const session = await getToken({req, secret:process.env.NEXTAUTH_SECRET})
    if (!session) {
        return NextResponse.json({error: "User is not authenticated"}, {status: 401})
    }
    try {
        await connectDB()
        const {email} = await req.json()
        const user = await UserModel.findOne({ email }).select("_id")
        return NextResponse.json({ user});
    } catch (e) {
        console.log(e)
    }
}