/* ============================================================================
   RespiraHome — Lógica del sitio
   Lee window.RESPIRAHOME_CONFIG (config.js) y renderiza el contenido dinámico.
   ========================================================================== */
(function () {
  "use strict";
  const CFG = window.RESPIRAHOME_CONFIG;
  if (!CFG) { console.error("Falta config.js"); return; }

  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));
  const clp = (n) => "$" + Number(n).toLocaleString("es-CL");

  /* ---- Íconos SVG por servicio ---------------------------------------- */
  const ICONS = {
    lungs: '<svg viewBox="0 0 24 24"><path d="M12 2a1 1 0 011 1v6.2c.5-.3 1.1-.5 1.7-.5.2-1.6 1-3 2.3-3.4 1.6-.5 3 .6 3.4 2.2.2.7.6 3.4.6 5.5 0 3.3-1.7 6-4.5 6-1.9 0-3.5-1.6-3.5-3.6V12a1 1 0 00-2 0v3.4C11 17.4 9.4 19 7.5 19 4.7 19 3 16.3 3 13c0-2.1.4-4.8.6-5.5C4 5.9 5.4 4.8 7 5.3c1.3.4 2.1 1.8 2.3 3.4.6 0 1.2.2 1.7.5V3a1 1 0 011-1z"/></svg>',
    baby:  '<svg viewBox="0 0 24 24"><path d="M12 2a2 2 0 100 4 2 2 0 000-4zM7.5 8C6 8 5 9 5 10.5c0 .9.5 1.7 1.2 2.1-.1.4-.2.9-.2 1.4a6 6 0 0012 0c0-.5-.1-1-.2-1.4.7-.4 1.2-1.2 1.2-2.1C19 9 18 8 16.5 8h-9zM10 14a1 1 0 110 2 1 1 0 010-2zm4 0a1 1 0 110 2 1 1 0 010-2zm-3.5 3.2c.4.5 1 .8 1.5.8s1.1-.3 1.5-.8a.5.5 0 00-.8-.6c-.2.3-.5.4-.7.4s-.5-.1-.7-.4a.5.5 0 00-.8.6z"/></svg>',
    muscle:'<svg viewBox="0 0 24 24"><path d="M6 3c1.5 0 3 1 4 2.5.8 1.2 1.4 1.8 2.5 1.8 2 0 3.5 1.2 4.4 2.7.7 1.2 1.6 3.4 1.6 5 0 2.8-2 5-5 5-2 0-3-1-4-2s-1.8-1.5-3-1.5c-1.4 0-2.5-1-3-2.2-.6-1.4-.8-3.3-.8-4.8C2.7 6 4 3 6 3zm7.5 8.5a1 1 0 100 2 1 1 0 000-2z"/></svg>',
    heart: '<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.7-10-9.2C.7 9.2 1.5 5.8 4.4 4.9 6.4 4.3 8.3 5 9.5 6.6l.5.7.5-.7C11.7 5 13.6 4.3 15.6 4.9c2.9.9 3.7 4.3 2.4 6.9C19 16.3 12 21 12 21zm-6-9h2.5l1-2 2 4 1.5-3 .8 1.5H16"/></svg>',
    hand:  '<svg viewBox="0 0 24 24"><path d="M8 2.8a1.2 1.2 0 012.4 0V9h.6V4a1.2 1.2 0 012.4 0v5h.6V5.2a1.2 1.2 0 012.4 0V11h.6V7.5a1.2 1.2 0 012.4 0V15c0 3.3-2.7 6-6 6h-1.3c-1.7 0-3.3-.7-4.4-2l-3-3.2a1.3 1.3 0 011.8-1.8l1.5 1.3V2.8z"/></svg>',
  };

  /* ================= SERVICIOS ======================================== */
  function renderServicios() {
    const grid = $("#services-grid");
    grid.innerHTML = CFG.servicios.map((s) => {
      const adic = s.adicionales && s.adicionales.length
        ? `<div class="service-adicionales">
             <span class="title">Adicionales opcionales</span>
             <ul>${s.adicionales.map(a => `<li><span>${a.nombre}</span> <b>+${clp(a.precio)}</b></li>`).join("")}</ul>
           </div>` : "";
      return `
        <article class="service-card${s.destacado ? " is-featured" : ""}">
          ${s.destacado ? '<span class="service-badge">Más solicitado</span>' : ""}
          <div class="service-ico">${ICONS[s.icono] || ICONS.lungs}</div>
          <h3>${s.nombre}</h3>
          <p>${s.descripcion}</p>
          <div class="service-price"><span class="amount">${clp(s.precio)}</span><span class="per">/ sesión</span></div>
          ${adic}
        </article>`;
    }).join("");
  }

  /* ================= ZONAS / COBERTURA ================================ */
  function renderZonas() {
    const grid = $("#zones-grid");
    grid.innerHTML = CFG.zonas.map((z) => {
      const free = z.recargo === 0;
      const tag = free ? '<span class="zone-tag free">Sin recargo</span>'
                       : `<span class="zone-tag paid">+${clp(z.recargo)}</span>`;
      return `
        <article class="zone-card">
          <div class="zone-head"><h3>${z.nombre.split("—")[0].trim()}</h3>${tag}</div>
          <p class="zone-desc">${z.descripcion}</p>
          <div class="zone-comunas">${z.comunas.map(c => `<span>${c}</span>`).join("")}</div>
        </article>`;
    }).join("");
  }

  /* ================= FAQ ============================================== */
  function renderFaq() {
    const list = $("#faq-list");
    list.innerHTML = CFG.faq.map((f, i) => {
      const answered = f.respuesta && f.respuesta.trim().length > 0;
      const body = answered ? f.respuesta : "Estamos preparando esta respuesta. Escríbenos por WhatsApp y te ayudamos de inmediato.";
      return `
        <div class="faq-item" data-i="${i}">
          <button class="faq-q" aria-expanded="false">
            <span>${f.pregunta}</span>
            <svg class="chev" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div class="faq-a"><div class="faq-a-inner${answered ? "" : " pending"}">${body}</div></div>
        </div>`;
    }).join("");

    $$(".faq-q", list).forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".faq-item");
        const ans = $(".faq-a", item);
        const open = item.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        ans.style.maxHeight = open ? ans.scrollHeight + "px" : "0";
      });
    });
  }

  /* ================= COTIZADOR ======================================= */
  function buildComunaIndex() {
    const map = {};
    CFG.zonas.forEach((z) => z.comunas.forEach((c) => { map[c] = z; }));
    return map;
  }

  function renderCotizador() {
    const selServicio = $("#q-servicio");
    const selComuna = $("#q-comuna");
    const selHorario = $("#q-horario");
    const adicWrap = $("#q-adicionales-wrap");
    const adicBox = $("#q-adicionales");
    const totalEl = $("#q-total");
    const breakdown = $("#q-breakdown");
    const comunaMap = buildComunaIndex();

    // Poblar servicios
    selServicio.innerHTML = CFG.servicios.map((s, i) =>
      `<option value="${s.id}">${s.nombre}</option>`).join("");

    // Poblar comunas (ordenadas alfabéticamente)
    const comunas = [...new Set(CFG.zonas.flatMap(z => z.comunas))].sort((a, b) => a.localeCompare(b, "es"));
    selComuna.innerHTML = comunas.map(c => {
      const z = comunaMap[c];
      const label = z.recargo === 0 ? c : `${c} (+${clp(z.recargo)})`;
      return `<option value="${c}">${label}</option>`;
    }).join("");

    // Horario
    selHorario.querySelector('option[value="fuera"]').textContent =
      `Fuera de horario (+${clp(CFG.horario.recargoFueraHorario)})`;

    function currentServicio() { return CFG.servicios.find(s => s.id === selServicio.value); }

    function renderAdicionales() {
      const s = currentServicio();
      if (s.adicionales && s.adicionales.length) {
        adicWrap.hidden = false;
        adicBox.innerHTML = s.adicionales.map(a =>
          `<label class="check">
             <input type="checkbox" value="${a.id}" data-price="${a.precio}">
             <span class="c-name">${a.nombre}</span>
             <span class="c-price">+${clp(a.precio)}</span>
           </label>`).join("");
      } else {
        adicWrap.hidden = true;
        adicBox.innerHTML = "";
      }
    }

    function recalc() {
      const s = currentServicio();
      const z = comunaMap[selComuna.value];
      const fuera = selHorario.value === "fuera";
      let total = s.precio;
      const rows = [`<li><span>${s.nombre.split("—")[0].trim()}</span> <b>${clp(s.precio)}</b></li>`];

      $$('input[type="checkbox"]:checked', adicBox).forEach((chk) => {
        const p = Number(chk.dataset.price);
        total += p;
        rows.push(`<li><span>${chk.closest(".check").querySelector(".c-name").textContent}</span> <b>+${clp(p)}</b></li>`);
      });

      if (z.recargo > 0) { total += z.recargo; rows.push(`<li><span>Traslado · ${selComuna.value}</span> <b>+${clp(z.recargo)}</b></li>`); }
      if (fuera) { total += CFG.horario.recargoFueraHorario; rows.push(`<li><span>Recargo fuera de horario</span> <b>+${clp(CFG.horario.recargoFueraHorario)}</b></li>`); }

      totalEl.textContent = clp(total);
      breakdown.innerHTML = rows.join("");

      // Guardar resumen para el mensaje de WhatsApp
      window.__respiraQuote = { servicio: s.nombre, comuna: selComuna.value, horario: fuera ? "fuera de horario" : "horario normal", total: clp(total) };
    }

    selServicio.addEventListener("change", () => { renderAdicionales(); recalc(); });
    selComuna.addEventListener("change", recalc);
    selHorario.addEventListener("change", recalc);
    adicBox.addEventListener("change", recalc);

    renderAdicionales();
    recalc();
  }

  /* ================= WHATSAPP + REDES ================================= */
  function waLink(msg) {
    return `https://wa.me/${CFG.contacto.whatsapp}?text=${encodeURIComponent(msg)}`;
  }

  function setupContacto() {
    // Botones WhatsApp genéricos
    $$("[data-whatsapp]").forEach((el) => {
      el.setAttribute("href", waLink(CFG.contacto.whatsappMensaje));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });

    // Botón WhatsApp del cotizador (mensaje con el detalle)
    const q = $("[data-whatsapp-quote]");
    if (q) {
      q.addEventListener("click", (e) => {
        const d = window.__respiraQuote;
        if (d) {
          const msg = `¡Hola RespiraHome! Quiero agendar:\n• Servicio: ${d.servicio}\n• Comuna: ${d.comuna}\n• Horario: ${d.horario}\n• Valor estimado: ${d.total}`;
          e.currentTarget.setAttribute("href", waLink(msg));
        }
      });
    }

    // Redes sociales
    ["instagram", "facebook"].forEach((r) => {
      $$(`#social-${r}, #footer-${r}`).forEach((a) => a.setAttribute("href", CFG.redes[r]));
    });

    // Footer datos
    const email = $("#footer-email");
    if (email) { email.textContent = CFG.contacto.email; email.setAttribute("href", "mailto:" + CFG.contacto.email); }
    const hor = $("#footer-horario");
    if (hor) hor.textContent = `${CFG.horario.diasTexto} · ${CFG.horario.horaInicio}–${CFG.horario.horaFin}`;
    const year = $("#year");
    if (year) year.textContent = new Date().getFullYear();
  }

  /* ================= NAV MÓVIL ======================================= */
  function setupNav() {
    const toggle = $(".nav-toggle");
    const nav = $(".main-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $$(".main-nav a").forEach((a) => a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }

  /* ================= INIT ============================================ */
  document.addEventListener("DOMContentLoaded", () => {
    renderServicios();
    renderZonas();
    renderFaq();
    renderCotizador();
    setupContacto();
    setupNav();
  });
})();
