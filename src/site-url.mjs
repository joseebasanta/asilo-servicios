// URL pública del sitio, usada para el enlace canónico y la imagen al compartir.
// Orden: SITE_URL (si se define a mano) → dominio de producción que Vercel da en el build → local.
/** @param {Record<string, string | undefined>} env */
export function siteUrl(env = process.env) {
  if (env.SITE_URL) return env.SITE_URL.replace(/\/$/, "");
  if (env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:4321";
}
