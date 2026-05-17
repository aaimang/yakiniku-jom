/* ================================================
   course.js — Meal Set Recommender & Price Calculator
   ================================================

   PRICING STRATEGY:
   ─ Economies of scale: larger groups pay LESS per head
     Solo:       RM 68–128 / pax
     2 Pax:      RM 98–148 / pax
     3–6 Pax:    RM 78–108 / pax
     7–9 Pax:    RM 75–105 / pax  ← slightly cheaper, feels like a deal
     10–30 Pax:  RM 85–138 / pax  ← new tier, mid-range with VIP perks
     10+ (Anchor): RM 188 / pax   ← decoy anchor, makes RM 85–138 look great
   ─ Children = 50% of adult base price (simple, no database needed)
   ─ 10+ pax triggers a visible "VIP Perk Banner"
   ================================================ */

(function () {

    // ──────────────────────────────────────────────────
    // 1. ALL 10 MEAL SETS (vanilla JS array — no database!)
    // ──────────────────────────────────────────────────

    var SETS = [

        /* ── 1 PAX ── */
        {
            name:        "Solo Craving Set",
            paxLabel:    "1 Pax",
            minPax:      1,
            maxPax:      1,
            adultPrice:  68,
            image:       "images/course-solo.png",
            description: "A satisfying solo meal: marinated chicken thigh, garlic fried rice, miso soup, and house pickles.",
            items:       ["Garlic Sesame Chicken", "Garlic Fried Rice", "Miso Soup", "House Pickles"],
            badge:       null
        },
        {
            name:        "Solo Premium Wagyu",
            paxLabel:    "1 Pax",
            minPax:      1,
            maxPax:      1,
            adultPrice:  128,
            image:       "images/course-solo.png",
            description: "The premium solo experience: A5 wagyu slices, steamed rice, miso soup, edamame, and ponzu dip.",
            items:       ["Premium Wagyu Beef", "Steamed Rice", "Miso Soup", "Edamame", "Ponzu Dip"],
            badge:       null
        },

        /* ── 2 PAX ── */
        {
            name:        "Couple Date Night",
            paxLabel:    "2 Pax",
            minPax:      2,
            maxPax:      2,
            adultPrice:  98,
            image:       "images/course-couple.png",
            description: "A romantic spread for two: mixed beef platter, sesame chicken, shared sides, and two drinks.",
            items:       ["Mixed Beef Platter", "Garlic Sesame Chicken", "Edamame", "Miso Soup ×2", "2 Drinks"],
            badge:       null
        },
        {
            name:        "Prime Duo Platter",
            paxLabel:    "2 Pax",
            minPax:      2,
            maxPax:      2,
            adultPrice:  148,
            image:       "images/course-couple.png",
            description: "Premium for two: A5 wagyu & lamb chops, grilled vegetables, fried gyoza, and dessert.",
            items:       ["Premium Wagyu Beef", "Herb-Crusted Lamb Chops", "Grilled Vegetables", "Gyoza", "Dessert"],
            badge:       null
        },

        /* ── 3–6 PAX ── */
        {
            name:        "Family Feast",
            paxLabel:    "3–6 Pax",
            minPax:      3,
            maxPax:      6,
            adultPrice:  78,
            image:       "images/course-family.png",
            description: "A hearty family spread: mixed beef & chicken, grilled seafood, seasonal vegetables, rice, soup, and sides.",
            items:       ["Mixed Beef Platter", "Garlic Sesame Chicken", "Tiger Prawns", "Grilled Vegetables", "Rice & Soup", "Edamame"],
            badge:       null
        },
        {
            name:        "Friends Hangout Sizzle",
            paxLabel:    "3–6 Pax",
            minPax:      3,
            maxPax:      6,
            adultPrice:  108,
            image:       "images/course-family.png",
            description: "The ultimate hangout: premium wagyu, lamb chops, seafood platter, gyoza, tofu steak, and free-flow drinks.",
            items:       ["Premium Wagyu Beef", "Lamb Chops", "Seafood Platter", "Gyoza", "Sesame Tofu", "Free-Flow Drinks"],
            badge:       null
        },

        /* ── 7–9 PAX — cheaper per head than 3–6, better value ── */
        {
            name:        "Grand Party Platter",
            paxLabel:    "7–9 Pax",
            minPax:      7,
            maxPax:      9,
            adultPrice:  75,          // ↓ from 88 — economies of scale
            image:       "images/course-party.png",
            description: "Feed the whole crew at great value: generous mixed meats, seafood, vegetables, gyoza, karaage, rice, and soup for everyone.",
            items:       ["Mixed Beef & Chicken", "Seafood Platter", "Grilled Vegetables", "Gyoza & Karaage", "Rice & Soup", "Edamame & Pickles"],
            badge:       "Best Value"
        },
        {
            name:        "Emperor's Banquet",
            paxLabel:    "7–9 Pax",
            minPax:      7,
            maxPax:      9,
            adultPrice:  105,         // ↓ from 148 — better bulk pricing
            image:       "images/course-party.png",
            description: "The premium party experience: A5 wagyu, full seafood tower, herb lamb, all side dishes, and free-flow drinks.",
            items:       ["A5 Wagyu Selection", "Full Seafood Tower", "Herb-Crusted Lamb", "All Side Dishes", "Free-Flow Drinks", "Dessert Platter"],
            badge:       null
        },

        /* ── 10–30 PAX — new tier with VIP perks ── */
        {
            name:        "Jom Celebrate Package",
            paxLabel:    "10+ Pax",
            minPax:      10,
            maxPax:      30,
            adultPrice:  85,
            image:       "images/course-party.png",
            description: "Perfect for birthdays, reunions, and celebrations. Includes a dedicated grill station, complimentary anniversary dessert boat, and a free Wagyu Tasting Platter for the table.",
            items:       ["Mixed Beef & Chicken", "Seafood Platter", "Grilled Vegetables", "Gyoza & Karaage", "Rice & Soup", "Complimentary Wagyu Tasting Platter", "Dessert Boat", "Free-Flow Drinks"],
            badge:       "Most Popular"
        },
        {
            name:        "The Pavilion Royal Set",
            paxLabel:    "10+ Pax",
            minPax:      10,
            maxPax:      30,
            adultPrice:  188,         // anchor / decoy price — makes RM 85 look amazing
            image:       "images/course-party.png",
            description: "Our pinnacle experience: A5 Wagyu, Lobster Tail, Truffle Fried Rice, Private VIP Room, dedicated chef, and a curated 5-course dessert experience.",
            items:       ["A5 Wagyu Premium Cut", "Whole Lobster Tail", "Truffle Fried Rice", "Full Seafood Tower", "5-Course Dessert", "Private VIP Room", "Dedicated Chef", "Free-Flow Premium Drinks"],
            badge:       "Signature"
        }
    ];


    // ──────────────────────────────────────────────────
    // 2. GET HTML ELEMENTS
    // ──────────────────────────────────────────────────

    var adultsInput   = document.getElementById("adults-count");
    var childrenInput = document.getElementById("children-count");
    var adultsPlus    = document.getElementById("adults-plus");
    var adultsMinus   = document.getElementById("adults-minus");
    var childrenPlus  = document.getElementById("children-plus");
    var childrenMinus = document.getElementById("children-minus");
    var paxSummary    = document.getElementById("course-pax-summary");
    var resultsLabel  = document.getElementById("course-results-label");
    var grid          = document.getElementById("course-grid");
    var perkBanner    = document.getElementById("course-perk-banner");

    if (!grid) return; // only run on course.html


    // ──────────────────────────────────────────────────
    // 3. BUILD CARD HTML (runs once on page load)
    // ──────────────────────────────────────────────────

    function buildCards() {
        grid.innerHTML = "";

        SETS.forEach(function (set, index) {
            var card = document.createElement("div");
            card.className = "course-card fade-up";
            card.setAttribute("data-index", index);
            card.setAttribute("data-min", set.minPax);
            card.setAttribute("data-max", set.maxPax);

            // Build "includes" pill list
            var itemsHTML = set.items.map(function (item) {
                return "<li>" + item + "</li>";
            }).join("");

            // Optional corner badge (e.g. "Best Value", "Most Popular")
            var badgeHTML = set.badge
                ? '<span class="course-card-badge course-card-badge--' + set.badge.replace(/\s+/g, "-").toLowerCase() + '">' + set.badge + '</span>'
                : '<span class="course-card-badge">' + set.paxLabel + '</span>';

            card.innerHTML =
                '<div class="course-card-image-wrap">' +
                    '<img src="' + set.image + '" alt="' + set.name + '" class="course-card-image">' +
                    badgeHTML +
                '</div>' +
                '<div class="course-card-body">' +
                    '<h3>' + set.name + '</h3>' +
                    '<p class="course-card-desc">' + set.description + '</p>' +
                    '<div class="course-card-includes">' +
                        '<span class="course-includes-label">Includes:</span>' +
                        '<ul class="course-includes-list">' + itemsHTML + '</ul>' +
                    '</div>' +
                    '<div class="course-card-pricing">' +
                        '<div class="course-price-row">' +
                            '<span class="course-price-label">Per adult</span>' +
                            '<span class="course-price-value">RM ' + set.adultPrice + '</span>' +
                        '</div>' +
                        '<div class="course-price-row">' +
                            '<span class="course-price-label">Per child <em>(50% off)</em></span>' +
                            '<span class="course-price-value">RM ' + Math.round(set.adultPrice * 0.5) + '</span>' +
                        '</div>' +
                        '<div class="course-price-total-row">' +
                            '<span class="course-total-label">Your group total</span>' +
                            '<span class="course-total-value" id="course-total-' + index + '">RM 0</span>' +
                        '</div>' +
                    '</div>' +
                '</div>';

            grid.appendChild(card);
        });
    }


    // ──────────────────────────────────────────────────
    // 4. RECALCULATE — runs every time inputs change
    // ──────────────────────────────────────────────────

    function recalculate() {
        var adults   = parseInt(adultsInput.value,   10) || 1;
        var children = parseInt(childrenInput.value, 10) || 0;
        var totalPax = adults + children;

        // Update summary text
        paxSummary.innerHTML   = "Total: <strong>" + totalPax + " pax</strong>";
        resultsLabel.innerHTML = "Showing sets for <strong>" + totalPax + " pax</strong>";

        // ── VIP Perk Banner — show only when 10+ pax ──
        if (perkBanner) {
            if (totalPax >= 10) {
                perkBanner.hidden = false;
                // Update the pax count inside the banner
                var bannerPax = perkBanner.querySelector(".perk-banner-pax");
                if (bannerPax) {
                    bannerPax.textContent = totalPax + " pax";
                }
            } else {
                perkBanner.hidden = true;
            }
        }

        // ── Filter & price each card ──
        var cards        = grid.querySelectorAll(".course-card");
        var visibleCount = 0;

        cards.forEach(function (card) {
            var index = parseInt(card.getAttribute("data-index"), 10);
            var set   = SETS[index];

            if (totalPax >= set.minPax && totalPax <= set.maxPax) {
                card.style.display = "";
                visibleCount++;

                // Dynamic price calculation
                // Formula: (adults × adultPrice) + (children × adultPrice × 0.5)
                var childPrice  = Math.round(set.adultPrice * 0.5);
                var groupTotal  = (adults * set.adultPrice) + (children * childPrice);

                var totalEl = document.getElementById("course-total-" + index);
                if (totalEl) totalEl.textContent = "RM " + groupTotal;

            } else {
                card.style.display = "none";
            }
        });

        // Show "no results" message if nothing matches
        var noResults = document.getElementById("course-no-results");
        if (!noResults) {
            noResults = document.createElement("p");
            noResults.id = "course-no-results";
            noResults.className = "no-results";
            noResults.textContent = "No sets available for this group size. Please contact us directly!";
            grid.appendChild(noResults);
        }
        noResults.classList.toggle("visible", visibleCount === 0);
    }


    // ──────────────────────────────────────────────────
    // 5. STEPPER BUTTON WIRING
    // ──────────────────────────────────────────────────

    function clamp(val, min, max) {
        return Math.max(min, Math.min(max, val));
    }

    adultsPlus.addEventListener("click",    function () {
        adultsInput.value = clamp(parseInt(adultsInput.value, 10) + 1, 1, 30);
        recalculate();
    });
    adultsMinus.addEventListener("click",   function () {
        adultsInput.value = clamp(parseInt(adultsInput.value, 10) - 1, 1, 30);
        recalculate();
    });
    childrenPlus.addEventListener("click",  function () {
        childrenInput.value = clamp(parseInt(childrenInput.value, 10) + 1, 0, 30);
        recalculate();
    });
    childrenMinus.addEventListener("click", function () {
        childrenInput.value = clamp(parseInt(childrenInput.value, 10) - 1, 0, 30);
        recalculate();
    });


    // ──────────────────────────────────────────────────
    // 6. INITIALISE — default 2 adults, 0 children
    // ──────────────────────────────────────────────────

    buildCards();
    recalculate();

})();
