// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getJsonLd(message: Record<string, any>) {
   const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: message.SEO.jsonLd.name,
      url: "https://madebyeleven.com",
      logo: "/logo.png",
      description: message.SEO.jsonLd.description,
      founder: {
         "@type": "Person",
         name: "Busari Azeez Abiola",
      },
      foundingDate: "2025",
      address: {
         "@type": "PostalAddress",
         addressLocality: "Moscow",
         addressCountry: "Russia",
      },
      contactPoint: [
         {
            "@type": "ContactPoint",
            telephone: "+7-993-270-7338",
            contactType: "customer service",
            email: "hello.madebyeleven.com",
            availableLanguage: ["English", "Russian"],
         },
      ],
      sameAs: [
         "https://www.linkedin.com/company/pixelforge",
         "https://www.facebook.com/pixelforge",
         "https://twitter.com/pixelforge",
         "https://www.instagram.com/pixelforge",
      ],
      email: "hello.madebyeleven.com",
      telephone: "+7-993-270-7338",
      areaServed: [
         {
            "@type": "Global",
            name: "Word Wide",
         },
         {
            "@type": "Country",
            name: "Russia",
         },
      ],
      makesOffer: [
         {
            "@type": "Service",
            serviceType: message.SEO.jsonLd.services.webDesign.serviceType,
            name: message.SEO.jsonLd.services.webDesign.name,
            description: message.SEO.jsonLd.services.webDesign.description,
            provider: {
               "@type": "Organization",
               name: message.SEO.jsonLd.name,
            },
            areaServed: "Global",
            hasOfferCatalog: {
               "@type": "OfferCatalog",
               name: "Design Packages",
               itemListElement: [
                  {
                     "@type": "Offer",
                     position: 1,
                     item: {
                        "@type": "Service",
                        name: "Responsive Design",
                     },
                  },
                  {
                     "@type": "Offer",
                     position: 2,
                     item: {
                        "@type": "Service",
                        name: "Branding Integration",
                     },
                  },
               ],
            },
         },
         {
            "@type": "Service",
            serviceType: message.SEO.jsonLd.services.webDevelopment.serviceType,
            name: message.SEO.jsonLd.services.webDevelopment.name,
            description: message.SEO.jsonLd.services.webDevelopment.description,
            provider: {
               "@type": "Organization",
               name: message.SEO.jsonLd.name,
            },
            areaServed: "Global",
            hasOfferCatalog: {
               "@type": "OfferCatalog",
               name: "Development Services",
               itemListElement: [
                  {
                     "@type": "Offer",
                     position: 1,
                     item: {
                        "@type": "Service",
                        name: "E-commerce Development",
                     },
                  },
                  {
                     "@type": "Offer",
                     position: 2,
                     item: {
                        "@type": "Service",
                        name: "API Integration",
                     },
                  },
                  {
                     "@type": "Offer",
                     position: 3,
                     item: {
                        "@type": "Service",
                        name: "CMS Customization",
                     },
                  },
               ],
            },
         },
         {
            "@type": "Service",
            serviceType:
               message.SEO.jsonLd.services.seoOptimization.serviceType,
            name: message.SEO.jsonLd.services.seoOptimization.name,
            description:
               message.SEO.jsonLd.services.seoOptimization.description,
            provider: {
               "@type": "Organization",
               name: message.SEO.jsonLd.name,
            },
            areaServed: "Global",
            hasOfferCatalog: {
               "@type": "OfferCatalog",
               name: "SEO Packages",
               itemListElement: [
                  {
                     "@type": "Offer",
                     position: 1,
                     item: {
                        "@type": "Service",
                        name: "Keyword Research and On-Page SEO",
                     },
                  },
                  {
                     "@type": "Offer",
                     position: 2,
                     item: {
                        "@type": "Service",
                        name: "Technical SEO Audit",
                     },
                  },
               ],
            },
         },
         {
            "@type": "Service",
            serviceType:
               message.SEO.jsonLd.services.websiteMaintainace.serviceType,
            name: message.SEO.jsonLd.services.websiteMaintainace.name,
            description:
               message.SEO.jsonLd.services.websiteMaintainace.description,
            provider: {
               "@type": "Organization",
               name: message.SEO.jsonLd.name,
            },
            areaServed: "Global",
         },
      ],
   };
   return jsonLd;
}
