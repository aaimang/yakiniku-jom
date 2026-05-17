/* ================================================
   app.js — Yakiniku Jom
   ================================================ */

document.addEventListener("DOMContentLoaded", function () {

    // ── 1. NAV: add .scrolled class on scroll (for transparent → frosted transition) ──
    var header = document.getElementById("site-header");
    if (header && !header.classList.contains("scrolled")) {
        window.addEventListener("scroll", function () {
            header.classList.toggle("scrolled", window.scrollY > 40);
        }, { passive: true });
    }

    // ── 2. TYPEWRITER (index.html hero) ──────────────────────────────────────
    var typewriterEl = document.getElementById("hero-typewriter");
    if (typewriterEl) {
        var phrases = [
            "A night to remember.",
            "Grilled to perfection.",
            "Flavours of Japan.",
            "Your table awaits."
        ];
        var phraseIndex  = 0;
        var charIndex    = 0;
        var isDeleting   = false;
        var pauseTicks   = 0;

        var cursor = typewriterEl.querySelector(".typewriter-cursor");

        function tick() {
            var current = phrases[phraseIndex];

            if (!isDeleting && charIndex <= current.length) {
                var textNode = typewriterEl.childNodes[0];
                if (!textNode || textNode.nodeType !== Node.TEXT_NODE) {
                    textNode = document.createTextNode("");
                    typewriterEl.insertBefore(textNode, cursor);
                }
                textNode.nodeValue = current.slice(0, charIndex);
                charIndex++;

                if (charIndex > current.length) {
                    pauseTicks = 28; // hold at full phrase
                    isDeleting = true;
                }
                setTimeout(tick, 72);

            } else if (isDeleting) {
                if (pauseTicks > 0) { pauseTicks--; setTimeout(tick, 50); return; }

                var textNode = typewriterEl.childNodes[0];
                if (textNode && textNode.nodeType === Node.TEXT_NODE) {
                    textNode.nodeValue = current.slice(0, charIndex);
                }
                charIndex--;

                if (charIndex < 0) {
                    isDeleting  = false;
                    charIndex   = 0;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(tick, 400); // pause before next phrase
                    return;
                }
                setTimeout(tick, 38);
            }
        }

        setTimeout(tick, 900); // initial delay after page load
    }

    // ── 3. SCROLL FADE-UP ANIMATION ─────────────────────────────────────────
    var fadeEls = document.querySelectorAll(".fade-up");

    if (fadeEls.length > 0 && "IntersectionObserver" in window) {
        var fadeObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        fadeEls.forEach(function (el) { fadeObserver.observe(el); });
    } else {
        fadeEls.forEach(function (el) { el.classList.add("visible"); });
    }

    // ── 4. SCROLL-BASED NAV HIGHLIGHT (index.html) ───────────────────────────
    var sections = document.querySelectorAll("section[data-nav]");
    var navLinks = document.querySelectorAll(".nav-link[data-section]");

    if (sections.length > 0 && navLinks.length > 0) {
        var navObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var id = entry.target.getAttribute("data-nav");
                    navLinks.forEach(function (link) {
                        link.classList.toggle("active", link.getAttribute("data-section") === id);
                    });
                }
            });
        }, { threshold: 0.4 });

        sections.forEach(function (s) { navObserver.observe(s); });
    }

    // ── 5. MENU FILTER ───────────────────────────────────────────────────────
    var filterButtons = document.querySelectorAll(".filter-btn");
    var menuCards     = document.querySelectorAll(".menu-card");
    var noResults     = document.getElementById("no-results");

    if (filterButtons.length > 0) {
        filterButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                var chosen = button.getAttribute("data-filter");

                filterButtons.forEach(function (btn) { btn.classList.remove("active"); });
                button.classList.add("active");

                var visibleCount = 0;
                menuCards.forEach(function (card) {
                    var tags = card.getAttribute("data-tags");
                    var show = chosen === "all" || tags.includes(chosen);
                    card.style.display = show ? "" : "none";
                    if (show) visibleCount++;
                });

                if (noResults) {
                    noResults.classList.toggle("visible", visibleCount === 0);
                }
            });
        });
    }

});
