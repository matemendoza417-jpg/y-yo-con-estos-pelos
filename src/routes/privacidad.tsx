import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { BUSINESS, LOCATIONS, SITE_URL } from "@/lib/business";

export const Route = createFileRoute("/privacidad")({
  component: Privacidad,
  head: () => ({
    meta: [
      { title: `Política de privacidad | ${BUSINESS.name}` },
      {
        name: "description",
        content: `Política de privacidad de ${BUSINESS.name}, peluquería y estética en Alcoi.`,
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacidad` }],
  }),
});

function Privacidad() {
  return (
    <LegalPage title="Política de privacidad" updated="septiembre de 2026">
      <h2>1. Responsable del tratamiento</h2>
      <p>
        Responsable del tratamiento: <strong>{BUSINESS.name}</strong>, con dos locales en Alcoi.
        Para cualquier cuestión relacionada con datos personales, la vía más directa es el
        teléfono del local: {LOCATIONS[0].phone} ({LOCATIONS[0].street}) o {LOCATIONS[1].phone} (
        {LOCATIONS[1].street}).
      </p>
      <p>
        No se ha encontrado un correo electrónico de contacto del negocio, por lo que{" "}
        <strong>no se publica ninguno</strong>. Cuando se facilite, se incorporará a esta política.
      </p>
      <p>
        Esta versión de la web <strong>no tiene formulario de envío de datos</strong>: las
        consultas se tramitan por teléfono. Cuando se active un formulario real, se indicarán aquí el
        proveedor encargado del tratamiento y su ubicación.
      </p>

      <h2>2. Datos que se tratan</h2>
      <p>
        En esta versión no se recogen datos de carácter personal a través del sitio. Si en el futuro
        se incorpora un formulario de cita, los datos previstos serían: nombre, teléfono, correo
        electrónico y contenido de la consulta, además de datos de navegación agregados del
        alojamiento web.
      </p>

      <h2>3. Finalidad y base legal</h2>
      <table>
        <thead>
          <tr>
            <th>Finalidad</th>
            <th>Base legal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gestionar la cita solicitada y prestar el servicio.</td>
            <td>Medidas precontractuales y ejecución del contrato (art. 6.1.b RGPD).</td>
          </tr>
          <tr>
            <td>Facturación y libros de registro.</td>
            <td>Obligación legal (art. 6.1.c RGPD).</td>
          </tr>
          <tr>
            <td>Comunicaciones sobre el salón, si se autorizan.</td>
            <td>Consentimiento (art. 6.1.a RGPD), revocable en cualquier momento.</td>
          </tr>
        </tbody>
      </table>

      <h2>4. Conservación</h2>
      <p>
        Las consultas que no derivan en un servicio se conservan un máximo de 12 meses. Los datos
        asociados a facturas se conservan durante los plazos legales de prescripción fiscal y
        contable.
      </p>

      <h2>5. Destinatarios y transferencias</h2>
      <p>
        No se ceden ni se venden datos. Acceden a ellos el propio salón, el proveedor tecnológico que
        aloja el sitio —tratado como encargado del tratamiento conforme al art. 28 RGPD— y la
        administración pública cuando exista obligación legal. No hay transferencias
        internacionales de datos.
      </p>

      <h2>6. Derechos</h2>
      <ul>
        <li>Acceso, rectificación, supresión, limitación, oposición y portabilidad.</li>
        <li>Revocación del consentimiento en cualquier momento, sin efecto retroactivo.</li>
      </ul>
      <p>
        Para ejercerlos, llamar al local correspondiente o acudir al centro. Si la solicitud no se
        atiende correctamente, puede reclamar ante la Agencia Española de Protección de Datos
        (www.aepd.es).
      </p>

      <h2>7. Seguridad</h2>
      <p>
        Se aplican medidas técnicas y organizativas razonables frente a accesos no autorizados. Si se
        facilita información de salud, es preferible hacerlo de forma presencial en el local.
      </p>

      <h2>8. Cambios</h2>
      <p>
        Cualquier modificación se publicará en esta misma página indicando la nueva fecha de
        actualización.
      </p>
    </LegalPage>
  );
}
