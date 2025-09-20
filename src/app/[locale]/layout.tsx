import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import {
   setRequestLocale,
   getTranslations,
   getMessages,
} from "next-intl/server";
import { routing } from "@/i18n/routing";
import Navigation from "@/components/navigation/Navigation";
import GsapWrapper from "@/context/GsapWrapper";
import { getJsonLd } from "@/utils/getJsonLd";
import "../../global-styles/globals.scss";

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

export async function generateMetadata({
   params,
}: {
   params: { locale: string };
}): Promise<Metadata> {
   const { locale } = await params;
   const t = await getTranslations({ locale, namespace: "SEO" });
   return {
      title: `${t("metaData.title")}`,
      description: t("metaData.description"),
      metadataBase: new URL("https://madebyeleven.com"),
      alternates: {
         canonical: "https://madebyeleven.com",
         languages: {
            en: "https://madebyeleven.com/en",
            zh: "https://madebyeleven.com/ru",
         },
      },
      robots: {
         index: true,
         follow: true,
         nocache: true,
         googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
         },
      },
      openGraph: {
         title: `${t("metaData.title")}`,
         description: t("metaData.description"),
         url: "",
         siteName: "Eleven",
         images: [
            {
               url: "/og_image.webp",
               width: 1200,
               height: 630,
               alt: "Eleven Web Development Agency Portfolio",
            },
         ],
         type: "website",
         locale: locale,
      },
      twitter: {
         title: `${t("metaData.title")}`,
         description: t("metaData.description"),
         images: [
            {
               url: "/og_image.webp",
               width: 1200,
               height: 630,
               alt: "Eleven Web agency portfolio",
            },
         ],
      },
   };
}

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
   const message = await getMessages({ locale: locale });
   const jsonLd = getJsonLd(message);
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
            <script
               type="application/ld+json"
               dangerouslySetInnerHTML={{
                  __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
               }}
            />
         </body>
      </html>
   );
}
