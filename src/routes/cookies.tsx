import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { BUSINESS, SITE_URL } from "@/lib/business";

export const Route = createFileRoute("/cookies")({
  component: Cookies,
  head: () => ({
    meta: [
      { title: `Política de cookies | ${BUSINESS.name}` },
      {
        name: "description",
        content: `Política de cookies del sitio web de ${BUSINESS.name}, peluquería y estética en Alcoi.`,
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/cookies` }],
  }),
});

function Cookies() {
  return (
    <LegalPage title="Política de cookies" updated="septiembre de 2026">
      <h2>1. Qué son las cookies</h2>
      <p>
        Son archivos que un sitio guarda en el navegador para recordar datos de la visita. Las
        cookies técnicas son imprescindibles para que la web funcione; las de analítica, publicidad o
        redes sociales necesitan consentimiento previo.
      </p>

      <h2>2. Cookies que utiliza este sitio</h2>
      <table>
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Finalidad</th>
            <th>¿Consentimiento?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Técnicas</strong>
            </td>
            <td>Necesarias para el funcionamiento de la página. No requieren consentimiento.</td>
            <td>No</td>
          </tr>
          <tr>
            <td>
              <strong>Analítica</strong>
            </td>
            <td>Medir de forma agregada el uso del sitio. Pendiente de activación.</td>
            <td>Sí</td>
          </tr>
          <tr>
            <td>
              <strong>Publicidad / redes</strong>
            </td>
            <td>No se utilizan en esta versión.</td>
            <td>Sí</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Estado actual:</strong> esta versión no instala cookies de analítica ni de
        publicidad. El banner de consentimiento se añadirá en cuanto se active alguna.
      </p>

      <h2>3. Servicios de terceros</h2>
      <p>
        El sitio incrusta un mapa de Google Maps para mostrar la ubicación de cada local y carga las
        tipografías desde Google Fonts. Esos servicios pueden registrar la conexión desde el
        navegador de quien visita la web y tienen sus propias políticas de privacidad. Google publica
        su política de cookies en el siguiente enlace:
        https://policies.google.com/technologies/cookies
      </p>
      <p>
        También se enlazan los perfiles de Instagram y Facebook del negocio. Esos enlaces no
        instalan cookies por sí mismos: abren la red social correspondiente.
      </p>

      <h2>4. Cómo gestionarlas</h2>
      <ul>
        <li>Chrome o Edge: icono de bloqueo junto a la dirección → Cookies y datos de sitios.</li>
        <li>Firefox: menú → Privacidad y seguridad → Cookies y datos de sitios.</li>
        <li>Safari: Ajustes → Privacidad → Administrar datos de sitios web.</li>
      </ul>
      <p>
        Si bloqueas las cookies necesarias, alguna función puede no responder. El resto del sitio
        seguirá siendo accesible.
      </p>

      <h2>5. Cambios</h2>
      <p>
        Esta política se actualizará cuando se active cualquier cookie nueva. La fecha aparece al
        inicio de la página.
      </p>
    </LegalPage>
  );
}
