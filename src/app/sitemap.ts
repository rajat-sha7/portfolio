import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/projects";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    ...caseStudies.map((p) => ({ url: `${siteUrl}/projects/${p.id}`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}
