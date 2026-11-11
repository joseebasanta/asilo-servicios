import { defineConfig } from "astro/config";
import { siteUrl } from "./src/site-url.mjs";

// Sitio estático: una sola página, sin servidor ni variables secretas.
export default defineConfig({
  site: siteUrl(),
  trailingSlash: "never",
});
