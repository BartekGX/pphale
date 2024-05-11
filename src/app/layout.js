import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "P.P.HALE",
  description: "Producent konstrukcji stalowych",
};

export default function RootLayout({ children }) {
  return (
      <html lang="pl" className={inter.className}>
      <Head>
          <title>P.P.HALE</title>
          <meta name='description' content="Producent konstrukcji stalowych"/>
          <link rel="icon" href="/pphalelogomin.svg"/>
      </Head>
      <body className="font-tw">
              <main>
                  {children}
              </main>
      </body>
      </html>
  );
}
