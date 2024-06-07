import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "P.P.HALE",
  description: "Producent konstrukcji stalowych",
};

export default function RootLayout({ children }) {
  return (
      <html lang="pl" className={inter.className}>
    <head>
    <Script 
      async 
      src="https://www.googletagmanager.com/gtag/js?id=G-0MZ6NF8EDV"
    ></Script>
    <Script id="google-analytics">
      {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'G-0MZ6NF8EDV');
    `}
</Script>
    </head>
      <body>
              <main>
                  {children}
              </main>
      </body>
      </html>
  );
}
