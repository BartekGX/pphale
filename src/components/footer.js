import Link from "next/link";

export default function Footer() {
    return (
        <div className="w-full border-t-2 md:p-5 p-2 grid md:grid-cols-2 grid-cols-1 font-TwCenMTCondensed border-gray-700">
            <div className="w-full flex md:justify-center">
                <div className="md:mx-auto">
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2">
                            <div>
                                <p className="text-2xl">P.P.Hale Piotr Wójcik</p>
                            </div>
                            <div>
                                <p className="text-2xl">+48 602 22 00 44</p>
                                <p className="text-2xl">+48 752 37 00 37</p>
                            </div>
                        </div>
                        <Link href="https://maps.app.goo.gl/3SB5pTGPmCTKRHkR7" target="_blank">
                            <div className="flex items-center gap-1 hover:text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pin-map-fill" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8z"/>
                                    <path fillRule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"/>
                                </svg>
                                <p className="md:text-2xl text-xl">Tulipanowa 2b 96-200 Rawa Mazowiecka</p>
                            </div>
                        </Link>
                        <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
                            </svg>
                            <p className="md:text-2xl text-xl">pphale@o2.pl</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex md:justify-center">
                <div className="flex flex-col gap-1">
                    <Link href="https://www.facebook.com/pphalewojcik/" target="_blank"><div className="flex items-center gap-1 hover:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                        </svg>
                        <p className="md:text-2xl text-xl">P.P.HALE</p>
                    </div></Link>
                    <Link href="https://www.facebook.com/pphalerawa/" target="_blank"><div className="flex items-center gap-1 hover:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                        </svg>
                        <p className="md:text-2xl text-xl">Konstrukcje Stalowe</p>
                    </div></Link>
                </div>
            </div>
        </div>
    )
}