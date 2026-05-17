/* ================================================
   chef.js — Interactive Chef Character
   ================================================ */
(function () {

    /* ── SVG markup ── */
    var SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 200" width="90" height="150">
  <!-- Shadow -->
  <ellipse cx="60" cy="196" rx="28" ry="6" fill="rgba(0,0,0,0.25)"/>

  <!-- Legs -->
  <rect x="42" y="148" width="14" height="36" rx="6" fill="#1a1a2e"/>
  <rect x="64" y="148" width="14" height="36" rx="6" fill="#1a1a2e"/>
  <!-- Shoes -->
  <ellipse cx="49" cy="184" rx="10" ry="5" fill="#111"/>
  <ellipse cx="71" cy="184" rx="10" ry="5" fill="#111"/>

  <!-- Body / Chef coat -->
  <rect x="34" y="100" width="52" height="54" rx="10" fill="#f0ede6"/>
  <!-- Coat lapels -->
  <path d="M60 104 L48 112 L55 160 L60 155 L65 160 L72 112 Z" fill="#ddd8ce"/>
  <!-- Buttons -->
  <circle cx="60" cy="118" r="2.2" fill="#C9973A"/>
  <circle cx="60" cy="128" r="2.2" fill="#C9973A"/>
  <circle cx="60" cy="138" r="2.2" fill="#C9973A"/>
  <!-- Neckerchief -->
  <path d="M52 103 Q60 114 68 103 Q64 100 60 101 Q56 100 52 103Z" fill="#C9973A"/>

  <!-- Left arm (holding pan) -->
  <path d="M34 108 Q14 118 10 132" stroke="#f0ede6" stroke-width="13" stroke-linecap="round" fill="none"/>
  <!-- Pan -->
  <ellipse cx="9" cy="138" rx="10" ry="10" fill="#888" stroke="#666" stroke-width="1.5"/>
  <ellipse cx="9" cy="138" rx="7" ry="7" fill="#aaa" opacity="0.5"/>
  <line x1="10" y1="128" x2="10" y2="115" stroke="#777" stroke-width="3" stroke-linecap="round"/>

  <!-- Right arm (holding spatula) -->
  <path d="M86 108 Q106 118 110 130" stroke="#f0ede6" stroke-width="13" stroke-linecap="round" fill="none"/>
  <!-- Spatula handle -->
  <line x1="110" y1="130" x2="113" y2="112" stroke="#C9973A" stroke-width="3.5" stroke-linecap="round"/>
  <!-- Spatula head -->
  <rect x="107" y="104" width="12" height="9" rx="2" fill="#aaa" stroke="#888" stroke-width="1"/>
  <line x1="109" y1="107" x2="117" y2="107" stroke="#888" stroke-width="1"/>
  <line x1="109" y1="110" x2="117" y2="110" stroke="#888" stroke-width="1"/>

  <!-- Neck -->
  <rect x="53" y="90" width="14" height="14" rx="4" fill="#f5cba7"/>

  <!-- Head -->
  <ellipse cx="60" cy="72" rx="26" ry="28" fill="#f5cba7"/>

  <!-- Ear left -->
  <ellipse cx="35" cy="74" rx="5" ry="7" fill="#f0b98a"/>
  <!-- Ear right -->
  <ellipse cx="85" cy="74" rx="5" ry="7" fill="#f0b98a"/>

  <!-- Eyes -->
  <ellipse cx="50" cy="68" rx="5" ry="6" fill="white"/>
  <ellipse cx="70" cy="68" rx="5" ry="6" fill="white"/>
  <circle cx="51" cy="69" r="3" fill="#2c1810"/>
  <circle cx="71" cy="69" r="3" fill="#2c1810"/>
  <!-- Eye shine -->
  <circle cx="52.5" cy="67.5" r="1.2" fill="white"/>
  <circle cx="72.5" cy="67.5" r="1.2" fill="white"/>

  <!-- Eyebrows -->
  <path d="M45 61 Q50 58 55 61" stroke="#5a3a1a" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M65 61 Q70 58 75 61" stroke="#5a3a1a" stroke-width="2" stroke-linecap="round" fill="none"/>

  <!-- Nose -->
  <ellipse cx="60" cy="76" rx="4" ry="3" fill="#f0a07a"/>

  <!-- Mouth (smile) -->
  <path id="chef-mouth" d="M50 85 Q60 94 70 85" stroke="#c0604a" stroke-width="2.5" stroke-linecap="round" fill="none"/>

  <!-- Chef hat brim -->
  <rect x="33" y="47" width="54" height="9" rx="4" fill="white" stroke="#ddd" stroke-width="1"/>
  <!-- Chef hat top -->
  <path d="M38 47 Q38 20 60 18 Q82 20 82 47Z" fill="white" stroke="#ddd" stroke-width="1"/>
  <!-- Hat band (gold) -->
  <rect x="33" y="47" width="54" height="5" rx="2" fill="#C9973A" opacity="0.7"/>
  <!-- Hat puff -->
  <ellipse cx="60" cy="22" rx="16" ry="12" fill="white"/>
</svg>`;

    /* ── Bubble messages per context ── */
    var MESSAGES = {
        idle: [
            "Irasshaimase! 🍖",
            "Fresh from the grill!",
            "Hungry? I got you~",
            "Best yakiniku in KL!",
            "Try the wagyu... trust me.",
            "Halal & delicious!",
            "Grill season, all season.",
            "Don't be shy, order more!"
        ],
        menu: [
            "Great choice! 🔥",
            "That one's my favourite!",
            "Oishii! Delicious!",
            "A+ taste guaranteed!",
            "Chef's pick right there!",
            "You have good taste!",
            "Grilling that up now! 🍳"
        ],
        book: [
            "See you soon! 👋",
            "Your table is ready!",
            "We'll be waiting~",
            "Yatta! Booking time!",
            "Can't wait to cook for you!",
            "Itadakimasu! 🎉"
        ]
    };

    function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

    /* ── Build widget DOM ── */
    var widget = document.createElement("div");
    widget.id  = "chef-widget";

    var closeBtn = document.createElement("button");
    closeBtn.id  = "chef-close";
    closeBtn.setAttribute("aria-label", "Close chef");
    closeBtn.innerHTML = "✕";

    var bubble = document.createElement("div");
    bubble.id  = "chef-bubble";

    var svgWrap = document.createElement("div");
    svgWrap.id  = "chef-svg-wrap";
    svgWrap.innerHTML = SVG;

    widget.appendChild(closeBtn);
    widget.appendChild(bubble);
    widget.appendChild(svgWrap);
    document.body.appendChild(widget);

    /* ── Show / hide bubble ── */
    var bubbleTimer = null;
    function showBubble(text, duration) {
        clearTimeout(bubbleTimer);
        bubble.textContent = text;
        bubble.classList.add("visible");
        bubbleTimer = setTimeout(function () {
            bubble.classList.remove("visible");
        }, duration || 3000);
    }

    /* ── Trigger a reaction ── */
    var reactTimer = null;
    function react(type, message) {
        var anim = { menu: "react-jump", book: "react-spin", idle: "react-wiggle" }[type] || "react-nod";

        svgWrap.classList.remove("idle", "react-jump", "react-wiggle", "react-nod", "react-spin");
        clearTimeout(reactTimer);

        void svgWrap.offsetWidth; // reflow to restart animation
        svgWrap.classList.add(anim);

        showBubble(message || rand(MESSAGES[type] || MESSAGES.idle));

        reactTimer = setTimeout(function () {
            svgWrap.classList.remove(anim);
            svgWrap.classList.add("idle");
        }, 700);
    }

    /* ── Idle loop ── */
    svgWrap.classList.add("idle");
    var idleInterval = setInterval(function () {
        if (!widget.classList.contains("dragging")) {
            react("idle");
        }
    }, 8000);

    /* ── Close button ── */
    closeBtn.addEventListener("click", function () {
        clearInterval(idleInterval);
        widget.style.transition = "opacity 0.3s, transform 0.3s";
        widget.style.opacity    = "0";
        widget.style.transform  = "scale(0.7) translateY(20px)";
        setTimeout(function () { widget.remove(); }, 320);
    });

    /* ── Drag & drop (mouse + touch) ── */
    var dragging = false, startX, startY, startLeft, startBottom;

    function getPos() {
        var rect = widget.getBoundingClientRect();
        return {
            left:   rect.left,
            bottom: window.innerHeight - rect.bottom
        };
    }

    function onDragStart(clientX, clientY) {
        dragging = true;
        var pos  = getPos();
        startX   = clientX;
        startY   = clientY;
        startLeft   = pos.left;
        startBottom = pos.bottom;

        widget.classList.add("dragging");
        bubble.classList.remove("visible");

        /* Switch from right/bottom anchoring to left/bottom for free movement */
        widget.style.right  = "auto";
        widget.style.left   = startLeft + "px";
        widget.style.bottom = startBottom + "px";
    }

    function onDragMove(clientX, clientY) {
        if (!dragging) return;
        var dx = clientX - startX;
        var dy = clientY - startY;

        var newLeft   = Math.max(0, Math.min(window.innerWidth  - 100, startLeft   + dx));
        var newBottom = Math.max(0, Math.min(window.innerHeight - 160, startBottom - dy));

        widget.style.left   = newLeft   + "px";
        widget.style.bottom = newBottom + "px";
    }

    function onDragEnd() {
        if (!dragging) return;
        dragging = false;
        widget.classList.remove("dragging");
    }

    /* Mouse */
    svgWrap.addEventListener("mousedown", function (e) {
        e.preventDefault();
        onDragStart(e.clientX, e.clientY);
    });
    document.addEventListener("mousemove", function (e) { onDragMove(e.clientX, e.clientY); });
    document.addEventListener("mouseup",   onDragEnd);

    /* Touch */
    svgWrap.addEventListener("touchstart", function (e) {
        var t = e.touches[0];
        onDragStart(t.clientX, t.clientY);
    }, { passive: true });
    document.addEventListener("touchmove", function (e) {
        if (!dragging) return;
        var t = e.touches[0];
        onDragMove(t.clientX, t.clientY);
    }, { passive: true });
    document.addEventListener("touchend", onDragEnd);

    /* ── Click reactions ── */

    /* Menu cards */
    document.querySelectorAll(".menu-card").forEach(function (card) {
        card.addEventListener("click", function () { react("menu"); });
    });

    /* WhatsApp / Book buttons */
    var bookSelectors = [
        "#hero-whatsapp-btn",
        "#cta-whatsapp-btn",
        "#cta-menu-btn",
        "#contact-whatsapp-btn",
        "#cal-book-btn",
        ".menu-book-cta .btn-primary",
        ".cal-book-btn"
    ].join(",");

    document.querySelectorAll(bookSelectors).forEach(function (btn) {
        btn.addEventListener("click", function () { react("book"); });
    });

    /* Chef itself — tap to say something */
    svgWrap.addEventListener("click", function (e) {
        if (!dragging) react("idle");
    });

})();
