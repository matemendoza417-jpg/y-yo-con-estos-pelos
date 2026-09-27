import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { BUSINESS, LOCATIONS, SITE_URL } from "@/lib/business";

export const Route = createFileRoute("/aviso-legal")({
  component: AvisoLegal,
  head: () => ({
    meta: [
      { title: `Aviso legal | ${BUSINESS.name}` },
      {
        name: "description",
        content: `Aviso legal de ${BUSINESS.name}, peluquería, barbería y estética unisex en Alcoi.`,
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/aviso-legal` }],
  }),
});

function AvisoLegal() {
  return (
    <LegalPage title="Aviso legal" updated="septiembre de 2026">
      <h2>1. Titular del sitio</h2>
      <p>
        Esta web corresponde al negocio <strong>{BUSINESS.name}</strong>, peluquería, barbería y
        estética unisex con dos locales en Alcoi:
      </p>
      <ul>
        <li>
          Local principal — {LOCATIONS[0].street}, {LOCATIONS[0].postalCode} {LOCATIONS[0].city},{" "}
          {LOCATIONS[0].phone}
        </li>
        <li>
          Segundo local — {LOCATIONS[1].street}, {LOCATIONS[1].postalCode} {LOCATIONS[1].city},{" "}
          {LOCATIONS[1].phone}
        </li>
      </ul>
      <p>
        El dominio de publicación es <strong>y-yo-con-estos-pelos.vercel.app</strong> y su titular
        es el desarrollador que ha realizado el diseño. La web se publica como{" "}
        <strong>propuesta de diseño</strong>: el negocio aún no es su titular y los datos fiscales
        están pendientes de confirmación por parte del propietario.
      </p>

      <h2>2. Identificación fiscal y domicilio fiscal</h2>
      <p>
        No se ha podido confirmar la forma jurídica del negocio ni su NIF/CIF en fuentes públicas,
        por lo que <strong>no se publica ningún número de identificación fiscal</strong>. El
        domicilio fiscal del titular deberá incorporarse antes de la publicación definitiva.
      </p>
      <p>
        Se hace constar que el negocio declara <strong>{BUSINESS.claim}</strong> y que forma parte de
        la red Beedigital.
      </p>

      <h2>3. Condiciones de uso</h2>
      <p>
        El acceso es libre. Navegar por el sitio implica aceptar estas condiciones. No se permite la
        reproducción ni la explotación de los contenidos sin autorización previa del titular.
      </p>

      <h2>4. Precios y servicios (art. 7 LSSI)</h2>
      <p>
        <strong>No se publica ninguna tarifa.</strong> El negocio no ha comunicado precios, así que
        esta web no los inventa. El presupuesto de cualquier servicio se confirma por teléfono o en
        el propio salón antes de prestarse.
      </p>
      <p>
        La relación de servicios que aparece en la sección «Servicios» es una{" "}
        <strong>propuesta pendiente de confirmación</strong>. El propietario debe validarla antes de
        que la web se publique de forma definitiva.
      </p>
      <p>
        El horario publicado es el que consta en el directorio del negocio y corresponde al local
        principal. El horario del segundo local no consta y no se ha estimado.
      </p>

      <h2>5. Responsabilidad</h2>
      <p>
        El titular no se hace responsable de los errores de los datos existentes en directorios de
        terceros ni de los daños derivados de un uso indebido de la información publicada sin
        contacto previo con el salón.
      </p>

      <h2>6. Propiedad intelectual y material de muestra</h2>
      <p>
        Los textos, el diseño y el código pertenecen a su autor. Las fotografías, los nombres del
        equipo, los trabajos de antes/después y las opiniones mostradas son{" "}
        <strong>material de muestra</strong> creado para esta propuesta. No corresponden a trabajos
        ni a clientes reales del negocio.
      </p>

      <h2>7. Legislación aplicable</h2>
      <p>
        Se rige por la legislación española. Cualquier controversia se someterá a los juzgados y
        tribunales que resulten competentes conforme a la normativa aplicable.
      </p>
    </LegalPage>
  );
}
