import {NextResponse} from "next/server";
import {connectDB} from "../../../../utils/connect";
import bcrypt from "bcryptjs"
import UserModel from "../../../../models/userModel";
import {getToken} from "next-auth/jwt";

export async function POST(req) {
    const session = await getToken({req, secret:process.env.NEXTAUTH_SECRET})
    if (!session) {
        return NextResponse.json({error: "User is not authenticated"}, {status: 401})
    }
    try {
        const { login, email, password } = await req.json()
        const hashedPassword = await bcrypt.hash(password, 10);
        await connectDB()
        await UserModel.create({login, email, password: hashedPassword })

        return NextResponse.json({ message: "User registered."}, { status: 201 })
    } catch (e) {
        return NextResponse.json({ message: "An error occurred while registering the user."}, { status: 500 })
    }
}