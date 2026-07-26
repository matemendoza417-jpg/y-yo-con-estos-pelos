import { createFileRoute } from "@tanstack/react-router";
import Home from "@/components/Home";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Y Yo Con Estos Pelos · Peluquería de autor en Alcoy" },
      {
        name: "description",
        content:
          "Estudio de peluquería en Alcoy especializado en balayage, color, rubios, correcciones y extensiones. Un color hecho a tu piel, no copiado.",
      },
      { property: "og:title", content: "Y Yo Con Estos Pelos · Peluquería de autor en Alcoy" },
      {
        property: "og:description",
        content:
          "Balayage, color, rubios, correcciones, extensiones y tratamientos premium en Alcoy.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});
