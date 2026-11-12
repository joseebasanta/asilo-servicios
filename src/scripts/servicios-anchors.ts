// Atajos internos (#servicios, #contenido…): llevan a la sección sin dejar el "#algo" en la barra de direcciones.
// Se cancela la navegación del enlace, se hace scroll a la sección (suave salvo con reducción de movimiento) y se
// pasa el foco a ella para teclado y lectores de pantalla. Sin JS el enlace funciona como ancla normal.

export function initAnchors(doc: Document = document, win: Window & typeof globalThis = window): void {
  doc.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;
    const id = decodeURIComponent((link.getAttribute("href") ?? "").slice(1));
    if (!id) return;
    const target = doc.getElementById(id);
    if (!target) return;

    event.preventDefault();
    const reduce = win.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const behavior = reduce ? "auto" : "smooth";
    // "#contenido" es el logo y el "volver al inicio": va al tope real de la página, no al inicio del <main>.
    if (id === "contenido") win.scrollTo({ top: 0, behavior });
    else target.scrollIntoView({ behavior, block: "start" });
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    // Si ya había un hash (enlace compartido o recarga), se limpia.
    if (win.location.hash) win.history.replaceState(null, "", win.location.pathname + win.location.search);
  });

  if (win.location.hash) win.history.replaceState(null, "", win.location.pathname + win.location.search);
}
