/*
 * Datos de "Y Yo Con Estes Pelos" — peluquería, barbería y estética unisex en Alcoi.
 *
 * REGLA: aquí solo entra lo verificado por al menos dos fuentes públicas.
 *  · Dos locales: confirmado por la ficha de Google Play de la app del negocio
 *    ("son dos salones de peluquería ubicados en Alcoy") y por Páginas Amarillas.
 *  · "+ de 20 años": dato literal de Páginas Amarillas.
 *  · Horario: literal de Páginas Amarillas, correspondiente al local principal.
 *  · Formas de pago, redes y pertenencia a la red Beedigital: Páginas Amarillas.
 *
 * NO se inventa: email, WhatsApp, precios, notas de reseñas, nombres del equipo.
 */
export const BUSINESS = {
  name: "Y Yo Con Estes Pelos",
  tagline: "Peluquería, barbería y estética unisex en Alcoi",
  claim: "Más de 20 años",
  claimSource: "Páginas Amarillas",
  /** Eslogan literal del negocio. */
  slogan: "Para tí… TODO en un MISMO lugar",
  promise: "Estudiamos tu imagen. Tratamientos capilares.",
  /** No se ha encontrado WhatsApp oficial: el CTA es llamar. */
  whatsapp: null,
  social: [
    { label: "Instagram", href: "https://www.instagram.com/yyoconestospelos/" },
    { label: "Facebook", href: "https://www.facebook.com/yyoconestospelos.alcoy" },
  ],
  payment: ["MasterCard", "Visa", "Diners Club", "4B", "Euroseismil"],
} as const;

export type Location = {
  id: string;
  name: string;
  street: string;
  postalCode: string;
  city: string;
  region: string;
  phone: string;
  phoneHref: string;
  mapsQuery: string;
  /** Horario verificado. El del local 2 no consta: no se inventa. */
  hours: { days: string; hours: string }[] | null;
  hoursNote?: string;
};

const ALCOI = { city: "Alcoi", region: "Alicante" } as const;

export const LOCATIONS: Location[] = [
  {
    id: "juan-de-juanes",
    name: "Local principal",
    street: "Calle Juan de Juanes, 17 BAJO",
    postalCode: "03802",
    ...ALCOI,
    phone: "966 52 25 62",
    phoneHref: "tel:+34966522562",
    mapsQuery: "Calle+Juan+de+Juanes,+17,+03802+Alcoi,+Alicante",
    // Literal de Páginas Amarillas.
    hours: [
      { days: "Lunes", hours: "10:00 – 20:00" },
      { days: "Martes", hours: "10:00 – 20:00" },
      { days: "Miércoles", hours: "10:00 – 20:00" },
      { days: "Jueves", hours: "10:00 – 20:00" },
      { days: "Viernes", hours: "09:00 – 20:00" },
      { days: "Sábado", hours: "08:00 – 14:00" },
      { days: "Domingo", hours: "Cerrado" },
    ],
  },
  {
    id: "hispanidad",
    name: "Segundo local",
    street: "Avenida Hispanidad, 61",
    postalCode: "03804",
    ...ALCOI,
    phone: "965 33 59 82",
    phoneHref: "tel:+34965335982",
    mapsQuery: "Avenida+Hispanidad,+61,+03804+Alcoi,+Alicante",
    hours: null,
    hoursNote: "Horario no publicado todavía — confírmalo al llamar",
  },
];

export const MAIN = LOCATIONS[0];

export const SITE_URL = "https://y-yo-con-estos-pelos.vercel.app";

export const mapsSearch = (l: Location) =>
  `https://www.google.com/maps/search/?api=1&query=${l.mapsQuery}`;
export const mapsDirections = (l: Location) =>
  `https://www.google.com/maps/dir/?api=1&destination=${l.mapsQuery}`;
export const mapsEmbed = (l: Location) =>
  `https://maps.google.com/maps?q=${l.mapsQuery}&hl=es&z=16&output=embed`;
