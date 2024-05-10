import {getToken} from "next-auth/jwt";
import {NextResponse} from "next/server";
import CryptoJS from "crypto-js";
import {connectDB} from "../../../../utils/connect";
import UserModel from "../../../../models/userModel";
import bcrypt from "bcryptjs"

const decryptPassword = (encryptedPassword, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};
const secretKey = 'xV01O+jyCQ+psYVX3ieh13MJjzdCXftD7u4dFJtImr4=';

export async function PUT(req) {
    const session = await getToken({req, secret:process.env.NEXTAUTH_SECRET})
    if (!session) {
        return NextResponse.json({error: "User is not authenticated"}, {status: 401})
    }
    try {
        const { value } = await req.json()
        console.log(value)
        const decryptedOldPassword = decryptPassword(value[0], secretKey)
        const decryptedNewPassword = decryptPassword(value[1], secretKey)
        const decryptedUser = decryptPassword(value[2], secretKey)
        await connectDB()
        const oldPass = await UserModel.find({ name: decryptedUser})
        // if (oldPass) {
        //     console.log("oldPASS", oldPass)
        // }
        if (!oldPass) {
            return NextResponse.json({ error: "error"}, { status: 404 })
        }
        const matching = await bcrypt.compare(decryptedOldPassword, oldPass[0].password)
        if (!matching) return NextResponse.json({ error: "bad old password"}, { status: 400 })
        const hashedNewPassword = await bcrypt.hash(decryptedNewPassword, 10);
        await UserModel.findOneAndUpdate({ name: decryptedUser}, {password: hashedNewPassword})
        return NextResponse.json({ success: "success, password has been updated"}, { status: 201})
    } catch (e) {
        console.log("error", e)
    }
}