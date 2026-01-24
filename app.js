/* ========= CONFIG ========= */
const WHATSAPP_NUMBER = "569XXXXXXXX";      // <-- CAMBIA POR TU NÚMERO (Chile: 56912345678)
const WEPAY_LINK = "https://TU-LINK-WEPAY"; // <-- PEGA TU LINK REAL (o deja "" para solo WhatsApp)

const SHIPPING_FREE_FROM = 45000; // “Envío gratis desde $45.000”

/* ========= DATA: PRODUCTOS (EDITA ESTO CON TU INFO REAL) ========= */
const PRODUCTS = [
  {
    id: "incienso-sagrada-flor",
    name: "✨ Incienso Sagrada Flor – 30 varillas",
    tipo: "Inciensos",
    intencion: "Meditación",
    aroma: "Floral",
    coleccion: "Ritual y meditación",
    tag: ["NUEVO", "TOP"],
    rating: 4.9,
    price: 7990,
    wasPrice: 9990,
    stock: 6, // pocas unidades = urgencia
    images: [
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80"
    ],
    bullets: [
      "Aroma floral + sutil",
      "Ideal para meditación / estudio",
      "100% natural, hecho a mano"
    ],
    desc: "Aromas / esencias naturales con enfoque en calma, purificación y concentración.",
    options: {
      tamano: ["30 varillas", "60 varillas"],
      fragancia: ["Floral", "Floral + Herbal"],
      set: ["Individual", "Set x2", "Set x3"]
    },
    shipping: {
      cost: "Desde $3.990",
      time: "1–3 días hábiles",
      freeFrom: SHIPPING_FREE_FROM
    },
    reviews: [
      { who: "Camila", stars: 5, text: "Me dio mucha calma, el aroma es suave y elegante." },
      { who: "Javiera", stars: 5, text: "Perfecto para estudiar, se siente muy natural." }
    ]
  },

  {
    id: "vela-luna-tierra",
    name: "🕯️ Vela Artesanal Luna Tierra – 220g",
    tipo: "Velas",
    intencion: "Relajación",
    aroma: "Herbal",
    coleccion: "Ambientación para el hogar",
    tag: ["NUEVO"],
    rating: 4.8,
    price: 14990,
    wasPrice: null,
    stock: 12,
    images: [
      "https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1400&q=80"
    ],
    bullets: [
      "Cera vegetal y fragancia premium",
      "Relajación y hogar acogedor",
      "Hecha a mano"
    ],
    desc: "Vela artesanal para crear ambientes tranquilos y cálidos.",
    options: {
      tamano: ["220g", "320g"],
      fragancia: ["Herbal", "Herbal + Amaderado"],
      set: ["Individual", "Set regalo"]
    },
    shipping: {
      cost: "Desde $3.990",
      time: "1–3 días hábiles",
      freeFrom: SHIPPING_FREE_FROM
    },
    reviews: [
      { who: "Sofía", stars: 5, text: "La uso en la noche, el olor es increíble." }
    ]
  },

  {
    id: "kit-ritual-calma",
    name: "🎁 Kit Ritual Calma (Incienso + Vela + Porta)",
    tipo: "Kits",
    intencion: "Ritual",
    aroma: "Amaderado",
    coleccion: "Sets para regalo",
    tag: ["TOP", "OFERTA"],
    rating: 4.9,
    price: 24990,
    wasPrice: 39990,
    stock: 3,
    images: [
      "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1512499617640-c2f999fe7f72?auto=format&fit=crop&w=1400&q=80"
    ],
    bullets: [
      "Set completo para ritual y relajación",
      "Aromas amaderados premium",
      "Regalo perfecto"
    ],
    desc: "El set ideal para regalar o comenzar tu rutina de bienestar.",
    options: {
      tamano: ["Set estándar"],
      fragancia: ["Amaderado", "Amaderado + Cítrico"],
      set: ["Kit completo"]
    },
    shipping: {
      cost: "Desde $3.990",
      time: "1–3 días hábiles",
      freeFrom: SHIPPING_FREE_FROM
    },
    reviews: [
      { who: "Martina", stars: 5, text: "Lo regalé y fue un éxito, presentación preciosa." }
    ]
  }
];

/* ========= HELPERS ========= */
const $ = (id) => document.getElementById(id);
const moneyCLP = (n) => n.toLocaleString("es-CL");
const priceText = (p) => `$${moneyCLP(p)}`;

function waLink(message){
  const msg = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

/* ========= GLOBAL FILTER STATE ========= */
let activeFilters = {
  tipo: "",
  intencion: "",
  aroma: "",
  rating: "",
  precio: "",
  coleccion: "",
  tag: ""
};

/* ========= FILTER API (para mega menú) ========= */
function setFilter(key, value){
  activeFilters[key] = value;
  // sincroniza selects si existen
  if (key === "tipo" && $("filterTipo")) $("filterTipo").value = value;
  if (key === "intencion" && $("filterIntencion")) $("filterIntencion").value = value;
  if (key === "aroma" && $("filterAroma")) $("filterAroma").value = value;
  if (key === "tag") activeFilters.tag = value;
  renderCatalog();
}

function clearFilters(){
  activeFilters = { tipo:"", intencion:"", aroma:"", rating:"", precio:"", coleccion:"", tag:"" };
  if ($("filterTipo")) $("filterTipo").value = "";
  if ($("filterIntencion")) $("filterIntencion").value = "";
  if ($("filterAroma")) $("filterAroma").value = "";
  if ($("filterRating")) $("filterRating").value = "";
  if ($("filterPrecio")) $("filterPrecio").value = "";
  if ($("searchInput")) $("searchInput").value = "";
  renderCatalog();
}

/* ========= NAV ACTIONS ========= */
function irAWhatsapp(){
  if (!WHATSAPP_NUMBER || WHATSAPP_NUMBER.includes("X")) {
    alert("Configura tu número de WhatsApp en app.js (WHATSAPP_NUMBER).");
    return;
  }
  window.open(waLink("Hola! Quiero comprar. ¿Me ayudas con el catálogo y el envío?"), "_blank");
}

/* ========= RENDER: HOME GRIDS ========= */
function makeCard(p){
  const isOffer = p.tag.includes("OFERTA");
  const isTop = p.tag.includes("TOP");
  const isNew = p.tag.includes("NUEVO");
  const lowStock = p.stock <= 5;

  const tags = [
    isNew ? `<span class="tag">NUEVO</span>` : "",
    isTop ? `<span class="tag">TOP</span>` : "",
    isOffer ? `<span class="tag">OFERTA</span>` : "",
    lowStock ? `<span class="tag">Últimas unidades</span>` : ""
  ].join("");

  return `
    <article class="card">
      <img src="${p.images[0]}" alt="${p.name}">
      <div class="card-body">
        <div class="card-title">${p.name}</div>
        <div class="rating">⭐ ${p.rating.toFixed(1)} • ${p.tipo} • ${p.intencion}</div>

        <div class="tagrow">${tags}</div>

        <div class="price">
          <div class="now">${priceText(p.price)}</div>
          ${p.wasPrice ? `<div class="was">${priceText(p.wasPrice)}</div>` : ""}
        </div>

        <div class="card-actions">
          <a class="btn primary small" href="product.html?id=${p.id}">Ver producto</a>
          <button class="btn ghost small" onclick="buyWhatsApp('${p.id}')">Comprar</button>
        </div>
      </div>
    </article>
  `;
}

function renderHome(){
  if (!$("newGrid")) return;

  const newest = PRODUCTS.filter(p => p.tag.includes("NUEVO")).slice(0, 4);
  const top = PRODUCTS.filter(p => p.tag.includes("TOP")).slice(0, 4);
  const offers = PRODUCTS.filter(p => p.tag.includes("OFERTA")).slice(0, 4);

  $("newGrid").innerHTML = newest.map(makeCard).join("");
  $("topGrid").innerHTML = top.map(makeCard).join("");
  $("offerGrid").innerHTML = offers.map(makeCard).join("");
}

/* ========= CATALOG FILTERING ========= */
function passesFilters(p, q){
  if (activeFilters.tag && !p.tag.includes(activeFilters.tag)) return false;
  if (activeFilters.coleccion && p.coleccion !== activeFilters.coleccion) return false;
  if (activeFilters.tipo && p.tipo !== activeFilters.tipo) return false;
  if (activeFilters.intencion && p.intencion !== activeFilters.intencion) return false;
  if (activeFilters.aroma && p.aroma !== activeFilters.aroma) return false;

  if (activeFilters.rating){
    const min = parseFloat(activeFilters.rating);
    if (p.rating < min) return false;
  }

  if (activeFilters.precio){
    const [minS,maxS] = activeFilters.precio.split("-");
    const min = parseInt(minS,10);
    const max = parseInt(maxS,10);
    if (p.price < min || p.price > max) return false;
  }

  if (q){
    const hay = (p.name + " " + p.tipo + " " + p.intencion + " " + p.aroma + " " + p.coleccion).toLowerCase();
    if (!hay.includes(q.toLowerCase())) return false;
  }

  return true;
}

function renderCatalog(){
  if (!$("catalogGrid")) return;

  const q = $("searchInput") ? $("searchInput").value.trim() : "";

  const list = PRODUCTS.filter(p => passesFilters(p, q));
  $("catalogGrid").innerHTML = list.map(makeCard).join("");

  // filtros select -> events
  if ($("filterTipo")){
    $("filterTipo").onchange = (e)=>{ activeFilters.tipo = e.target.value; renderCatalog(); };
    $("filterIntencion").onchange = (e)=>{ activeFilters.intencion = e.target.value; renderCatalog(); };
    $("filterAroma").onchange = (e)=>{ activeFilters.aroma = e.target.value; renderCatalog(); };
    $("filterRating").onchange = (e)=>{ activeFilters.rating = e.target.value; renderCatalog(); };
    $("filterPrecio").onchange = (e)=>{ activeFilters.precio = e.target.value; renderCatalog(); };
  }

  if ($("searchInput")){
    $("searchInput").oninput = ()=> renderCatalog();
  }
}

/* ========= BUY ACTIONS ========= */
function buyWhatsApp(id){
  const p = PRODUCTS.find(x => x.id === id);
  const msg =
`Hola! Quiero comprar:
- ${p.name}
- Precio: ${priceText(p.price)}
¿Me confirmas stock, envío y forma de pago?`;

  window.open(waLink(msg), "_blank");
}

function payOnline(id){
  if (!WEPAY_LINK || WEPAY_LINK.includes("TU-LINK")) {
    alert("Aún no configuraste tu link de WePay. Se enviará a WhatsApp.");
    buyWhatsApp(id);
    return;
  }
  window.open(WEPAY_LINK, "_blank");
}

/* ========= MEMBERSHIP ========= */
function subscribe(e){
  e.preventDefault();
  const email = $("emailInput").value.trim();
  // MVP: guardamos local y mostramos confirmación
  localStorage.setItem("memberEmail", email);
  openModal(`
    <h2>¡Listo! 💌</h2>
    <p class="muted">Quedaste registrado con: <strong>${email}</strong></p>
    <p class="muted">Te llegará tu 10% OFF y ofertas exclusivas.</p>
  `);
  $("emailInput").value = "";
  return false;
}

/* ========= GUIDES + POLICIES MODAL ========= */
function openGuide(key){
  const content = {
    incienso: `
      <h2>Cómo elegir tu incienso ideal</h2>
      <p class="muted">🔹 Floral: suave, calmante • 🔹 Amaderado: profundo, ritual • 🔹 Cítrico: energía • 🔹 Herbal: limpieza.</p>
      <ul class="bullets">
        <li>Elige por intención: relajación, enfoque o purificación.</li>
        <li>Ventila el espacio y usa porta incienso seguro.</li>
        <li>Menos es más: 10–15 min suelen ser suficientes.</li>
      </ul>
    `,
    ritual: `
      <h2>Ritual de relajación paso a paso</h2>
      <ol class="bullets">
        <li>Ordena el espacio (2 min).</li>
        <li>Enciende incienso/vela con intención.</li>
        <li>Respira 4-4-6 por 3 minutos.</li>
        <li>Agradece y apaga de forma segura.</li>
      </ol>
    `,
    velas: `
      <h2>Cuidado y limpieza de velas artesanales</h2>
      <ul class="bullets">
        <li>Primer uso: deja derretir toda la superficie.</li>
        <li>Corta la mecha a 5 mm.</li>
        <li>No dejes encendida sin supervisión.</li>
      </ul>
    `
  };
  openModal(content[key] || "<p class='muted'>Contenido no disponible.</p>");
}

function openPolicy(key){
  const content = {
    envios: `<h2>Envíos</h2><p class="muted">Envíos 1–3 días hábiles. Envío gratis desde ${priceText(SHIPPING_FREE_FROM)}.</p>`,
    devoluciones: `<h2>Devoluciones</h2><p class="muted">Tienes garantía y políticas claras. Escríbenos por WhatsApp para ayudarte.</p>`,
    politicas: `<h2>Políticas</h2><p class="muted">Privacidad, uso del sitio y compras. (MVP: puedes reemplazar este texto por tus políticas reales.)</p>`,
    faq: `<h2>FAQ</h2><p class="muted">Preguntas frecuentes sobre envíos, pagos y uso de productos.</p>`,
    terminos: `<h2>Términos y condiciones</h2><p class="muted">(MVP) Agrega aquí tus términos reales cuando los tengas.</p>`
  };
  openModal(content[key] || "<p class='muted'>No disponible.</p>");
}

function openModal(html){
  $("modalBody").innerHTML = html;
  $("modal").classList.add("open");
}
function closeModal(){
  $("modal").classList.remove("open");
}

/* ========= PDP ========= */
function getQueryParam(name){
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function renderPDP(){
  const container = $("pdpContainer");
  if (!container) return;

  const id = getQueryParam("id") || PRODUCTS[0].id;
  const p = PRODUCTS.find(x => x.id === id) || PRODUCTS[0];

  const lowStock = p.stock <= 5;

  container.innerHTML = `
    <div class="gallery">
      <div class="gallery-main">
        <img id="mainImg" src="${p.images[0]}" alt="${p.name}">
      </div>
      <div class="thumbs">
        ${p.images.map(src => `<img src="${src}" alt="thumb" onclick="swapImg('${src}')">`).join("")}
      </div>
    </div>

    <div class="pdp-info">
      <h1 class="pdp-title">${p.name} ${p.tag.includes("OFERTA") ? `<span class="badge-offer">Oferta por tiempo limitado</span>` : ""}</h1>

      <ul class="bullets">
        ${p.bullets.map(b=>`<li>${b}</li>`).join("")}
      </ul>

      <div class="price">
        <div class="now">${priceText(p.price)}</div>
        ${p.wasPrice ? `<div class="was">${priceText(p.wasPrice)}</div>` : ""}
        <div class="rating">⭐ ${p.rating.toFixed(1)} / 5</div>
      </div>

      <div class="pdp-row">
        <select id="optSize">${p.options.tamano.map(x=>`<option>${x}</option>`).join("")}</select>
        <select id="optFrag">${p.options.fragancia.map(x=>`<option>${x}</option>`).join("")}</select>
        <select id="optSet">${p.options.set.map(x=>`<option>${x}</option>`).join("")}</select>
      </div>

      <div class="pdp-row">
        <button class="btn primary" onclick="addToCart('${p.id}')">Agregar al carrito</button>
        <button class="btn ghost" onclick="buyWhatsAppPDP('${p.id}')">Comprar ahora (WhatsApp)</button>
        <button class="btn outline" onclick="payOnline('${p.id}')">Pagar online (WePay)</button>
      </div>

      <div class="pdp-meta">
        <p><strong>🚚 Envío:</strong> ${p.shipping.cost} • ${p.shipping.time} • Envío gratis desde ${priceText(p.shipping.freeFrom)}</p>
        <p><strong>📦 Stock:</strong> <span class="stock">${lowStock ? "Últimas unidades" : "Disponible"}</span> (${p.stock} u.)</p>
        <p><strong>🧠 Qué problema soluciona:</strong> ${p.desc}</p>
      </div>

      <div class="reviews">
        <h3>⭐ Reviews</h3>
        ${p.reviews.map(r => `
          <div class="review">
            <div class="stars">${"⭐".repeat(r.stars)}</div>
            <div class="who">${r.who}</div>
            <div class="muted">${r.text}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  // relacionados
  if ($("relatedGrid")){
    const related = PRODUCTS.filter(x => x.id !== p.id && (x.intencion === p.intencion || x.aroma === p.aroma)).slice(0,4);
    $("relatedGrid").innerHTML = related.map(makeCard).join("");
  }
}

function swapImg(src){
  const main = $("mainImg");
  if (main) main.src = src;
}

/* ========= CART (MVP) ========= */
function getCart(){
  return JSON.parse(localStorage.getItem("cart") || "[]");
}
function setCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id){
  const cart = getCart();
  cart.push({ id, qty: 1, ts: Date.now() });
  setCart(cart);
  openModal(`
    <h2>✅ Agregado al carrito</h2>
    <p class="muted">Producto agregado. Puedes comprar ahora por WhatsApp o pagar online.</p>
    <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
      <button class="btn primary" onclick="buyWhatsApp('${id}')">Comprar por WhatsApp</button>
      <button class="btn outline" onclick="payOnline('${id}')">Pagar online (WePay)</button>
      <button class="btn ghost" onclick="closeModal()">Seguir mirando</button>
    </div>
  `);
}

function buyWhatsAppPDP(id){
  const p = PRODUCTS.find(x => x.id === id);
  const size = $("optSize")?.value || "";
  const frag = $("optFrag")?.value || "";
  const set = $("optSet")?.value || "";

  const msg =
`Hola! Quiero comprar:
- ${p.name}
- Opción: ${size} / ${frag} / ${set}
- Precio: ${priceText(p.price)}
¿Me confirmas stock, envío y forma de pago?`;

  window.open(waLink(msg), "_blank");
}

/* ========= INIT ========= */
document.addEventListener("DOMContentLoaded", () => {
  renderHome();
  renderCatalog();

  // cerrar modal clic afuera
  document.addEventListener("click", (e) => {
    const modal = $("modal");
    if (modal && modal.classList.contains("open") && e.target === modal) closeModal();
  });
});


