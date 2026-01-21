/* =========================
   Main JS (overwrite-ready)
   - Drawer / Burger
   - Scroll Reveal for .reveal-item + .js-reveal
   - Back to top
   ========================= */

(() => {
  "use strict";

  /* ---------- Drawer / Burger ---------- */
  const burger = document.querySelector(".burger");
  const drawer = document.querySelector(".drawer");

  function setMenu(open) {
    if (!burger || !drawer) return;

    burger.classList.toggle("is-open", open);
    drawer.classList.toggle("is-open", open);

    burger.setAttribute("aria-expanded", String(open));
    drawer.setAttribute("aria-hidden", String(!open));

    document.body.style.overflow = open ? "hidden" : "";
  }

  if (burger && drawer) {
    burger.addEventListener("click", () => {
      const open = !burger.classList.contains("is-open");
      setMenu(open);
    });

    drawer.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (link) setMenu(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMenu(false);
    });
  }

  /* ---------- Scroll Reveal ---------- */
  const revealItems = Array.from(document.querySelectorAll(".reveal-item"));
  const jsRevealItems = Array.from(document.querySelectorAll(".js-reveal"));

  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    revealItems.forEach((el) => el.classList.add("is-visible"));
    jsRevealItems.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((el) => el.classList.add("is-visible"));
    jsRevealItems.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");

        if (entry.target.classList.contains("js-reveal")) {
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  revealItems.forEach((el) => io.observe(el));
  jsRevealItems.forEach((el) => io.observe(el));
})();

/* ---------- Back to top ---------- */
(() => {
  const btn = document.querySelector(".to-top");
  if (!btn) return;

  const toggle = () => {
    btn.classList.toggle("is-show", window.scrollY > 600);
  };

  toggle();
  window.addEventListener("scroll", toggle, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
