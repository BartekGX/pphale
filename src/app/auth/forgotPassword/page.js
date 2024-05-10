"use client"

import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useState} from "react";

export default function page() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [email, setEmail] = useState("")

    const handleSubmit = async () => {

    }
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-950">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Przywracanie hasła
                    </CardTitle>
                </CardHeader>
                    <CardContent>
                        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div>
                                <Button className="w-full" disabled={isSubmitting}>{isSubmitting ? "Proszę czekać...": "Przywróć hasło"}</Button>
                            </div>
                        </form>
                        <div className="mt-5 text-gray-400">
                           <p>powrót do <Link href="/login" className="underline">logowania</Link></p>
                        </div>
                    </CardContent>
            </Card>
        </div>
    )
}