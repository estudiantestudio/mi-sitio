/* ============================
   INCIENSOS.JS (Comfort Home)
   - No cambia tu CSS
   - Filtros + Quiz + Recomendaciones
   - Favoritos + Carrito + Comprar ahora + WePay (demo)
   - Link a producto.html?id=...
============================ */

/* ========= Config ========= */
const PRICE_INCIENSO = 3990; // $3.990 (todos los inciensos)
const LS_CART = "ch_cart_v1";
const LS_FAV  = "ch_fav_v1";

/* ========= Helpers ========= */
const money = (n) => "$" + (n || 0).toLocaleString("es-CL");
const slug = (s) =>
  s.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const load = (k, fallback) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? fallback; }
  catch { return fallback; }
};
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

let cart = load(LS_CART, []); // [{id, variant, qty}]
let fav  = load(LS_FAV, []);  // [id]

/* ========= Catálogos (Chips) ========= */
const INTENCIONES = [
  "Relajación",
  "Meditación",
  "Limpieza energética",
  "Amor / armonía",
  "Energía / motivación",
  "Dormir",
  "Hogar / ambiente",
];

const FAMILIAS = [
  "Floral",
  "Herbal",
  "Amaderado",
  "Cítrico",
  "Especiado",
  "Dulce",
  "Fresco",
];

/* ========= Imágenes (placeholders lindos) =========
   Puedes cambiar cada array después por tus fotos reales subidas a GitHub.
   EJ: images: ["img/inciensos/vanilla-1.jpg","img/inciensos/vanilla-2.jpg",...]
*/
const IMG = {
  floral: [
    "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1600&q=80",
  ],
  herbal: [
    "https://images.unsplash.com/photo-1524593166156-312f362cada0?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1600&q=80",
  ],
  wood: [
    "https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1520975958225-3f61d2d86aa2?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1477511801984-4ad318ed9846?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=1600&q=80",
  ],
  citrus: [
    "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1528826194825-9c3f5cf5b8bd?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=1600&q=80",
  ],
  sweet: [
    "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1528821154947-1aa3d1f5b125?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?auto=format&fit=crop&w=1600&q=80",
  ],
  spicy: [
    "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1516906571665-49af58989c4f?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1526318472351-c75fcf070305?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1600&q=80",
  ],
  fresh: [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1600&q=80",
  ],
};

/* ========= Productos (29 aromas) =========
   NOTA: todos con priceNow = 3990.
   variant simple: "Caja 1 unidad" (puedes cambiar)
*/
const PRODUCTS = [
  // RELAJACIÓN / DORMIR / AMOR
  mk("English Lavender", "Floral", ["Relajación","Dormir","Amor / armonía","Hogar / ambiente"], ["Dormitorio","Baño","Sala / Hogar"], "Lavanda suave, calma mental y noche tranquila."),
  mk("Chamomile", "Herbal", ["Relajación","Dormir"], ["Dormitorio","Baño"], "Manzanilla: baja ansiedad y deja el ambiente suave."),
  mk("Jasmine", "Floral", ["Relajación","Dormir","Amor / armonía","Hogar / ambiente"], ["Dormitorio","Sala / Hogar"], "Jazmín: romántico, envolvente, elegante."),
  mk("Vanilla", "Dulce", ["Relajación","Dormir","Hogar / ambiente"], ["Dormitorio","Sala / Hogar"], "Vainilla: dulzor acogedor, hogar cálido."),
  mk("Vanilla Rose", "Floral", ["Relajación","Amor / armonía","Hogar / ambiente"], ["Dormitorio","Sala / Hogar"], "Vanilla Rose: regalo perfecto, dulce + romántico."),
  mk("Rose", "Floral", ["Relajación","Amor / armonía"], ["Dormitorio","Sala / Hogar"], "Rosa: armonía, romance y suavidad."),
  mk("Anahata – Love", "Floral", ["Amor / armonía","Meditación"], ["Espacio espiritual","Dormitorio"], "Anahata: vibra de amor y apertura del corazón."),

  // MEDITACIÓN / ESPIRITUALIDAD
  mk("Nag Champa", "Amaderado", ["Meditación","Hogar / ambiente"], ["Espacio espiritual","Sala / Hogar"], "Nag Champa: clásico de meditación, profundo."),
  mk("Champa", "Amaderado", ["Meditación","Hogar / ambiente"], ["Espacio espiritual","Sala / Hogar"], "Champa: suave espiritual, sensación ritual."),
  mk("Oud Crystal", "Amaderado", ["Meditación","Amor / armonía"], ["Espacio espiritual","Sala / Hogar"], "Oud: intenso, premium, con personalidad."),
  mk("Myrrh (Mirra)", "Especiado", ["Relajación","Meditación","Limpieza energética"], ["Espacio espiritual","Sala / Hogar"], "Mirra: místico, protector, elegante."),
  mk("Sandalwood (Sándalo)", "Amaderado", ["Relajación","Meditación","Dormir","Hogar / ambiente","Amor / armonía"], ["Dormitorio","Sala / Hogar","Espacio espiritual"], "Sándalo: versátil, top ventas, calma y lujo."),
  mk("Root", "Amaderado", ["Meditación","Limpieza energética"], ["Espacio espiritual"], "Root: grounding (enraizar), ritual serio."),
  mk("7 Chakras", "Amaderado", ["Meditación","Limpieza energética"], ["Espacio espiritual"], "7 Chakras: balance energético completo."),
  mk("Sahasrara – Spirit", "Amaderado", ["Meditación"], ["Espacio espiritual"], "Sahasrara: conexión espiritual, corona."),
  mk("Ajna – Insight", "Amaderado", ["Meditación","Energía / motivación"], ["Espacio espiritual","Oficina"], "Ajna: claridad e intuición (tercer ojo)."),
  mk("Vishuddha – Truth", "Amaderado", ["Meditación"], ["Espacio espiritual"], "Vishuddha: expresión, verdad y calma."),

  // LIMPIEZA ENERGÉTICA / PROTECCIÓN
  mk("White Sage", "Herbal", ["Limpieza energética"], ["Sala / Hogar","Espacio espiritual"], "White Sage: limpieza potente de espacios."),
  mk("Palo Santo", "Amaderado", ["Limpieza energética","Meditación","Hogar / ambiente"], ["Sala / Hogar","Espacio espiritual"], "Palo Santo: limpia y deja paz."),
  mk("Arruda (Ruda)", "Herbal", ["Limpieza energética"], ["Sala / Hogar","Espacio espiritual"], "Ruda: protección, corte de energía pesada."),
  mk("Casa Pura", "Fresco", ["Relajación","Limpieza energética","Hogar / ambiente"], ["Sala / Hogar","Baño"], "Casa Pura: sensación de limpieza y orden."),
  mk("Citronella", "Fresco", ["Limpieza energética","Energía / motivación"], ["Sala / Hogar","Baño"], "Citronella: fresco, limpia y activa."),

  // ENERGÍA / MOTIVACIÓN / ENFOQUE
  mk("Cinnamon (Canela)", "Especiado", ["Energía / motivación","Hogar / ambiente"], ["Sala / Hogar","Oficina"], "Canela: calidez, motivación, energía."),
  mk("Eucalyptus (Eucalipto)", "Fresco", ["Energía / motivación","Limpieza energética"], ["Baño","Sala / Hogar","Oficina"], "Eucalipto: aire limpio, despeja."),
  mk("Rosemary (Romero)", "Herbal", ["Energía / motivación"], ["Oficina","Sala / Hogar"], "Romero: enfoque natural, mente despierta."),
  mk("Lemongrass", "Cítrico", ["Energía / motivación","Limpieza energética"], ["Oficina","Sala / Hogar"], "Lemongrass: cítrico, activa y limpia."),
  mk("Manipura – Power", "Especiado", ["Energía / motivación"], ["Oficina","Espacio espiritual"], "Manipura: poder personal, acción."),
  mk("Powers", "Especiado", ["Energía / motivación"], ["Oficina"], "Powers: activación, empuje y foco."),
  mk("Patchouli", "Amaderado", ["Energía / motivación","Meditación","Hogar / ambiente"], ["Sala / Hogar","Oficina"], "Patchouli: intenso, con personalidad.")
];

/* constructor rápido */
function mk(name, family, intentions, places, story){
  const id = "incienso-" + slug(name);
  const famKey =
    family === "Floral" ? "floral" :
    family === "Herbal" ? "herbal" :
    family === "Amaderado" ? "wood" :
    family === "Cítrico" ? "citrus" :
    family === "Dulce" ? "sweet" :
    family === "Especiado" ? "spicy" : "fresh";

  const images =
    famKey === "floral" ? IMG.floral :
    famKey === "herbal" ? IMG.herbal :
    famKey === "wood" ? IMG.wood :
    famKey === "citrus" ? IMG.citrus :
    famKey === "sweet" ? IMG.sweet :
    famKey === "spicy" ? IMG.spicy : IMG.fresh;

  return {
    id,
    name: `Incienso ${name}`,
    priceNow: PRICE_INCIENSO,
    priceWas: null,
    rating: 4.8,
    reviews: 90,
    family,
    intentions,
    places,
    notes: makeNotes(name, family),
    feeling: makeFeeling(intentions),
    duration: "45–60 min",
    variant: "Caja 1 unidad",
    bullets: makeBullets(intentions, family),
    story,
    also: makeAlso(intentions, name),
    images
  };
}

function makeNotes(name, family){
  if (family === "Dulce") return `${name} • Ámbar • Suave`;
  if (family === "Cítrico") return `${name} • Cítrico • Limpio`;
  if (family === "Fresco") return `${name} • Aire limpio • Fresco`;
  if (family === "Herbal") return `${name} • Verde • Natural`;
  if (family === "Floral") return `${name} • Floral • Suave`;
  if (family === "Especiado") return `${name} • Especias • Cálido`;
  return `${name} • Madera • Profundo`;
}

function makeFeeling(intentions){
  if (intentions.includes("Dormir")) return "Calma, descanso, mente suave";
  if (intentions.includes("Relajación")) return "Anti-estrés, armonía, paz";
  if (intentions.includes("Limpieza energética")) return "Purificación, protección, renovación";
  if (intentions.includes("Energía / motivación")) return "Activación, enfoque, motivación";
  if (intentions.includes("Amor / armonía")) return "Romántico, envolvente, tierno";
  return "Profundo, introspectivo, espiritual";
}

function makeBullets(intentions, family){
  const b = [];
  b.push(`Familia aromática: ${family}`);
  if (intentions.includes("Relajación")) b.push("Ideal para bajar estrés y ansiedad");
  if (intentions.includes("Dormir")) b.push("Perfecto para ritual nocturno");
  if (intentions.includes("Meditación")) b.push("Apoya introspección y yoga");
  if (intentions.includes("Limpieza energética")) b.push("Ayuda a limpiar el ambiente");
  if (intentions.includes("Energía / motivación")) b.push("Te activa para estudiar o trabajar");
  if (intentions.includes("Amor / armonía")) b.push("Aroma ideal para regalo y romance");
  return b.slice(0,4);
}

function makeAlso(intentions, name){
  // recomendaciones básicas
  if (intentions.includes("Dormir")) return ["English Lavender","Chamomile","Sandalwood"].filter(x=>x!==name).slice(0,3);
  if (intentions.includes("Limpieza energética")) return ["White Sage","Palo Santo","Casa Pura"].filter(x=>x!==name).slice(0,3);
  if (intentions.includes("Energía / motivación")) return ["Rosemary (Romero)","Eucalyptus (Eucalipto)","Lemongrass"].filter(x=>x!==name).slice(0,3);
  if (intentions.includes("Amor / armonía")) return ["Rose","Vanilla Rose","Jasmine"].filter(x=>x!==name).slice(0,3);
  if (intentions.includes("Meditación")) return ["Nag Champa","Sandalwood (Sándalo)","7 Chakras"].filter(x=>x!==name).slice(0,3);
  return ["Casa Pura","Vanilla","Sandalwood (Sándalo)"].filter(x=>x!==name).slice(0,3);
}

/* ========= Estado filtros ========= */
let activeIntention = null;
let activeFamily = null;
let searchText = "";

/* ========= Init ========= */
document.addEventListener("DOMContentLoaded", () => {
  // chips
  renderChips("chipsIntencion", INTENCIONES, (v) => {
    activeIntention = (activeIntention === v) ? null : v;
    renderChips("chipsIntencion", INTENCIONES, onChipIntentionClick, activeIntention);
    applyFilters();
  }, null);

  renderChips("chipsFamilia", FAMILIAS, (v) => {
    activeFamily = (activeFamily === v) ? null : v;
    renderChips("chipsFamilia", FAMILIAS, onChipFamilyClick, activeFamily);
    applyFilters();
  }, null);

  // buscador
  const s = document.getElementById("searchInputInc");
  if (s) {
    s.addEventListener("input", (e) => {
      searchText = (e.target.value || "").trim().toLowerCase();
      applyFilters();
    });
  }

  // quiz opciones
  fillQuiz();

  // render inicial
  applyFilters();
  updateCounts();
});

/* para re-render de chips con active */
function onChipIntentionClick(v){
  activeIntention = (activeIntention === v) ? null : v;
  renderChips("chipsIntencion", INTENCIONES, onChipIntentionClick, activeIntention);
  applyFilters();
}
function onChipFamilyClick(v){
  activeFamily = (activeFamily === v) ? null : v;
  renderChips("chipsFamilia", FAMILIAS, onChipFamilyClick, activeFamily);
  applyFilters();
}

function renderChips(containerId, list, onClick, activeValue=null){
  const box = document.getElementById(containerId);
  if (!box) return;
  box.innerHTML = "";
  list.forEach(v => {
    const chip = document.createElement("button");
    chip.className = "chip" + (activeValue === v ? " active" : "");
    chip.type = "button";
    chip.textContent = v;
    chip.onclick = () => onClick(v);
    box.appendChild(chip);
  });
}

/* ========= Filtrado + Grid ========= */
function applyFilters(){
  let arr = [...PRODUCTS];

  if (activeIntention) {
    arr = arr.filter(p => p.intentions.includes(activeIntention));
  }
  if (activeFamily) {
    arr = arr.filter(p => p.family === activeFamily);
  }
  if (searchText) {
    arr = arr.filter(p =>
      p.name.toLowerCase().includes(searchText) ||
      (p.notes || "").toLowerCase().includes(searchText)
    );
  }

  renderGrid(arr);
}

function clearIncenseFilters(){
  activeIntention = null;
  activeFamily = null;
  searchText = "";
  const s = document.getElementById("searchInputInc");
  if (s) s.value = "";

  renderChips("chipsIntencion", INTENCIONES, onChipIntentionClick, null);
  renderChips("chipsFamilia", FAMILIAS, onChipFamilyClick, null);

  applyFilters();
}

/* ========= Cards ========= */
function renderGrid(list){
  const grid = document.getElementById("incenseGrid");
  if (!grid) return;

  grid.innerHTML = "";
  if (list.length === 0) {
    grid.innerHTML = `<div class="muted">No encontramos resultados con esos filtros.</div>`;
    return;
  }

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = p.id;

    const isF = fav.includes(p.id);

    card.innerHTML = `
      <img src="${p.images[0]}" alt="${p.name}">
      <div class="card-body">
        <div class="card-title">${p.name}</div>

        <div class="muted" style="margin-bottom:8px;">
          ${p.family} • ${p.notes}
        </div>

        <div class="muted" style="margin-bottom:10px;">
          <strong>Ideal para:</strong> ${p.intentions.slice(0,2).join(" • ")}
        </div>

        <div class="price">
          <div class="now">${money(p.priceNow)}</div>
        </div>

        <div class="card-actions">
          <a class="btn outline small" href="producto.html?id=${p.id}">Ver producto</a>

          <button class="btn ghost small" onclick="toggleFavoriteById('${p.id}')">
            ${isF ? "❤️" : "🤍"} 
          </button>

          <button class="btn outline small" onclick="addToCartById('${p.id}', 1)">Agregar</button>

          <button class="btn primary small" onclick="buyNowById('${p.id}')">Comprar ahora</button>

          <button class="btn outline small" onclick="payWePayById('${p.id}')">WePay</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ========= Quiz 30 segundos ========= */
function fillQuiz(){
  // No cambiamos tu HTML: usamos tus selects existentes (tGoal, tTaste, tPlace)
  // Tus opciones ya están en el HTML, no hace falta llenarlas.
}

function runMiniTest(){
  const goal  = document.getElementById("tGoal")?.value || "";
  const taste = document.getElementById("tTaste")?.value || "";
  const place = document.getElementById("tPlace")?.value || "";

  if (!goal || !taste || !place) {
    setTestResult("Elige las 3 opciones y te recomiendo los mejores.");
    return;
  }

  // Mapear quiz -> intenciones/familias
  const goalToInt = {
    "Relajarme": "Relajación",
    "Energizarme": "Energía / motivación",
    "Dormir mejor": "Dormir",
    "Limpiar energías": "Limpieza energética",
    "Armonía / Amor": "Amor / armonía",
    "Enfoque": "Energía / motivación",
  };

  const tasteToFam = {
    "Dulces": "Dulce",
    "Frescos": "Fresco",
    "Naturales (herbales)": "Herbal",
    "Intensos (amaderados)": "Amaderado",
    "Floral suave": "Floral",
  };

  const wantedInt = goalToInt[goal] || null;
  const wantedFam = tasteToFam[taste] || null;

  // scoring
  const scored = PRODUCTS.map(p => {
    let score = 0;
    if (wantedInt && p.intentions.includes(wantedInt)) score += 3;
    if (wantedFam && p.family === wantedFam) score += 2;
    if ((p.places || []).includes(place)) score += 1;

    // pequeño bonus si coincide con “hogar” y eligió sala
    if (place.includes("Sala") && p.intentions.includes("Hogar / ambiente")) score += 1;

    return { p, score };
  }).sort((a,b) => b.score - a.score);

  const top = scored.slice(0, 4).map(x => x.p);
  setTestResult(
    `Te recomiendo: <strong>${top.slice(0,2).map(x=>x.name).join("</strong> y <strong>")}</strong>. 
     Abajo te marco 4 opciones ideales.`
  );

  // highlight + scroll
  highlightCards(top.map(x => x.id));
  const first = document.querySelector(`[data-id="${top[0].id}"]`);
  if (first) first.scrollIntoView({ behavior:"smooth", block:"start" });
}

function setTestResult(html){
  const box = document.getElementById("testResult");
  if (box) box.innerHTML = html;
}

function highlightCards(ids){
  document.querySelectorAll(".card").forEach(c => c.classList.remove("card-highlight"));
  ids.forEach(id => {
    const el = document.querySelector(`[data-id="${id}"]`);
    if (el) el.classList.add("card-highlight");
  });
}

/* ========= Favoritos ========= */
function toggleFavoriteById(id){
  if (fav.includes(id)) fav = fav.filter(x => x !== id);
  else fav.push(id);
  save(LS_FAV, fav);
  updateCounts();
  applyFilters();
}

function openFavorites(){
  const modal = document.getElementById("favModal");
  const grid = document.getElementById("favGrid");
  if (!modal || !grid) return;

  const items = fav.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  grid.innerHTML = "";

  if (items.length === 0) {
    grid.innerHTML = `<div class="muted">Aún no tienes favoritos.</div>`;
  } else {
    items.forEach(p => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${p.images[0]}" alt="${p.name}">
        <div class="card-body">
          <div class="card-title">${p.name}</div>
          <div class="muted">${p.notes}</div>
          <div class="price"><div class="now">${money(p.priceNow)}</div></div>
          <div class="card-actions">
            <a class="btn outline small" href="producto.html?id=${p.id}">Ver producto</a>
            <button class="btn ghost small" onclick="toggleFavoriteById('${p.id}')">Quitar</button>
            <button class="btn primary small" onclick="addToCartById('${p.id}',1)">Agregar</button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  modal.classList.add("open");
}
function closeFavorites(){ document.getElementById("favModal")?.classList.remove("open"); }

/* ========= Carrito ========= */
function addToCartById(id, qty){
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;

  // item simple (variant fija)
  const variant = p.variant || "Caja 1 unidad";
  const existing = cart.find(x => x.id === id && x.variant === variant);

  if (existing) existing.qty += qty;
  else cart.push({ id, variant, qty });

  save(LS_CART, cart);
  updateCounts();
  openCart();
}

function openCart(){
  renderCart();
  document.getElementById("cartModal")?.classList.add("open");
}
function closeCart(){ document.getElementById("cartModal")?.classList.remove("open"); }

function renderCart(){
  const list = document.getElementById("cartList");
  const totalEl = document.getElementById("cartTotal");
  if (!list || !totalEl) return;

  list.innerHTML = "";

  if (cart.length === 0) {
    list.innerHTML = `<div class="muted">Tu carrito está vacío.</div>`;
    totalEl.textContent = money(0);
    return;
  }

  let total = 0;

  cart.forEach((item, idx) => {
    const p = PRODUCTS.find(x => x.id === item.id);
    if (!p) return;

    const sub = p.priceNow * item.qty;
    total += sub;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${p.images[0]}" alt="${p.name}">
      <div>
        <h4>${p.name}</h4>
        <div class="muted">${item.variant}</div>
        <div class="muted">${p.family} • ${p.notes}</div>
        <div class="now" style="margin-top:8px;">${money(sub)}</div>
      </div>
      <div class="cart-qty">
        <button onclick="decQty(${idx})">−</button>
        <div style="min-width:24px; text-align:center; font-weight:900;">${item.qty}</div>
        <button onclick="incQty(${idx})">+</button>
        <button onclick="removeCart(${idx})" title="Eliminar">🗑️</button>
      </div>
    `;
    list.appendChild(row);
  });

  totalEl.textContent = money(total);
}

function incQty(i){ cart[i].qty++; save(LS_CART, cart); renderCart(); updateCounts(); }
function decQty(i){
  cart[i].qty--;
  if (cart[i].qty <= 0) cart.splice(i, 1);
  save(LS_CART, cart);
  renderCart();
  updateCounts();
}
function removeCart(i){ cart.splice(i,1); save(LS_CART, cart); renderCart(); updateCounts(); }

/* ========= Comprar ahora / WePay ========= */
function buyNowById(id){
  openCheckout([{ id, variant: "Caja 1 unidad", qty: 1 }], "whatsapp");
}
function payWePayById(id){
  openCheckout([{ id, variant: "Caja 1 unidad", qty: 1 }], "wepay");
}
function checkout(){
  if (cart.length === 0) return;
  openCheckout(cart, "wepay");
}

function openCheckout(orderItems, mode){
  const modal = document.getElementById("checkoutModal");
  const body  = document.getElementById("checkoutBody");
  if (!modal || !body) return;

  let total = 0;

  const htmlItems = orderItems.map(it => {
    const p = PRODUCTS.find(x => x.id === it.id);
    const sub = (p?.priceNow || 0) * it.qty;
    total += sub;
    return `
      <div class="cart-item" style="grid-template-columns:70px 1fr auto;">
        <img src="${p.images[0]}" alt="${p.name}" style="width:70px; height:60px;">
        <div>
          <h4>${p.name}</h4>
          <div class="muted">${it.variant} • Cantidad: ${it.qty}</div>
        </div>
        <div class="now">${money(sub)}</div>
      </div>
    `;
  }).join("");

  const payLine = (mode === "wepay")
    ? `<div class="muted" style="margin-top:10px;"><strong>Método:</strong> Pagar online (WePay) — demo</div>`
    : `<div class="muted" style="margin-top:10px;"><strong>Método:</strong> Comprar ahora (WhatsApp) — demo</div>`;

  body.innerHTML = `
    <div class="muted" style="margin-bottom:10px;">Revisa tu pedido antes de confirmar.</div>
    ${htmlItems}
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px;">
      <div class="now">Total</div>
      <div class="now">${money(total)}</div>
    </div>

    ${payLine}

    <div class="reviews" style="margin-top:12px;">
      <div class="muted"><strong>Datos de compra</strong></div>
      <div class="pdp-row" style="margin-top:10px;">
        <input id="cName" placeholder="Nombre" style="padding:12px;border-radius:14px;border:1px solid var(--border);background:rgba(255,255,255,.6);color:var(--text);">
        <input id="cPhone" placeholder="Teléfono" style="padding:12px;border-radius:14px;border:1px solid var(--border);background:rgba(255,255,255,.6);color:var(--text);">
      </div>
      <div class="pdp-row" style="margin-top:8px;">
        <input id="cAddress" placeholder="Dirección (opcional)" style="width:100%;padding:12px;border-radius:14px;border:1px solid var(--border);background:rgba(255,255,255,.6);color:var(--text);">
      </div>
      <div class="muted" style="margin-top:8px;">Después conectamos WePay real o WhatsApp real.</div>
    </div>
  `;

  modal.classList.add("open");
}

function closeCheckout(){ document.getElementById("checkoutModal")?.classList.remove("open"); }

function confirmOrder(){
  closeCheckout();
  closeCart();

  // demo: vaciamos carrito
  cart = [];
  save(LS_CART, cart);
  updateCounts();

  alert("✅ Pedido confirmado (simulado). Luego conectamos pago real WePay.");
}

/* ========= Contadores ========= */
function updateCounts(){
  const cartCount = cart.reduce((a, x) => a + (x.qty || 0), 0);
  const cartEl = document.getElementById("cartCount");
  const favEl  = document.getElementById("favCount");
  if (cartEl) cartEl.textContent = `(${cartCount})`;
  if (favEl)  favEl.textContent  = `(${fav.length})`;
}

/* ========= Exponer funciones al HTML ========= */
window.clearIncenseFilters = clearIncenseFilters;
window.runMiniTest = runMiniTest;

window.openFavorites = openFavorites;
window.closeFavorites = closeFavorites;

window.openCart = openCart;
window.closeCart = closeCart;
window.checkout = checkout;

window.toggleFavoriteById = toggleFavoriteById;
window.addToCartById = addToCartById;
window.buyNowById = buyNowById;
window.payWePayById = payWePayById;

window.closeCheckout = closeCheckout;
window.confirmOrder = confirmOrder;
