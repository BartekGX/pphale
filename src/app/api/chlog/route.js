import {getToken} from "next-auth/jwt";
import {NextResponse} from "next/server";
import {connectDB} from "../../../../utils/connect";
import UserModel from "../../../../models/userModel";
import diacritics from "diacritics"

export async function PUT(req) {
    const session = await getToken({req, secret:process.env.NEXTAUTH_SECRET})
    if (!session) {
        return NextResponse.json({error: "User is not authenticated"}, {status: 401})
    }
    try {
        const { login } = await req.json()
        const formattedLogin = diacritics.remove(login.replace(/ /g, "_"))
        await connectDB()
        await UserModel.findOneAndUpdate({ _id: session.id}, {name: formattedLogin})
        return NextResponse.json({ success: "success, login has been updated", newLogin: formattedLogin}, { status: 201})
    } catch (e) {
        console.log("error", e)
        return NextResponse.json({ error: "server error"}, { status: 500})
    }
}