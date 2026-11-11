# Asilo Digital — Servicios

Landing de servicios de diseño UX/UI de Asilo Digital. Es un sitio estático de una sola página hecho con
Astro, TypeScript y CSS sin frameworks. Se separó del repo `asilo-talent-network`, donde vivía en `/servicios`
y donde queda su historial anterior.

## Comandos

Requiere Node 22.12 o superior y pnpm.

| Comando | Qué hace |
| --- | --- |
| `pnpm install` | Instala las dependencias |
| `pnpm dev` | Servidor local en `http://localhost:4321` |
| `pnpm test` | Tests (Vitest) |
| `pnpm check` | Revisión de tipos (Astro) |
| `pnpm build` | Genera el sitio en `dist/` |
| `pnpm preview` | Sirve `dist/` en local |

## Estructura

- `src/pages/index.astro`: la página; monta una sección por componente.
- `src/components/servicios/`: Nav, Hero, El problema, Servicios, Cómo trabajamos, Proyectos, Testimonios,
  CTA final y Footer.
- `src/data/servicios.ts`: todo el copy, links e imágenes de la página.
- `src/scripts/servicios-*.ts`: animaciones e interacciones (píxeles del hero, íconos que se dibujan, videos
  de proyectos, carrusel, pestañas, menú móvil, grilla de puntos del CTA). Todas respetan
  `prefers-reduced-motion`.
- `src/styles/servicios.css`: estilos y tokens de la página; `src/styles/fonts.css`: fuente Switzer.
- `public/servicios/`: logos de clientes, imágenes y videos de proyectos, íconos y testimonios.
- `tests/`: tests de la página y de cada script.

## Publicación (Vercel)

En Vercel: **Add New → Project**, importar este repo y **Deploy**. Astro se detecta solo y no hace falta
ninguna variable de entorno.

El enlace canónico y la imagen para compartir usan el dominio de producción que Vercel entrega en el build
(`VERCEL_PROJECT_PRODUCTION_URL`). Para forzar otro dominio, definir `SITE_URL` (por ejemplo
`https://servicios.asilodigital.com`). Ver `src/site-url.mjs`.

## Imágenes y videos

- Imágenes de proyectos en WebP, a 2× del tamaño en que se muestran.
- Videos en MP4 H.264, sin audio, 960×720.
- No subir originales pesados ni archivos de escritorio de fuentes.
