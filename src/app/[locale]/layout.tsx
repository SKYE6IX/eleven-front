import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../global.scss";

export const metadata: Metadata = {
   title: "Eleven Web Agency in Moscow",
   description: "",
};

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
   return (
      <html lang={locale}>
         <body>
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
         </body>
      </html>
   );
}
