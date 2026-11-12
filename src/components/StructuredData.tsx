import { projects } from "@/lib/projects";
import { site, siteUrl } from "@/lib/site";

// Structured data (schema.org JSON-LD). Not visible on the page: it tells
// search engines who the site is about and which projects it shows.
export default function StructuredData() {
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: `${site.name} – Portfolio`,
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        url: siteUrl,
        image: `${siteUrl}/avatar.png`,
        jobTitle: site.jobTitle,
        description: site.description,
        address: { "@type": "PostalAddress", addressCountry: site.country },
        sameAs: [site.linkedin, site.github],
        knowsAbout: site.skills,
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: site.title,
        description: site.description,
        inLanguage: "en",
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
        primaryImageOfPage: { "@type": "ImageObject", url: `${siteUrl}/opengraph-image` },
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#projects`,
        name: `Projects by ${site.name}`,
        numberOfItems: projects.length,
        itemListElement: projects.map((project, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "CreativeWork",
            name: project.title,
            description: project.description,
            url: project.demo,
            image: `${siteUrl}${project.image}`,
            keywords: project.stack.split(" · ").join(", "),
            // Own projects list Rajat as creator; client sites list him as a contributor
            ...(project.repo
              ? { creator: { "@id": personId }, sameAs: project.repo }
              : { contributor: { "@id": personId } }),
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // "<" is escaped so the data can never close the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
