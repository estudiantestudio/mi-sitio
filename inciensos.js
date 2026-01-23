// =======================
// Página Inciensos (exclusiva)
// =======================

const state = {
  intent: null,         // intención seleccionada
  family: null,         // familia aromática seleccionada
  search: "",           // búsqueda
  quiz: { q1: null, q2: null, q3: null }
};

// INTENCIONES (tarjetas grandes)
const INTENTS = [
  { key: "Relajación", emoji: "😌", desc: "Baja el estrés, calma la mente, suaviza emociones." },
  { key: "Meditación", emoji: "🧘", desc: "Enfoque, presencia, respiración y ritual." },
  { key: "Limpieza", emoji: "🔮", desc: "Purificación, reset energético, protección." },
  { key: "Amor", emoji: "💕", desc: "Armonía, suavidad, conexión y bienestar emocional." },
  { key: "Energía", emoji: "🔥", desc: "Motivación, ánimo, vitalidad y movimiento." },
  { key: "Dormir", emoji: "💤", desc: "Descanso, relajación profunda, ambiente nocturno." },
  { key: "Hogar", emoji: "🏡", desc: "Aromatizar y transformar espacios del día a día." }
];

// FAMILIAS AROMÁTICAS (chips)
const FAMILIES = [
  "Floral", "Herbal", "Amaderado", "Cítrico", "Especiado", "Dulce", "Fresco"
];

// PRODUCTOS (ejemplos). Tú puedes duplicar y cambiar info/imágenes/precios.
const PRODUCTS = [
  {
    id: "lavanda-pro",
    name: "Incienso de Lavanda – Relajación profunda",
    price: 6990,
    image: "https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=1200&q=70",
    intents: ["Relajación", "Dormir", "Hogar", "Meditación"],
    families: ["Floral", "Fresco"],
    profile: {
      intensity: 3,
      feeling: "Calmante, suave, floral",
      duration: "45–60 min",
      style: "Natural, fresco"
    },
    idealFor: [
      "Relajarse antes de dormir",
      "Reducir estrés",
      "Meditación ligera"
    ],
    notFor: [
      "Espacios muy pequeños",
      "Personas sensibles a aromas florales"
    ],
    story:
      "La lavanda se ha utilizado desde la antigüedad para calmar la mente y equilibrar las emociones. Su aroma floral ayuda a reducir el estrés y crear ambientes de paz.",
    recs: ["manzanilla-suave", "vainilla-abrazo", "rosa-armonia"]
  },
  {
    id: "palo-santo-limpieza",
    name: "Palo Santo – Limpieza y claridad",
    price: 8990,
    image: "https://images.unsplash.com/photo-1615486363973-5a0b7bfa5bb1?auto=format&fit=crop&w=1200&q=70",
    intents: ["Limpieza", "Meditación", "Hogar"],
    families: ["Amaderado", "Fresco"],
    profile: {
      intensity: 4,
      feeling: "Purificante, cálido, amaderado",
      duration: "45–70 min",
      style: "Intenso, ritual"
    },
    idealFor: [
      "Reset energético del hogar",
      "Rituales de limpieza",
      "Enfoque y claridad mental"
    ],
    notFor: [
      "Personas sensibles a aromas intensos",
      "Uso en espacios sin ventilación"
    ],
    story:
      "El Palo Santo es tradicionalmente usado para limpiar energías y elevar el ánimo. Su aroma amaderado crea una sensación de claridad y protección.",
    recs: ["sandalo-zen", "citricos-energia", "copal-ritual"]
  },
  {
    id: "vainilla-abrazo",
    name: "Vainilla – Calma dulce y armonía",
    price: 7490,
    image: "https://images.unsplash.com/photo-1528823872057-9c018a7a7553?auto=format&fit=crop&w=1200&q=70",
    intents: ["Relajación", "Amor", "Hogar", "Dormir"],
    families: ["Dulce"],
    profile: {
      intensity: 3,
      feeling: "Reconfortante, cálido, dulce",
      duration: "45–60 min",
      style: "Suave, acogedor"
    },
    idealFor: [
      "Crear ambiente cálido",
      "Armonía emocional",
      "Rutina nocturna tranquila"
    ],
    notFor: [
      "Personas que prefieren aromas frescos",
      "Espacios muy cerrados"
    ],
    story:
      "La vainilla se asocia a seguridad y bienestar. Es el aroma perfecto para transformar tu espacio en un refugio emocional.",
    recs: ["lavanda-pro", "rosa-armonia", "manzanilla-suave"]
  },
  {
    id: "sandalo-zen",
    name: "Sándalo – Meditación y presencia",
    price: 9990,
    image: "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?auto=format&fit=crop&w=1200&q=70",
    intents: ["Meditación", "Relajación", "Limpieza"],
    families: ["Amaderado", "Especiado"],
    profile: {
      intensity: 4,
      feeling: "Profundo, estable, cálido",
      duration: "50–75 min",
      style: "Ritual, envolvente"
    },
    idealFor: [
      "Meditación profunda",
      "Enfoque",
      "Ambiente espiritual"
    ],
    notFor: [
      "Quienes prefieren aromas ligeros",
      "Uso en piezas sin ventilación"
    ],
    story:
      "El sándalo es un clásico en prácticas meditativas por su carácter estable y profundo. Invita a bajar el ruido mental y conectar con el presente.",
    recs: ["palo-santo-limpieza", "copal-ritual", "lavanda-pro"]
  },
  {
    id: "manzanilla-suave",
    name: "Manzanilla – Descanso suave",
    price: 6790,
    image: "https://images.unsplash.com/photo-1542728928-1418f7de2f7b?auto=format&fit=crop&w=1200&q=70",
    intents: ["Dormir", "Relajación", "Hogar"],
    families: ["Herbal", "Fresco"],
    profile: {
      intensity: 2,
      feeling: "Suave, herbal, calmante",
      duration: "40–55 min",
      style: "Ligero, natural"
    },
    idealFor: [
      "Dormir mejor",
      "Reducir tensión",
      "Ambientes delicados"
    ],
    notFor: [
      "Quienes buscan aromas intensos",
      "Espacios muy grandes"
    ],
    story:
      "La manzanilla es sinónimo de calma. Su aroma herbal es ideal para crear una atmósfera ligera y relajante, especialmente de noche.",
    recs: ["lavanda-pro", "vainilla-abrazo", "rosa-armonia"]
  },
  {
    id: "rosa-armonia",
    name: "Rosa – Amor y armonía",
    price: 8290,
    image: "https://images.unsplash.com/photo-1528826194825-5a36b3b3f2b0?auto=format&fit=crop&w=1200&q=70",
    intents: ["Amor", "Relajación", "Hogar"],
    families: ["Floral", "Dulce"],
    profile: {
      intensity: 3,
      feeling: "Romántico, suave, floral",
      duration: "45–60 min",
      style: "Cálido, emocional"
    },
    idealFor: [
      "Armonía en el hogar",
      "Momentos íntimos",
      "Bajar tensión emocional"
    ],
    notFor: [
      "Quienes no disfrutan aromas florales",
      "Espacios muy pequeños"
    ],
    story:
      "La rosa se asocia con amor y equilibrio emocional. Su aroma ayuda a suavizar el ambiente y crear una sensación de armonía.",
    recs: ["vainilla-abrazo", "lavanda-pro", "manzanilla-suave"]
  }
];

// ---------- Helpers ----------
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function formatCLP(n) {
  return n.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
}

function stars(n) {
  const full = "⭐".repeat(n);
  const empty = "☆".repeat(5 - n);
  return `${full}${empty}`;
}

// ---------- Render UI ----------
function renderIntentCards() {
  const host = $("#intentGrid");
  host.innerHTML = INTENTS.map(i => `
    <button class="intent-card ${state.intent === i.key ? "is-active" : ""}" data-intent="${i.key}">
      <div class="intent-emoji">${i.emoji}</div>
      <div class="intent-title">${i.key}</div>
      <div class="intent-desc">${i.desc}</div>
      <div class="intent-cta">Filtrar</div>
    </button>
  `).join("");

  host.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-intent]");
    if (!btn) return;
    const key = btn.getAttribute("data-intent");
    state.intent = (state.intent === key) ? null : key;
    renderAll();
    scrollToGrid();
  });
}

function renderFamilyChips() {
  const host = $("#familyChips");
  host.innerHTML = [
    `<button class="chip ${state.family === null ? "is-active" : ""}" data-family="">Todos</button>`,
    ...FAMILIES.map(f => `<button class="chip ${state.family === f ? "is-active" : ""}" data-family="${f}">${iconFamily(f)} ${f}</button>`)
  ].join("");

  host.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-family]");
    if (!btn) return;
    const fam = btn.getAttribute("data-family");
    state.family = fam === "" ? null : fam;
    renderAll();
    scrollToGrid();
  });
}

function iconFamily(f) {
  const map = {
    "Floral": "🌸",
    "Herbal": "🌿",
    "Amaderado": "🌲",
    "Cítrico": "🍋",
    "Especiado": "🌶️",
    "Dulce": "🍯",
    "Fresco": "🌊"
  };
  return map[f] || "✨";
}

function renderActiveFilters() {
  const host = $("#activeFilters");
  const chips = [];

  if (state.intent) chips.push({ label: `Intención: ${state.intent}`, type: "intent" });
  if (state.family) chips.push({ label: `Aroma: ${state.family}`, type: "family" });
  if (state.search.trim()) chips.push({ label: `Búsqueda: ${state.search.trim()}`, type: "search" });

  if (!chips.length) {
    host.innerHTML = `<span class="muted">Tip: elige una intención o aroma para encontrar tu match perfecto.</span>`;
    return;
  }

  host.innerHTML = `
    <div class="filter-row">
      ${chips.map(c => `<button class="filter-chip" data-clear="${c.type}">✕ ${c.label}</button>`).join("")}
      <button class="filter-chip clear-all" data-clear="all">✕ Limpiar todo</button>
    </div>
  `;

  host.onclick = (e) => {
    const btn = e.target.closest("[data-clear]");
    if (!btn) return;
    const t = btn.getAttribute("data-clear");
    if (t === "intent") state.intent = null;
    if (t === "family") state.family = null;
    if (t === "search") state.search = "";
    if (t === "all") { state.intent = null; state.family = null; state.search = ""; $("#searchInput").value = ""; }
    renderAll();
  };
}

function filteredProducts() {
  const q = state.search.trim().toLowerCase();

  return PRODUCTS.filter(p => {
    const okIntent = state.intent ? p.intents.includes(state.intent) : true;
    const okFamily = state.family ? p.families.includes(state.family) : true;

    const okSearch = q
      ? (p.name.toLowerCase().includes(q) ||
         p.story.toLowerCase().includes(q) ||
         p.families.join(" ").toLowerCase().includes(q) ||
         p.intents.join(" ").toLowerCase().includes(q))
      : true;

    return okIntent && okFamily && okSearch;
  });
}

function renderProducts() {
  const list = filteredProducts();
  const host = $("#productsGrid");

  if (!list.length) {
    host.innerHTML = `
      <div class="card">
        <h3>No encontramos coincidencias 😅</h3>
        <p class="muted">Prueba con otra intención, otra familia aromática o una palabra distinta (ej: “lavanda”, “madera”, “dulce”).</p>
        <button class="btn btn-primary" onclick="irAWhatsapp()">Ayúdame a elegir por WhatsApp</button>
      </div>
    `;
    return;
  }

  host.innerHTML = list.map(p => `
    <article class="pdp card" id="${p.id}">
      <div class="pdp-media">
        <img src="${p.image}" alt="${escapeHTML(p.name)}" />
        <div class="pdp-tags">
          ${p.intents.slice(0,3).map(i => `<span class="tag">${i}</span>`).join("")}
          ${p.families.slice(0,2).map(f => `<span class="tag tag--soft">${iconFamily(f)} ${f}</span>`).join("")}
        </div>
      </div>

      <div class="pdp-body">
        <!-- A. Nombre emocional -->
        <h3 class="pdp-title">${escapeHTML(p.name)}</h3>

        <div class="pdp-price-row">
          <div class="pdp-price">${formatCLP(p.price)}</div>
          <button class="btn btn-primary" onclick="irAWhatsappProducto('${escapeJS(p.name)}')">Comprar por WhatsApp</button>
        </div>

        <!-- C. Perfil aromático -->
        <div class="pdp-profile">
          <div class="profile-item"><span class="label">Intensidad:</span> <span class="value">${stars(p.profile.intensity)}</span></div>
          <div class="profile-item"><span class="label">Sensación:</span> <span class="value">${escapeHTML(p.profile.feeling)}</span></div>
          <div class="profile-item"><span class="label">Duración:</span> <span class="value">${escapeHTML(p.profile.duration)}</span></div>
          <div class="profile-item"><span class="label">Estilo:</span> <span class="value">${escapeHTML(p.profile.style)}</span></div>
        </div>

        <!-- D. Ideal / No recomendado -->
        <div class="pdp-split">
          <div class="box good">
            <h4>✔ Ideal para:</h4>
            <ul>${p.idealFor.map(x => `<li>${escapeHTML(x)}</li>`).join("")}</ul>
          </div>

          <div class="box bad">
            <h4>❌ No recomendado para:</h4>
            <ul>${p.notFor.map(x => `<li>${escapeHTML(x)}</li>`).join("")}</ul>
          </div>
        </div>

        <!-- E. Historia breve -->
        <div class="pdp-story">
          <h4>Historia del aroma</h4>
          <p>${escapeHTML(p.story)}</p>
        </div>

        <!-- F. Recomendaciones estilo Netflix -->
        <div class="pdp-recs">
          <h4>“Si te gusta este aroma, también te puede gustar:”</h4>
          <div class="recs-row">
            ${p.recs.map(id => renderRecCard(id)).join("")}
          </div>
        </div>
      </div>
    </article>
  `).join("");
}

function renderRecCard(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return "";
  return `
    <a class="rec-card" href="#${p.id}" title="${escapeHTML(p.name)}">
      <img src="${p.image}" alt="${escapeHTML(p.name)}" />
      <div class="rec-name">${escapeHTML(shortName(p.name))}</div>
    </a>
  `;
}

function shortName(name) {
  // Deja una versión corta para el rec-card
  return name.length > 34 ? name.slice(0, 34) + "…" : name;
}

function renderAll() {
  renderIntentCards();
  renderFamilyChips();
  renderActiveFilters();
  renderProducts();
}

function scrollToGrid() {
  const el = $("#productosInciensos");
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ---------- Search ----------
function setupSearch() {
  const input = $("#searchInput");
  if (!input) return;
  input.addEventListener("input", () => {
    state.search = input.value || "";
    renderAll();
  });
}

// ---------- Quiz ----------
function setupQuiz() {
  const host = $("#quiz");
  if (!host) return;

  host.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-q]");
    if (!btn) return;
    const q = btn.getAttribute("data-q");
    const v = btn.getAttribute("data-v");
    state.quiz[q] = v;

    // UI active state
    $$("#" + q + " .chip").forEach(b => b.classList.toggle("is-active", b === btn));
  });

  $("#resetQuiz")?.addEventListener("click", () => {
    state.quiz = { q1: null, q2: null, q3: null };
    ["q1","q2","q3"].forEach(q => $$("#"+q+" .chip").forEach(b => b.classList.remove("is-active")));
    const res = $("#quizResult");
    if (res) { res.hidden = true; res.innerHTML = ""; }
  });

  $("#getResult")?.addEventListener("click", () => {
    const { q1, q2, q3 } = state.quiz;
    const res = $("#quizResult");

    if (!q1 || !q2 || !q3) {
      res.hidden = false;
      res.className = "quiz-result warn";
      res.innerHTML = `<b>Completa las 3 preguntas</b> para darte tu match ideal.`;
      return;
    }

    // Match simple y efectivo:
    // 1) intenta matchear intención con productos
    // 2) usa "familia" aproximada según q2
    const preferredFamily = mapQuizToFamily(q2);
    const candidates = PRODUCTS
      .filter(p => p.intents.includes(q1) || (q1 === "Dormir" && p.intents.includes("Dormir")))
      .filter(p => preferredFamily ? p.families.includes(preferredFamily) : true);

    const pick = (candidates[0] || PRODUCTS.find(p => p.intents.includes(q1)) || PRODUCTS[0]);

    // Resultado pedido en tu descripción
    res.hidden = false;
    res.className = "quiz-result ok";
    res.innerHTML = `
      <div class="quiz-title">Resultado:</div>
      <div class="quiz-big">“Tu aroma ideal es: <b>${escapeHTML(pick.name.split(" – ")[0])} + ${escapeHTML(recommendSecond(q1))}</b>”</div>
      <p class="muted">Porque hoy buscas <b>${escapeHTML(q1)}</b>, te atraen aromas <b>${escapeHTML(q2)}</b> y lo usarás en <b>${escapeHTML(q3)}</b>.</p>
      <div class="quiz-actions2">
        <a class="btn btn-secondary" href="#${pick.id}">Ver mi recomendación</a>
        <button class="btn btn-primary" onclick="irAWhatsappProducto('${escapeJS(pick.name)}')">Comprar por WhatsApp</button>
      </div>
    `;
  });
}

function mapQuizToFamily(q2) {
  const map = {
    "Dulce": "Dulce",
    "Fresco": "Fresco",
    "Natural": "Herbal",
    "Intenso": "Amaderado"
  };
  return map[q2] || null;
}

function recommendSecond(q1) {
  const map = {
    "Relajación": "Sándalo",
    "Energía": "Cítricos",
    "Dormir": "Manzanilla",
    "Limpieza": "Palo Santo"
  };
  return map[q1] || "Sándalo";
}

// ---------- WhatsApp helpers ----------
function irAWhatsappProducto(productName) {
  // Usa tu función existente si ya la tienes, sino arma mensaje:
  const msg = encodeURIComponent(`Hola! Quiero comprar: ${productName}. ¿Me das disponibilidad, precio final y envío?`);
  // Si ya tienes WHATSAPP_NUMBER en app.js, esto igual funciona si defines window.WHATSAPP_NUMBER:
  const number = window.WHATSAPP_NUMBER || "569XXXXXXXX";
  window.open(`https://wa.me/${number}?text=${msg}`, "_blank");
}

// ---------- Security helpers ----------
function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, (m) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[m]));
}
function escapeJS(s) {
  return String(s).replace(/'/g, "\\'");
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  if (!document.querySelector("#intentGrid")) return; // asegura que estamos en inciensos.html
  renderAll();
  setupSearch();
  setupQuiz();
});
