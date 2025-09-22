import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
   return [
      {
         url: "https://madebyeleven.com/en",
         lastModified: new Date(),
         changeFrequency: "daily",
         priority: 1,
      },
      {
         url: "https://madebyeleven.com/ru",
         lastModified: new Date(),
         changeFrequency: "daily",
         priority: 1,
      },
      {
         url: "https://madebyeleven.com/en/about",
         lastModified: new Date(),
         changeFrequency: "weekly",
         priority: 0.8,
      },
      {
         url: "https://madebyeleven.com/ru/about",
         lastModified: new Date(),
         changeFrequency: "weekly",
         priority: 0.8,
      },
      {
         url: "https://madebyeleven.com/en/work",
         lastModified: new Date(),
         changeFrequency: "weekly",
         priority: 0.8,
      },
      {
         url: "https://madebyeleven.com/ru/work",
         lastModified: new Date(),
         changeFrequency: "weekly",
         priority: 0.8,
      },
      {
         url: "https://madebyeleven.com/en/contact",
         lastModified: new Date(),
         changeFrequency: "weekly",
         priority: 0.8,
      },
      {
         url: "https://madebyeleven.com/ru/contact",
         lastModified: new Date(),
         changeFrequency: "weekly",
         priority: 0.8,
      },
   ];
}
