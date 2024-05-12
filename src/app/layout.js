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
      <body className="font-tw">
              <main>
                  {children}
              </main>
      </body>
      </html>
  );
}
