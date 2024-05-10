import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import {connectDB} from "../../../../../utils/connect";
import UserModel from "../../../../../models/userModel";
import bcrypt from "bcryptjs";

export const authOptions = {
    pages: {
        signIn: "/login"
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                const {name, password} = credentials;

                try {
                    await connectDB()
                    const user = await UserModel.findOne({name});
                    if (!user) return null;
                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (!passwordMatch) return null;

                    return user
                } catch (e) {
                    console.log("error", e)
                }
            }})
    ],
    callbacks: {
        async jwt({ token, user, session }) {
            if (user) {
                return {
                    ...token,
                    id: user._id,
                }
            }
            return token;

        },
        async session({ session, token, user }) {
            return  {
                ...session,
                user: {
                    ...session.user,
                    id: token.id
                }
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }