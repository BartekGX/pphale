"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import CryptoJS from "crypto-js";
import {useSession} from "next-auth/react";

export default function page() {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPassword2, setNewPassword2] = useState("")
    const [newLogin, setNewLogin] = useState("")
    const [success, setSuccess] = useState("")
    const [successL, setSuccessL] = useState("")
    const [error, setError] = useState("")
    const [errorL, setErrorL] = useState("")
    const [isSended, setIsSended] = useState(false)
    const { data: session } = useSession();

    const encryptPassword = (password, secretKey) => {
        return CryptoJS.AES.encrypt(password, secretKey).toString();
    };

    const send = async (e) => {
        e.preventDefault()
        setIsSended(true)
        if (newPassword.length < 5 || newPassword2.length < 5) {
            setError("Hasło musi zawierać przynajmniej 6 znaków")
            setTimeout(() => {
                setError("")
            }, 5000)
            return null
        }
            if (newPassword !== newPassword2) return null
        if (session) {
            const hashedPassword = encryptPassword(oldPassword, process.env.SECRET_KEY)
            const hashedNewPassword = encryptPassword(newPassword, process.env.SECRET_KEY)
            const hashedUser = encryptPassword(session.user.name, process.env.SECRET_KEY)
            setOldPassword("")
            setNewPassword("")
            setNewPassword2("")
            try {
                const res = await fetch("/api/chpass", {
                    method: "PUT",
                    body: JSON.stringify({value: [hashedPassword, hashedNewPassword, hashedUser]})
                })
                if (!res.ok) {
                    setError("Stare hasło jest niepoprawne")
                    setIsSended(false)
                    setTimeout(() => {
                        setError("")
                    }, 5000)
                    return null
                }
                setSuccess("Hasło zostało zaaktualizowane pomyślnie")
                setIsSended(false)
                setTimeout(() => {
                    setSuccess("")
                }, 8000)
                const info = res.json()

            } catch (e) {
                console.log(e)
            }
        }
    }

    const sendL = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch("/api/chlog", {
                method: "PUT",
                body: JSON.stringify({login: newLogin})
            })
            if (!res.ok) {
                setErrorL("Błąd podczas zmiany loginu")
                setTimeout(() => {
                    setErrorL("")
                }, 5000)
                return
            }
            const response = await res.json()
            setSuccessL(`Pomyślnie zmieniono login na: ${response.newLogin}`)

        } catch(e) {
            console.log(e)
        }
    }
    return (
        <div className="flex justify-center items-center py-20 gap-2 flex-col">
            <Card className="w-full max-w-[500px]">
                <CardHeader>
                    <CardTitle>
                        Zmiana hasła
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={send} className="flex flex-col gap-2">
                        <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
                            <Label htmlFor="password1">Stare hasło</Label>
                            <Input type="password" id="password1" placeholder="Hasło" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
                            <Label htmlFor="password2">Nowe hasło</Label>
                            <Input type="password" id="password2" placeholder="Hasło" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                        </div> 
                        <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
                            <Label htmlFor="password3">Nowe hasło</Label>
                            <Input type="password" id="password3" placeholder="Hasło" value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)}/>
                        </div>
                        <div>
                            <Button className="w-full" disabled={isSended}>Zmień hasło</Button>
                        </div>
                        {success && (
                            <div className="bg-green-500 text-center rounded-md">
                                {success}
                            </div>
                        )}
                        {error && (
                            <div className="bg-red-500 p-2 text-center rounded-md">
                                {error}
                            </div>
                        )}
                    </form>
                </CardContent>
            </Card>
            <Card className="w-full max-w-[500px]">
                <CardHeader>
                    <CardTitle>
                        Zmiana loginu
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={sendL} className="flex flex-col gap-2">
                        <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
                            <Label htmlFor="login">Nowy login</Label>
                            <Input type="text" id="login" placeholder="Login" value={newLogin} onChange={(e) => setNewLogin(e.target.value)}/>
                        </div>
                        <div>
                            <Button className="w-full" disabled={isSended}>Zmień login</Button>
                        </div>
                        {successL && (
                            <div className="bg-green-500 p-2 text-center rounded-md">
                                {successL}
                            </div>
                        )}
                        {errorL && (
                            <div className="bg-red-500 p-2 text-center rounded-md">
                                {errorL}
                            </div>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>

    )
}