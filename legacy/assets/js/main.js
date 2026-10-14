/* WovenHaat — common interactions
   All pages include this file: <script src="assets/js/main.js" defer></script>
   Zero dependencies — vanilla JS. */

(function () {
  "use strict";

  /* ---------- Mobile nav drawer ---------- */
  var toggle = document.querySelector("[data-nav-toggle]");
  var drawer = document.querySelector("[data-nav-drawer]");

  if (toggle && drawer) {
    toggle.addEventListener("click", function () {
      var open = drawer.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    // Close drawer on link click (single-page feel)
    drawer.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        drawer.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) {
        drawer.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---------- Demo form handling ----------
     Does not POST to server until backend is connected; shows
     success message when valid. `data-demo-form` attribute on <form>. */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showError(field, msg) {
    var group = field.closest(".form-group") || field.parentElement;
    var existing = group.querySelector(".form-error");
    if (existing) existing.remove();
    field.removeAttribute("aria-invalid");
    if (msg) {
      var err = document.createElement("p");
      err.className = "form-error";
      err.textContent = msg;
      group.appendChild(err);
      field.setAttribute("aria-invalid", "true");
    }
  }

  document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;

      form.querySelectorAll("[required]").forEach(function (field) {
        var val = (field.value || "").trim();
        if (!val) {
          showError(field, "This field is required.");
          valid = false;
        } else if (field.type === "email" && !EMAIL_RE.test(val)) {
          showError(field, "Please enter a valid email address.");
          valid = false;
        } else {
          showError(field, null);
        }
      });

      if (!valid) {
        var firstBad = form.querySelector("[aria-invalid='true']");
        if (firstBad) firstBad.focus();
        return;
      }

      // success state
      var old = form.querySelector(".form-success");
      if (old) old.remove();
      var ok = document.createElement("p");
      ok.className = "form-success";
      ok.setAttribute("role", "status");
      ok.textContent =
        form.getAttribute("data-success") ||
        "Thank you! Your message has been received — we will respond shortly.";
      form.prepend(ok);
      form.reset();
      ok.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    // Clear error on input
    form.addEventListener("input", function (e) {
      if (e.target.matches("input, textarea, select")) showError(e.target, null);
    });
  });

  /* ---------- Newsletter (inline, footer + section) ---------- */
  document.querySelectorAll("form[data-newsletter]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector("input[type='email']");
      var msg = form.querySelector("[data-nl-msg]");
      if (!input || !EMAIL_RE.test((input.value || "").trim())) {
        if (msg) {
          msg.textContent = "Please enter a valid email address.";
          msg.style.color = "#B23A1E";
        }
        if (input) input.focus();
        return;
      }
      if (msg) {
        msg.textContent = "Subscribed! A 10% discount code for your first order has been sent to your email.";
        msg.style.color = "#3F3A38";
      }
      form.reset();
    });
  });

  /* ---------- Editorial hero (home): mobile video + desktop parallax ---------- */
  var edVideo = document.getElementById("ed-video");
  var edBg = document.getElementById("ed-bg");
  var edHero = edBg ? edBg.closest(".ed-hero") : null;
  var edReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* video: play <640px, pause otherwise (save bandwidth) */
  function syncEdVideo() {
    if (!edVideo) return;
    if (window.innerWidth < 640 && !edReduce) {
      edVideo.play().catch(function () { /* autoplay blocked → poster remains visible */ });
    } else {
      edVideo.pause();
    }
  }
  syncEdVideo();
  window.addEventListener("resize", syncEdVideo);

  /* parallax: photo moves opposite to cursor max 20px (desktop, fine pointer only) */
  if (
    edHero && edBg && !edReduce &&
    window.matchMedia("(pointer: fine)").matches
  ) {
    var tX = 0, tY = 0, cX = 0, cY = 0, edRaf = null;
    edHero.addEventListener("mousemove", function (e) {
      var r = edHero.getBoundingClientRect();
      tX = -((e.clientX - r.left) / r.width - 0.5) * 40;   // ±20px opposite
      tY = -((e.clientY - r.top) / r.height - 0.5) * 40;
      if (!edRaf) edRaf = requestAnimationFrame(edFollow);
    });
    function edFollow() {
      cX += (tX - cX) * 0.08;
      cY += (tY - cY) * 0.08;
      edBg.style.transform = "translate(" + cX.toFixed(2) + "px," + cY.toFixed(2) + "px)";
      if (Math.abs(tX - cX) > 0.1 || Math.abs(tY - cY) > 0.1) {
        edRaf = requestAnimationFrame(edFollow);
      } else {
        edRaf = null;
      }
    }
  }

  /* ---------- Impact counters (prefers-reduced-motion respect) ---------- */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          io.unobserve(el);
          var target = parseInt(el.getAttribute("data-count"), 10);
          var suffix = el.getAttribute("data-count-suffix") || "";
          var start = performance.now();
          var dur = 900;
          function tick(now) {
            var p = Math.min((now - start) / dur, 1);
            el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach(function (el) { io.observe(el); });
  }
})();
