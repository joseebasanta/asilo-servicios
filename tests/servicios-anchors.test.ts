// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from "vitest";
import { initAnchors } from "../src/scripts/servicios-anchors";

describe("servicios anchors", () => {
  beforeEach(() => {
    document.body.innerHTML = `<a id="l" href="#servicios">Servicios</a><a id="x" href="https://example.com">x</a><section id="servicios">s</section><main id="contenido">m</main><a id="logo" href="#contenido">logo</a>`;
    window.history.replaceState(null, "", "/");
    Element.prototype.scrollIntoView = vi.fn();
    window.scrollTo = vi.fn() as never;
    initAnchors();
  });

  it("scrolls to the section without writing the hash", () => {
    const section = document.getElementById("servicios")!;
    const event = new MouseEvent("click", { bubbles: true, cancelable: true, button: 0 });
    document.getElementById("l")!.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(section.scrollIntoView).toHaveBeenCalled();
    expect(section.getAttribute("tabindex")).toBe("-1");
    expect(window.location.hash).toBe("");
  });

  it("sends the logo link to the top of the page", () => {
    document.getElementById("logo")!.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, button: 0 }));
    expect(window.scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 0 }));
    expect(window.location.hash).toBe("");
  });

  it("ignores external links and unknown targets", () => {
    const event = new MouseEvent("click", { bubbles: true, cancelable: true, button: 0 });
    document.getElementById("x")!.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
  });
});
