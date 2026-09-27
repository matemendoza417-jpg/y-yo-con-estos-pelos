import { createFileRoute } from "@tanstack/react-router";
import Home from "@/components/Home";
import { BUSINESS, LOCATIONS, SITE_URL } from "@/lib/business";

const TITLE = `${BUSINESS.name} · Peluquería, barbería y estética en Alcoi`;
const DESCRIPTION = `${BUSINESS.name}: peluquería, barbería y estética unisex en Alcoi. ${BUSINESS.claim}. Dos locales en Alcoi: Calle Juan de Juanes, 17 y Avenida Hispanidad, 61. Tel. 966 52 25 62.`;

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: TITLE },
      {
        name: "description",
        content: DESCRIPTION,
      },
      {
        name: "keywords",
        content:
          "peluquería Alcoi, barbería Alcoi, estética Alcoi, peluquería Alcoy, barbería Alcoy, estética Alcoy, Juan de Juanes Alcoi, Avenida Hispanidad Alcoi",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_ES" },
      { property: "og:url", content: `${SITE_URL}/` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": ["HairSalon", "HealthAndBeautyBusiness", "LocalBusiness"],
              "@id": `${SITE_URL}/#negocio`,
              name: BUSINESS.name,
              description: DESCRIPTION,
              url: `${SITE_URL}/`,
              slogan: BUSINESS.slogan,
              telephone: "+34966522562",
              address: {
                "@type": "PostalAddress",
                streetAddress: LOCATIONS[0].street,
                postalCode: LOCATIONS[0].postalCode,
                addressLocality: LOCATIONS[0].city,
                addressRegion: LOCATIONS[0].region,
                addressCountry: "ES",
              },
              hasMap: `https://www.google.com/maps/search/?api=1&query=${LOCATIONS[0].mapsQuery}`,
              // Horario verificado del local principal (Páginas Amarillas).
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
                  opens: "10:00",
                  closes: "20:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Friday",
                  opens: "09:00",
                  closes: "20:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "08:00",
                  closes: "14:00",
                },
              ],
              // Sin aggregateRating: no hay nota ni nº de reseñas confirmado.
              // Sin priceRange: el negocio no publica precios.
              // Sin email: no hay email verificable.
              // Sin geo: coordenadas no confirmadas.
              sameAs: [BUSINESS.social[0].href, BUSINESS.social[1].href],
            },
            {
              "@type": "LocalBusiness",
              "@id": `${SITE_URL}/#local-2`,
              name: `${BUSINESS.name} — Avenida Hispanidad`,
              parentOrganization: { "@id": `${SITE_URL}/#negocio` },
              telephone: "+34965335982",
              address: {
                "@type": "PostalAddress",
                streetAddress: LOCATIONS[1].street,
                postalCode: LOCATIONS[1].postalCode,
                addressLocality: LOCATIONS[1].city,
                addressRegion: LOCATIONS[1].region,
                addressCountry: "ES",
              },
              hasMap: `https://www.google.com/maps/search/?api=1&query=${LOCATIONS[1].mapsQuery}`,
              // El horario del segundo local no consta: no se publica.
            },
          ],
        }),
      },
    ],
  }),
});
