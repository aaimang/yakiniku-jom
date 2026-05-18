/* ================================================
   chef.js — Interactive Chibi Chef Character
   ================================================ */
(function () {

    /* ── SVG markup ── */
    var SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 0 180 225" overflow="visible" style="width:100%;height:auto;display:block;">

  <!-- Shadow -->
  <ellipse cx="80" cy="220" rx="34" ry="7" fill="rgba(0,0,0,0.18)"/>

  <!-- Legs -->
  <rect x="57" y="183" width="16" height="28" rx="7" fill="#2a2a3e"/>
  <rect x="87" y="183" width="16" height="28" rx="7" fill="#2a2a3e"/>
  <!-- Shoes -->
  <ellipse cx="65" cy="211" rx="13" ry="6" fill="#111"/>
  <ellipse cx="95" cy="211" rx="13" ry="6" fill="#111"/>

  <!-- Body / chef coat -->
  <rect x="42" y="132" width="76" height="56" rx="14" fill="#f5f3ee"/>
  <!-- Coat centre panel -->
  <path d="M80 138 L65 154 L70 188 L80 183 L90 188 L95 154 Z" fill="#e8e3d8"/>
  <!-- Double-breast buttons -->
  <circle cx="71" cy="154" r="2.8" fill="#C9973A"/>
  <circle cx="71" cy="166" r="2.8" fill="#C9973A"/>
  <circle cx="71" cy="178" r="2.8" fill="#C9973A"/>
  <circle cx="89" cy="154" r="2.8" fill="#C9973A"/>
  <circle cx="89" cy="166" r="2.8" fill="#C9973A"/>
  <circle cx="89" cy="178" r="2.8" fill="#C9973A"/>

  <!-- Red neckerchief -->
  <path d="M67 133 Q80 150 93 133 Q88 127 80 129 Q72 127 67 133Z" fill="#9b1b1b"/>
  <path d="M78 146 L80 157 L82 146 L80 142Z" fill="#7a1010"/>

  <!-- Left arm -->
  <path d="M44 146 Q20 158 14 178" stroke="#f5f3ee" stroke-width="18" stroke-linecap="round" fill="none"/>
  <!-- Left hand -->
  <circle cx="12" cy="182" r="9" fill="#f9c899"/>
  <!-- Spatula handle -->
  <line x1="6" y1="180" x2="-2" y2="156" stroke="#aaa" stroke-width="5" stroke-linecap="round"/>
  <!-- Spatula head -->
  <rect x="-9" y="143" width="20" height="14" rx="3" fill="#bbb" stroke="#888" stroke-width="1.5"/>
  <line x1="-7" y1="148" x2="9" y2="148" stroke="#999" stroke-width="1"/>
  <line x1="-7" y1="152" x2="9" y2="152" stroke="#999" stroke-width="1"/>

  <!-- Right arm -->
  <path d="M116 146 Q140 158 146 178" stroke="#f5f3ee" stroke-width="18" stroke-linecap="round" fill="none"/>
  <!-- Right hand -->
  <circle cx="148" cy="182" r="9" fill="#f9c899"/>
  <!-- Ladle handle -->
  <line x1="154" y1="178" x2="162" y2="154" stroke="#aaa" stroke-width="5" stroke-linecap="round"/>
  <!-- Ladle bowl -->
  <ellipse cx="163" cy="148" rx="10" ry="8" fill="#bbb" stroke="#888" stroke-width="1.5"/>
  <ellipse cx="163" cy="148" rx="7" ry="5" fill="#ccc" opacity="0.5"/>

  <!-- Neck -->
  <rect x="70" y="120" width="20" height="18" rx="7" fill="#f9c899"/>

  <!-- Hair behind head (sides) -->
  <ellipse cx="36" cy="100" rx="11" ry="20" fill="#3d2008"/>
  <ellipse cx="124" cy="100" rx="11" ry="20" fill="#3d2008"/>

  <!-- Head -->
  <ellipse cx="80" cy="98" rx="46" ry="44" fill="#f9c899"/>

  <!-- Ears -->
  <ellipse cx="35" cy="100" rx="8" ry="11" fill="#f5af78"/>
  <ellipse cx="125" cy="100" rx="8" ry="11" fill="#f5af78"/>
  <ellipse cx="35" cy="100" rx="5" ry="7" fill="#e8916a"/>
  <ellipse cx="125" cy="100" rx="5" ry="7" fill="#e8916a"/>

  <!-- Rosy cheeks -->
  <ellipse cx="50" cy="114" rx="14" ry="8" fill="#ff9eb5" opacity="0.38"/>
  <ellipse cx="110" cy="114" rx="14" ry="8" fill="#ff9eb5" opacity="0.38"/>

  <!-- Eye whites -->
  <ellipse cx="61" cy="96" rx="11" ry="13" fill="white"/>
  <ellipse cx="99" cy="96" rx="11" ry="13" fill="white"/>
  <!-- Upper eyelid line -->
  <path d="M50 86 Q61 80 72 86" stroke="#3d2008" stroke-width="3" stroke-linecap="round" fill="none"/>
  <path d="M88 86 Q99 80 110 86" stroke="#3d2008" stroke-width="3" stroke-linecap="round" fill="none"/>
  <!-- Irises -->
  <circle cx="61" cy="97" r="7.5" fill="#6b3a10"/>
  <circle cx="99" cy="97" r="7.5" fill="#6b3a10"/>
  <!-- Pupils — cursor tracking targets -->
  <circle id="chef-pupil-left"  cx="61" cy="97" r="4.8" fill="#180800"/>
  <circle id="chef-pupil-right" cx="99" cy="97" r="4.8" fill="#180800"/>
  <!-- Eye shine -->
  <circle cx="65"  cy="92" r="2.8" fill="white"/>
  <circle cx="103" cy="92" r="2.8" fill="white"/>
  <circle cx="58"  cy="101" r="1.4" fill="white" opacity="0.55"/>
  <circle cx="96"  cy="101" r="1.4" fill="white" opacity="0.55"/>

  <!-- Eyebrows -->
  <path d="M52 79 Q61 73 70 79" stroke="#3d2008" stroke-width="3.2" stroke-linecap="round" fill="none"/>
  <path d="M90 79 Q99 73 108 79" stroke="#3d2008" stroke-width="3.2" stroke-linecap="round" fill="none"/>

  <!-- Nose -->
  <ellipse cx="80" cy="108" rx="5" ry="3.5" fill="#e8896a" opacity="0.55"/>

  <!-- Open smile with teeth -->
  <path d="M64 120 Q80 136 96 120" fill="#c04040"/>
  <path d="M66 120 Q80 132 94 120 L94 124 Q80 133 66 124Z" fill="white"/>
  <path d="M64 120 Q80 136 96 120" stroke="#3d2008" stroke-width="1.8" fill="none"/>

  <!-- Hair on forehead (peeking from hat) -->
  <path d="M46 65 Q54 56 65 53 Q72 50 80 52 Q88 50 95 53 Q106 56 114 65" fill="#3d2008"/>

  <!-- Chef hat brim -->
  <rect x="30" y="60" width="100" height="17" rx="8" fill="white" stroke="#d5d1ca" stroke-width="1.5"/>
  <!-- Gold band -->
  <rect x="30" y="70" width="100" height="6" rx="3" fill="#C9973A" opacity="0.75"/>

  <!-- Hat puff — layered ellipses for fluffy look -->
  <ellipse cx="80" cy="40" rx="42" ry="32" fill="#f0eee9"/>
  <ellipse cx="46" cy="44" rx="22" ry="20" fill="white"/>
  <ellipse cx="114" cy="44" rx="22" ry="20" fill="white"/>
  <ellipse cx="80" cy="32" rx="30" ry="26" fill="white"/>
  <ellipse cx="62" cy="26" rx="20" ry="18" fill="white"/>
  <ellipse cx="98" cy="26" rx="20" ry="18" fill="white"/>
  <ellipse cx="80" cy="16" rx="20" ry="18" fill="white"/>
  <!-- Subtle puff shading -->
  <ellipse cx="54" cy="54" rx="18" ry="9" fill="#e8e5df" opacity="0.45"/>
  <ellipse cx="106" cy="54" rx="18" ry="9" fill="#e8e5df" opacity="0.45"/>
  <ellipse cx="80" cy="56" rx="24" ry="8" fill="#e8e5df" opacity="0.38"/>

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
        void svgWrap.offsetWidth;
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
        return { left: rect.left, bottom: window.innerHeight - rect.bottom };
    }

    function onDragStart(clientX, clientY) {
        dragging = true;
        var pos  = getPos();
        startX   = clientX; startY = clientY;
        startLeft = pos.left; startBottom = pos.bottom;
        widget.classList.add("dragging");
        bubble.classList.remove("visible");
        widget.style.right  = "auto";
        widget.style.left   = startLeft + "px";
        widget.style.bottom = startBottom + "px";
    }

    function onDragMove(clientX, clientY) {
        if (!dragging) return;
        var dx = clientX - startX;
        var dy = clientY - startY;
        widget.style.left   = Math.max(0, Math.min(window.innerWidth  - 120, startLeft   + dx)) + "px";
        widget.style.bottom = Math.max(0, Math.min(window.innerHeight - 180, startBottom - dy)) + "px";
    }

    function onDragEnd() {
        if (!dragging) return;
        dragging = false;
        widget.classList.remove("dragging");
    }

    svgWrap.addEventListener("mousedown", function (e) { e.preventDefault(); onDragStart(e.clientX, e.clientY); });
    document.addEventListener("mousemove", function (e) { onDragMove(e.clientX, e.clientY); });
    document.addEventListener("mouseup",   onDragEnd);

    svgWrap.addEventListener("touchstart", function (e) {
        var t = e.touches[0]; onDragStart(t.clientX, t.clientY);
    }, { passive: true });
    document.addEventListener("touchmove", function (e) {
        if (!dragging) return;
        var t = e.touches[0]; onDragMove(t.clientX, t.clientY);
    }, { passive: true });
    document.addEventListener("touchend", onDragEnd);

    /* ── Cursor-following eyes ── */
    (function setupEyeTracking() {
        var leftPupil  = document.getElementById("chef-pupil-left");
        var rightPupil = document.getElementById("chef-pupil-right");
        var svgEl      = svgWrap.querySelector("svg");
        if (!leftPupil || !rightPupil || !svgEl) return;

        /* Eye centres in SVG viewBox space */
        var L = { x: 61, y: 97 };
        var R = { x: 99, y: 97 };
        var MAX = 4;
        var VB_W = 180, VB_H = 225;

        function movePupil(pupil, ex, ey, mx, my) {
            var dx = mx - ex, dy = my - ey;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 0.5) { pupil.setAttribute("cx", ex); pupil.setAttribute("cy", ey); return; }
            var f = Math.min(1, dist / 40);
            pupil.setAttribute("cx", ex + (dx / dist) * MAX * f);
            pupil.setAttribute("cy", ey + (dy / dist) * MAX * f);
        }

        document.addEventListener("mousemove", function (e) {
            if (dragging) return;
            /* offsetLeft/offsetTop ignore CSS transform — stable despite bob animation */
            var el = svgWrap, ox = 0, oy = 0;
            while (el) { ox += el.offsetLeft; oy += el.offsetTop; el = el.offsetParent; }
            var w = svgWrap.offsetWidth;
            var h = svgWrap.offsetHeight;
            var scaleX = VB_W / w;
            var scaleY = VB_H / h;
            var mx = (e.clientX - ox) * scaleX - 10;
            var my = (e.clientY - oy) * scaleY;
            movePupil(leftPupil,  L.x, L.y, mx, my);
            movePupil(rightPupil, R.x, R.y, mx, my);
        });
    })();

    /* ── Click reactions ── */
    document.querySelectorAll(".menu-card").forEach(function (card) {
        card.addEventListener("click", function () { react("menu"); });
    });

    var bookSelectors = [
        "#hero-whatsapp-btn", "#cta-whatsapp-btn", "#cta-menu-btn",
        "#contact-whatsapp-btn", "#cal-book-btn",
        ".menu-book-cta .btn-primary", ".cal-book-btn"
    ].join(",");

    document.querySelectorAll(bookSelectors).forEach(function (btn) {
        btn.addEventListener("click", function () { react("book"); });
    });

    svgWrap.addEventListener("click", function () {
        if (!dragging) react("idle");
    });

})();
