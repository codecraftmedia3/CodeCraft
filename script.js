
/* =========================
   LOADER + GLOBAL STATE
========================= */
const loader = document.getElementById("loader");

/* =========================
   CLICK SOUND SYSTEM
========================= */
const clickSound = new Audio(
  "https://assets.mixkit.co/sfx/preview/mixkit-light-click-button-1114.mp3"
);
clickSound.volume = 0.3;

/* =========================
   WAIT FOR FULL LOAD FIRST
========================= */
window.addEventListener("load", () => {

  // footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ensure loader always shows then exits cleanly
  setTimeout(() => {
    if (loader) loader.classList.add("hide");

    startAnimations(); // ONLY START AFTER LOAD

  }, 700);
});

/* =========================
   MAIN APP START
========================= */
function startAnimations() {

  const sections = document.querySelectorAll(".container");
  const navLinks = document.querySelectorAll(".side-nav a");

  /* ================= HERO ================= */
  const heroTitle = document.querySelector(".hero h1");
  const heroSub = document.querySelector(".hero h2");

  setTimeout(() => heroTitle?.classList.add("show"), 200);
  setTimeout(() => heroSub?.classList.add("show"), 500);

  /* ================= OBSERVER (FORWARD + REVERSE) ================= */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {

        const section = entry.target;
        const id = section.id;

        if (entry.isIntersecting) {

          // ENTER VIEW
          section.classList.add("show");

          // NAV ACTIVE
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + id
            );
          });

          // CARD STAGGER
          const cards = section.querySelectorAll(".detail-content");

          cards.forEach((card, i) => {
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, i * 120);
          });

        } else {

          // EXIT VIEW (REVERSE ANIMATION)
          section.classList.remove("show");
        }
      });
    },
    {
      threshold: 0.35
    }
  );

  sections.forEach((sec) => {
    sec.classList.remove("show");
    observer.observe(sec);
  });

  /* ================= SCROLL PROGRESS LINE ================= */
  window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;

    const progress = (scrollTop / docHeight) * 100;

    const nav = document.querySelector(".side-nav");

    if (nav) {
      nav.style.setProperty("--progress", progress + "%");
    }
  });

  /* ================= CLICK SOUND ================= */
  document.addEventListener("click", (e) => {

    const isClickable =
      e.target.tagName === "A" ||
      e.target.closest("button");

    if (isClickable) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
  });

  /* ================= PROJECT FILTER ================= */
  const categoryButtons = document.querySelectorAll(".projects-nav button");
  const categorySections = document.querySelectorAll(".project-section");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;

      categoryButtons.forEach((btn) =>
        btn.classList.toggle("active", btn === button)
      );

      categorySections.forEach((section) => {
        section.classList.toggle(
          "active",
          section.dataset.category === category
        );
      });
    });
  });
}
