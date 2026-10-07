import { site, testimonials } from "@/data/site";

/** Structured data: AutoRental (a LocalBusiness subtype) + WebSite. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["AutoRental", "LocalBusiness"],
        "@id": `${site.url}/#business`,
        name: site.name,
        legalName: site.legalName,
        description: site.description,
        url: site.url,
        image: `${site.url}/opengraph-image`,
        logo: `${site.url}/icon.svg`,
        telephone: site.phone.replace(/\s/g, ""),
        email: site.email,
        priceRange: "$70 - $120 per day",
        currenciesAccepted: "AED",
        areaServed: { "@type": "City", name: "Dubai" },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Warehouse 4, 5th Street, Al Quoz 3",
          addressLocality: "Dubai",
          addressRegion: "Dubai",
          addressCountry: "AE",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: testimonials.rating.score,
          reviewCount: testimonials.rating.count,
          bestRating: 5,
        },
        sameAs: ["https://facebook.com", "https://linkedin.com", "https://twitter.com", "https://instagram.com"],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: "en",
        publisher: { "@id": `${site.url}/#business` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON-LD is static, server-rendered data; "<" is escaped to prevent script breakout.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
