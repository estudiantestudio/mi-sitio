/* ========= INTENCIONES (LISTA OFICIAL) ========= */
const INTENCIONES = {
  "Relajación / Anti-estrés 🌙": [
    "Lavanda (English Lavender)",
    "Manzanilla (Chamomile)",
    "Rosa (Rose)",
    "Vainilla (Vanilla)",
    "Vanilla Rose",
    "Mirra (Myrrh)",
    "Sandalwood",
    "Chandan (sándalo indio)",
    "Jasmine (Jazmín)",
    "Casa Pura",
    "Anahata (chakra corazón – LOVE)",
    "Sahasrara (chakra corona – SPIRIT)",
  ],
  "Meditación / Espiritualidad 🧘": [
    "Nag Champa",
    "Champa",
    "Patchouli",
    "Ajna (INSIGHT)",
    "Vishuddha (TRUTH)",
    "Svadhishthana (FLOW)",
    "Muladhara (ROOT)",
    "Sahasrara (SPIRIT)",
    "Oud Crystal",
  ],
  "Limpieza energética / Protección 🔥": [
    "Palo Santo",
    "Palo Santo + Romero",
    "Palo Santo + Rosa",
    "Palo Santo + Lemongrass",
    "Palo Santo + Yagra",
    "Palo Santo + Manzanilla",
    "Palo Santo + Eucalipto",
    "Aruda (Ruda)",
    "After Scent",
    "Yagra",
  ],
  "Energía / Enfoque / Activación ⚡": [
    "Eucalipto",
    "Lemongrass",
    "Rosemary (Romero)",
    "Manipura (POWER)",
    "Powers",
    "Cinnamon (Canela)",
  ],
  "Dulces / Cálidos / Sensoriales 🍯": [
    "Vainilla",
    "Vanilla Rose",
    "Canela",
    "Rosa",
    "Oud Crystal",
    "Sandalwood",
  ],
  "Naturales / Herbales 🌿": [
    "Eucalipto",
    "Lemongrass",
    "Rosemary",
    "Patchouli",
    "Aruda",
    "Palo Santo",
    "Casa Pura",
  ],
};

/* ========= DATOS (EDITA AQUÍ tus productos) ========= */
const PRODUCTS = [
  {
    id: "incienso-romero",
    name: "Incienso de Romero – Enfoque natural",
    hook: "Claridad mental y energía suave para días de estudio o trabajo.",
    priceNow: 7490,
    priceWas: 9490,
    badge: "TOP",
    rating: 4.9,
    reviews: 120,
    family: "Herbal",
    notes: "Romero • Verde • Fresco",
    feeling: "Enfoque, claridad, motivación",
    duration: "45–60 min",
    place: "Oficina, sala, escritorio",
    ideal: "Enfoque • Rutina productiva • Motivación",
    not: "Si prefieres aromas muy dulces",
    bullets: [
      "Aroma herbal limpio y estimulante",
      "Ideal para enfoque y energía/ motivación",
      "Formato premium, encendido uniforme",
    ],
    story:
      "El romero es símbolo de claridad mental y energía. Su aroma herbal ayuda a mantener la concentración y crear un ambiente activo sin ser invasivo.",
    also: ["Eucalipto", "Menta", "Sándalo"],
    variants: ["20 varillas", "30 varillas", "Pack 2 unidades"],
    images: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",
    ],
    type: "Inciensos",
    intenciones: ["Energía / Enfoque / Activación ⚡", "Naturales / Herbales 🌿"],
  },

  {
    id: "incienso-vainilla",
    name: "Incienso de Vainilla – Calma dulce",
    hook: "Un abrazo cálido para bajar el estrés y sentir armonía.",
    priceNow: 7990,
    priceWas: null,
    badge: "NUEVO",
    rating: 4.8,
    reviews: 62,
    family: "Dulce",
    notes: "Vainilla • Coco • Ámbar",
    feeling: "Calma, confort, armonía",
    duration: "45–60 min",
    place: "Dormitorio, sala",
    ideal: "Relajación • Dormir • Hogar / ambiente",
    not: "Si prefieres aromas frescos/herbales",
    bullets: [
      "Aroma dulce y suave (no invasivo)",
      "Ideal para relajación y descanso",
      "Perfecto para hogar y ambientes cálidos",
    ],
    story:
      "La vainilla se asocia con confort y calidez. Ayuda a crear ambientes acogedores, ideales para desconectar al final del día.",
    also: ["Lavanda", "Rosa", "Manzanilla"],
    variants: ["20 varillas", "30 varillas"],
    images: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80",
    ],
    type: "Inciensos",
    intenciones: ["Relajación / Anti-estrés 🌙", "Dulces / Cálidos / Sensoriales 🍯"],
  },

  {
    id: "incienso-lavanda",
    name: "Incienso de Lavanda – Relajación profunda",
    hook: "Baja la ansiedad y crea un ambiente de paz real.",
    priceNow: 7490,
    priceWas: 8990,
    badge: null,
    rating: 4.9,
    reviews: 210,
    family: "Floral",
    notes: "Lavanda • Jazmín • Suave",
    feeling: "Calma, equilibrio, descanso",
    duration: "45–60 min",
    place: "Dormitorio, baño",
    ideal: "Relajación • Dormir • Meditación",
    not: "Si eres sensible a aromas florales",
    bullets: [
      "Aroma floral calmante",
      "Ideal para dormir mejor y meditar",
      "Ambiente suave y equilibrado",
    ],
    story:
      "La lavanda se usa desde la antigüedad para calmar la mente y equilibrar las emociones. Su aroma crea un espacio de paz y descanso.",
    also: ["Vainilla", "Manzanilla", "Rosa"],
    variants: ["20 varillas", "30 varillas", "Pack 2 unidades"],
    images: [
      "https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80",
    ],
    type: "Inciensos",
    intenciones: ["Relajación / Anti-estrés 🌙", "Meditación / Espiritualidad 🧘"],
  },
];

/* ========= UTIL ========= */
const money = (n) => "$" + (n || 0).toLocaleString("es-CL");
const getIdFromUrl = () =>
  new URLSearchParams(location.search).get("id") || "incienso-romero";
const findProduct = (id) => PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

const LS_CART = "ch_cart_v1";
const LS_FAV = "ch_fav_v1";

const load = (k, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(k)) ?? fallback;
  } catch {
    return fallback;
  }
};
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

let cart = load(LS_CART, []); // [{id, variant, qty}]
let fav = load(LS_FAV, []); // [id]
let current = findProduct(getIdFromUrl());

/* ========= RENDER PDP ========= */
function renderPDP() {
  // Título / texto
  document.getElementById("pName").textContent = current.name;
  document.getElementById("pHook").textContent = current.hook;
  document.getElementById(
    "pRating"
  ).textContent = `⭐ ${current.rating} • ${current.reviews} reseñas`;

  // Badge
  const badge = document.getElementById("pBadge");
  if (current.badge) {
    badge.style.display = "inline-block";
    badge.textContent = current.badge;
  } else {
    badge.style.display = "none";
  }

  // Bullets
  const ul = document.getElementById("pBullets");
  ul.innerHTML = "";
  current.bullets.forEach((b) => {
    const li = document.createElement("li");
    li.textContent = b;
    ul.appendChild(li);
  });

  // Precio
  document.getElementById("pNow").textContent = money(current.priceNow);
  const pWas = document.getElementById("pWas");
  if (current.priceWas) {
    pWas.style.display = "block";
    pWas.textContent = money(current.priceWas);
  } else {
    pWas.style.display = "none";
  }

  // Perfil
  document.getElementById("pFamily").textContent = current.family;
  document.getElementById("pNotes").textContent = current.notes;
  document.getElementById("pFeeling").textContent = current.feeling;
  document.getElementById("pDuration").textContent = current.duration;
  document.getElementById("pPlace").textContent = current.place;

  // ✅ NUEVO: Uso / intención (si existe el span en producto.html)
  const elInt = document.getElementById("pIntenciones");
  if (elInt) {
    elInt.textContent =
      current.intenciones && current.intenciones.length
        ? current.intenciones.join(" • ")
        : "—";
  }

  document.getElementById("pIdeal").textContent = current.ideal;
  document.getElementById("pNot").textContent = current.not;
  document.getElementById("pStory").textContent = current.story;
  document.getElementById("pAlso").textContent = current.also.join(" • ");

  // Variantes
  const vs = document.getElementById("variantSelect");
  vs.innerHTML = "";
  current.variants.forEach((v) => {
    const opt = document.createElement("option");
    opt.value = v;
    opt.textContent = v;
    vs.appendChild(opt);
  });

  // Galería
  const main = document.getElementById("mainImg");
  main.src = current.images[0];

  const thumbs = document.getElementById("thumbs");
  thumbs.innerHTML = "";
  current.images.forEach((src, idx) => {
    const im = document.createElement("img");
    im.src = src;
    im.alt = `${current.name} - foto ${idx + 1}`;
    im.onclick = () => (main.src = src);
    thumbs.appendChild(im);
  });

  // Favorito button state
  updateFavButton();

  // Related
  renderRelated();
  updateCounts();
}

function renderRelated() {
  const grid = document.getElementById("relatedGrid");
  grid.innerHTML = "";

  // ✅ Recomendados por intención real
  const related = PRODUCTS.filter((p) => {
    if (p.id === current.id) return false;
    if (p.type !== current.type) return false;

    const a = new Set(current.intenciones || []);
    const b = p.intenciones || [];
    return b.some((x) => a.has(x));
  }).slice(0, 4);

  related.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.images[0]}" alt="${p.name}">
      <div class="card-body">
        <div class="card-title">${p.name}</div>
        <div class="rating">⭐ ${p.rating}</div>
        <div class="price">
          <div class="now">${money(p.priceNow)}</div>
          ${p.priceWas ? `<div class="was">${money(p.priceWas)}</div>` : ``}
        </div>
        <div class="card-actions">
          <a class="btn outline small" href="producto.html?id=${p.id}">Ver producto</a>
          <button class="btn primary small" onclick="quickAdd('${p.id}')">Agregar</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  if (related.length === 0) {
    grid.innerHTML = `<div class="muted">Aún no hay recomendaciones por intención (agrega más productos).</div>`;
  }
}

function quickAdd(id) {
  const p = findProduct(id);
  cart.push({ id: p.id, variant: p.variants[0], qty: 1 });
  save(LS_CART, cart);
  updateCounts();
  openCart();
}

/* ========= FAVORITOS ========= */
function isFav(id) {
  return fav.includes(id);
}

function updateFavButton() {
  const btn = document.getElementById("favBtn");
  if (!btn) return;
  btn.textContent = isFav(current.id)
    ? "❤️ Quitar de favoritos"
    : "❤️ Agregar a favoritos";
}

function toggleFavorite() {
  if (isFav(current.id)) fav = fav.filter((x) => x !== current.id);
  else fav.push(current.id);

  save(LS_FAV, fav);
  updateFavButton();
  updateCounts();
}

function openFavorites() {
  const modal = document.getElementById("favModal");
  const grid = document.getElementById("favGrid");
  grid.innerHTML = "";

  const items = fav.map((id) => findProduct(id)).filter(Boolean);

  if (items.length === 0) {
    grid.innerHTML = `<div class="muted">Aún no tienes favoritos.</div>`;
  } else {
    items.forEach((p) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${p.images[0]}" alt="${p.name}">
        <div class="card-body">
          <div class="card-title">${p.name}</div>
          <div class="muted">${p.hook}</div>
          <div class="price"><div class="now">${money(p.priceNow)}</div></div>
          <div class="card-actions">
            <a class="btn outline small" href="producto.html?id=${p.id}">Ver</a>
            <button class="btn ghost small" onclick="removeFav('${p.id}')">Quitar</button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  modal.classList.add("open");
}
function closeFavorites() {
  document.getElementById("favModal").classList.remove("open");
}
function removeFav(id) {
  fav = fav.filter((x) => x !== id);
  save(LS_FAV, fav);
  updateCounts();
  openFavorites();
}

/* ========= CARRITO ========= */
function addToCart() {
  const variant = document.getElementById("variantSelect").value;
  const qty = parseInt(document.getElementById("qtySelect").value, 10);

  const existing = cart.find((x) => x.id === current.id && x.variant === variant);
  if (existing) existing.qty += qty;
  else cart.push({ id: current.id, variant, qty });

  save(LS_CART, cart);
  updateCounts();
  openCart();
}

function openCart() {
  renderCart();
  document.getElementById("cartModal").classList.add("open");
}
function closeCart() {
  document.getElementById("cartModal").classList.remove("open");
}

function renderCart() {
  const list = document.getElementById("cartList");
  list.innerHTML = "";

  if (cart.length === 0) {
    list.innerHTML = `<div class="muted">Tu carrito está vacío.</div>`;
    document.getElementById("cartTotal").textContent = money(0);
    return;
  }

  let total = 0;

  cart.forEach((item, idx) => {
    const p = findProduct(item.id);
    const sub = p.priceNow * item.qty;
    total += sub;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${p.images[0]}" alt="${p.name}">
      <div>
        <h4>${p.name}</h4>
        <div class="muted">${item.variant}</div>
        <div class="muted">Aroma: ${p.family} • ${p.notes}</div>
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

  document.getElementById("cartTotal").textContent = money(total);
}

function incQty(i) {
  cart[i].qty++;
  save(LS_CART, cart);
  renderCart();
  updateCounts();
}
function decQty(i) {
  cart[i].qty--;
  if (cart[i].qty <= 0) cart.splice(i, 1);
  save(LS_CART, cart);
  renderCart();
  updateCounts();
}
function removeCart(i) {
  cart.splice(i, 1);
  save(LS_CART, cart);
  renderCart();
  updateCounts();
}

/* ========= COMPRAR AHORA / CHECKOUT ========= */
function buyNow() {
  const variant = document.getElementById("variantSelect").value;
  const tempOrder = [{ id: current.id, variant, qty: 1 }];
  openCheckout(tempOrder);
}

function checkout() {
  if (cart.length === 0) return;
  openCheckout(cart);
}

function openCheckout(orderItems) {
  const modal = document.getElementById("checkoutModal");
  const body = document.getElementById("checkoutBody");

  let total = 0;

  const htmlItems = orderItems
    .map((it) => {
      const p = findProduct(it.id);
      const sub = p.priceNow * it.qty;
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
    })
    .join("");

  body.innerHTML = `
    <div class="muted" style="margin-bottom:10px;">Revisa tu pedido antes de confirmar.</div>
    ${htmlItems}
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px;">
      <div class="now">Total</div>
      <div class="now">${money(total)}</div>
    </div>

    <div class="reviews" style="margin-top:12px;">
      <div class="muted"><strong>Datos de compra (ejemplo)</strong></div>
      <div class="pdp-row" style="margin-top:10px;">
        <input id="cName" placeholder="Nombre" style="padding:12px;border-radius:14px;border:1px solid var(--border);background:rgba(255,255,255,.6);color:var(--text);">
        <input id="cPhone" placeholder="Teléfono" style="padding:12px;border-radius:14px;border:1px solid var(--border);background:rgba(255,255,255,.6);color:var(--text);">
      </div>
      <div class="pdp-row" style="margin-top:8px;">
        <input id="cAddress" placeholder="Dirección (opcional)" style="width:100%;padding:12px;border-radius:14px;border:1px solid var(--border);background:rgba(255,255,255,.6);color:var(--text);">
      </div>
      <div class="muted" style="margin-top:8px;">Luego esto lo conectamos a pago real.</div>
    </div>
  `;

  modal.classList.add("open");
}

function closeCheckout() {
  document.getElementById("checkoutModal").classList.remove("open");
}

function confirmOrder() {
  closeCheckout();
  closeCart();

  cart = [];
  save(LS_CART, cart);
  updateCounts();

  alert("✅ Pedido confirmado (simulado).");
}

/* ========= COUNTS ========= */
function updateCounts() {
  const cartCount = cart.reduce((a, x) => a + (x.qty || 0), 0);

  const elCart = document.getElementById("cartCount");
  const elFav = document.getElementById("favCount");

  if (elCart) elCart.textContent = `(${cartCount})`;
  if (elFav) elFav.textContent = `(${fav.length})`;
}

/* ========= INIT ========= */
renderPDP();


