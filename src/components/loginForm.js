"use client"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {useState} from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)
    const [error, setError] = useState("")

    const router = useRouter()

    const handleSubmitLogin = async (e) => {
        e.preventDefault()
        setIsSubmit(true)

        if (!login || !password) return
        try {
            const res = await signIn('credentials', {
                name: login, password, redirect: false
            })

            if (res.error) {
                setError("błędne dane logowania")
                setIsSubmit(false)
                return
            }
            router.replace("/dashboard")
        } catch (e) {
            console.log(e)
        }

    }
    

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-gray-950">
            <div>
                <Card>
                    <CardHeader className="sm:p-3 p-0">
                        <div className="flex justify-center items-center py-4">
                            <Link href="/">
                                <img src="/pphale_w.svg" className="h-7" alt="logo p.p. hale"/>
                            </Link>
                        </div>
                        <CardTitle className="text-center">
                            Zaloguj się
                        </CardTitle>
                        <CardContent>
                            <form onSubmit={handleSubmitLogin} className="flex gap-2 flex-col sm:max-w-[350px] w-ful  mt-2">
                                <div className="grid items-center gap-1.5 sm:w-[350px] w-full">
                                    <Label htmlFor="login">Login</Label>
                                    <Input type="text" id="login" placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)}/>
                                </div>
                                <div className="grid items-center gap-1.5 sm:w-[350px] w-full">
                                    <Label htmlFor="password">Hasło</Label>
                                    <Input type="password" id="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <div className="w-full mt-4">
                                    <Button className="w-full" disabled={isSubmit}>Zaloguj</Button>
                                </div>
                                {
                                    error && (
                                        <div className="bg-red-500 p-2 rounded-md">
                                            {error}
                                        </div>
                                    )
                                }
                            </form>
                        </CardContent>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}