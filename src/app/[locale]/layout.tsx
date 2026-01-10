/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Script from "next/script";
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
         canonical: "https://madebyeleven.com/en",
         languages: {
            ru: "https://madebyeleven.com/ru",
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
         url: "https://madebyeleven.com",
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
      verification: {
         yandex: "baad47f133889d85",
         google: "Md3pJr-_1FEuP5-nCIrtDOFVdN49RxqWjbxdG_9bVTM",
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
            <Script
               id="yandex-metrica"
               strategy="afterInteractive"
               dangerouslySetInnerHTML={{
                  __html: `
                     <!-- Yandex.Metrika counter -->
    (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=104241852', 'ym');
    ym(104241852, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
<!-- /Yandex.Metrika counter -->
            `,
               }}
            />
            <script
               type="application/ld+json"
               dangerouslySetInnerHTML={{
                  __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
               }}
            />
            <noscript>
               <div>
                  <img
                     src="https://mc.yandex.ru/watch/104241852"
                     style={{ position: "absolute", left: "-9999px" }}
                     alt=""
                  />
               </div>
            </noscript>
         </body>
      </html>
   );
}
