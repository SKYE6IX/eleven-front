import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Navigation from "@/components/navigation/Navigation";
import GsapWrapper from "@/context/GsapWrapper";
import "../../global-styles/globals.scss";

export const metadata: Metadata = {
   title: "Eleven Web Agency in Moscow",
   description: "We are web design agency located in Moscow.",
};
const fontMontreal = localFont({
   src: [
      {
         path: "../../../public/font/montreal/PPNeueMontreal-Bold.otf",
         weight: "800",
      },
      {
         path: "../../../public/font/montreal/PPNeueMontreal-Book.otf",
         weight: "400",
      },
      {
         path: "../../../public/font/montreal/PPNeueMontreal-Medium.otf",
         weight: "530",
      },
      {
         path: "../../../public/font/montreal/PPNeueMontreal-Thin.otf",
         weight: "200",
      },
   ],
   variable: "--font-montreal",
});

const fontMontrealItalic = localFont({
   src: [
      {
         path: "../../../public/font/montreal/PPNeueMontreal-Italic.otf",
         weight: "400",
      },
      {
         path: "../../../public/font/montreal/PPNeueMontreal-SemiBolditalic.otf",
         weight: "700",
      },
   ],
   variable: "--font-montreal-italic",
});

export function generateStaticParams() {
   return routing.locales.map((locale) => ({ locale }));
}
export default async function RootLayout({
   children,
   params,
}: Readonly<{
   children: React.ReactNode;
   params: Promise<{ locale: string }>;
}>) {
   const { locale } = await params;
   if (!hasLocale(routing.locales, locale)) {
      notFound();
   }
   setRequestLocale(locale);
   return (
      <html
         lang={locale}
         className={`${fontMontreal.variable} ${fontMontrealItalic.variable}`}
      >
         <body>
            <NextIntlClientProvider>
               <GsapWrapper>
                  <Navigation />
                  {children}
               </GsapWrapper>
            </NextIntlClientProvider>
         </body>
      </html>
   );
}
