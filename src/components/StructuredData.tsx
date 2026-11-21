import JsonLd from "@/components/JsonLd";
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
        disambiguatingDescription: site.bio[0],
        hasOccupation: {
          "@type": "Occupation",
          name: site.jobTitle,
          skills: site.skills.join(", "),
        },
        // What he can be hired for
        makesOffer: site.services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, description: s.description, provider: { "@id": personId } },
        })),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "project enquiries",
          url: `${siteUrl}/#contact`,
          availableLanguage: "English",
        },
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
            // Personal projects have their own page; client projects stay unlinked
            url: project.repo ? `${siteUrl}/projects/${project.id}` : undefined,
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

  return <JsonLd data={graph} />;
}
