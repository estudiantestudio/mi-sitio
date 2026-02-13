/* =========================
   MÁS VENDIDOS / TOP TENDENCIA
   ========================= */

/* ---- Productos de ejemplo (edita aquí) ----
   Tip: si un producto ya existe en tu producto.html/producto.js,
   usa el mismo id para que "Ver producto" funcione con ?id=
*/
const MV_PRODUCTS = [
  {
    id: "incienso-vanilla",
    name: "Incienso Vainilla – Calma dulce",
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    badge: "🔥 Bestseller",
    priceNow: 3990,
    priceWas: 4990,
    rating: 4.9,
    reviews: 210,
    soldText: "Más de 350 vendidos",
    stockText: "Quedan 7 unidades",
    shipText: "Envío rápido a todo Chile",
    trendingScore: 98,
    soldScore: 350
  },
  {
    id: "incienso-lavanda",
    name: "Incienso Lavanda – Relajación profunda",
    img: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=1200&q=80",
    badge: "⭐ Más vendido",
    priceNow: 3990,
    priceWas: 4490,
    rating: 4.8,
    reviews: 180,
    soldText: "Más de 290 vendidos",
    stockText: "Quedan 10 unidades",
    shipText: "Envío rápido a todo Chile",
    trendingScore: 92,
    soldScore: 290
  },
  {
    id: "incienso-eucalipto",
    name: "Incienso Eucalipto – Aire limpio",
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    badge: "💎 Trending",
    priceNow: 3990,
    priceWas: null,
    rating: 4.7,
    reviews: 95,
    soldText: "Más de 140 vendidos",
    stockText: "Quedan 12 unidades",
    shipText: "Envío rápido a todo Chile",
    trendingScore: 90,
    soldScore: 140
  },
  {
    id: "incienso-romero",
    name: "Incienso Romero – Enfoque natural",
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",
    badge: "🏆 Top tendencia 2026",
    priceNow: 3990,
    priceWas: 4590,
    rating: 4.9,
    reviews: 120,
    soldText: "Más de 220 vendidos",
    stockText: "Quedan 8 unidades",
    shipText: "Envío rápido a todo Chile",
    trendingScore: 96,
    soldScore: 220
  }
];

/* ---- Util ---- */
const money = (n) => "$" + (n || 0).toLocaleString("es-CL");

/* ---- Storage (mismo concepto que tu tienda) ---- */
const LS_CART = "ch_cart_v1";
const LS_FAV  = "ch_fav_v1";

const load = (k, fallback) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? fallback; }
  catch { return fallback; }
};
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

let cart = load(LS_CART, []); // [{id, qty}]
let fav  = load(LS_FAV, []);  // [id]

/* ---- DOM ---- */
const grid = document.getElementById("mvGrid");
const countLabel = document.getElementById("mvCountLabel");
const toast = document.getElementById("mvToast");

/* ---- Estado filtros ---- */
let query = "";
let sortMode = "trending";

/* =========================
   RENDER
   ========================= */
function render(){
  let items = [...MV_PRODUCTS];

  // search
  if (query.trim()){
    const q = query.trim().toLowerCase();
    items = items.filter(p => (p.name || "").toLowerCase().includes(q));
  }

  // sort
  items.sort((a,b) => {
    if (sortMode === "rating") return (b.rating||0) - (a.rating||0);
    if (sortMode === "sold") return (b.soldScore||0) - (a.soldScore||0);
    if (sortMode === "priceLow") return (a.priceNow||0) - (b.priceNow||0);
    if (sortMode === "priceHigh") return (b.priceNow||0) - (a.priceNow||0);
    return (b.trendingScore||0) - (a.trendingScore||0);
  });

  grid.innerHTML = "";
  items.forEach(p => grid.appendChild(cardEl(p)));

  countLabel.textContent = `${items.length} producto${items.length===1?"":"s"}`;
  updateCounts();
}

function stars(r){
  // simple: 0..5 redondeado a 0.5
  const v = Math.max(0, Math.min(5, r || 0));
  const full = Math.floor(v);
  const half = (v - full) >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
}

function isFav(id){ return fav.includes(id); }

function cardEl(p){
  const el = document.createElement("div");
  el.className = "card mv-card mv-fade";
  el.innerHTML = `
    <div class="mv-imgwrap">
      <img src="${p.img}" alt="${p.name}">
      ${p.badge ? `<div class="mv-badge">${p.badge}</div>` : ``}
    </div>

    <div class="card-body">
      <div class="card-title">${p.name}</div>

      <div class="mv-social">
        <span class="mv-stars" title="Rating">${stars(p.rating)}</span>
        <span class="muted">(${p.reviews || 0})</span>
      </div>

      <div class="price">
        <div class="now">${money(p.priceNow)}</div>
        ${p.priceWas ? `<div class="was">${money(p.priceWas)}</div>` : ``}
      </div>

      <div class="mv-proof">
        <div class="mv-proofline">✅ ${p.soldText || "Más de 100 vendidos"}</div>
        <div class="mv-proofline">⚡ ${p.stockText || "Últimas unidades"}</div>
        <div class="mv-proofline">🚚 ${p.shipText || "Envío rápido"}</div>
      </div>

      <div class="mv-actions-top">
        <a class="btn outline small" href="producto.html?id=${encodeURIComponent(p.id)}">Ver producto</a>
        <button class="btn ghost small mv-favbtn" onclick="toggleFav('${p.id}')">
          ${isFav(p.id) ? "❤️" : "🤍"}
        </button>
        <button class="btn primary small" onclick="addToCart('${p.id}', 1)">🛒 Agregar</button>
      </div>

      <div class="mv-actions-bottom">
        <button class="btn outline" onclick="buyNow('${p.id}')">⚡ Comprar ahora</button>
        <button class="btn ghost" onclick="payWebpay('${p.id}')">💳 WebPay</button>
      </div>
    </div>
  `;

  // marcar fav visual
  if (isFav(p.id)) el.classList.add("mv-fav-active");
  return el;
}

/* =========================
   FAVORITOS
   ========================= */
window.toggleFav = function(id){
  if (isFav(id)) fav = fav.filter(x => x !== id);
  else fav.push(id);

  save(LS_FAV, fav);
  render(); // para refrescar iconos
};

window.openFavorites = function(){
  const modal = document.getElementById("favModal");
  const favGrid = document.getElementById("favGrid");
  favGrid.innerHTML = "";

  const items = fav.map(id => MV_PRODUCTS.find(p => p.id === id)).filter(Boolean);

  if (!items.length) {
    favGrid.innerHTML = `<div class="muted">Aún no tienes favoritos.</div>`;
  } else {
    items.forEach(p => {
      const c = document.createElement("div");
      c.className = "card mv-card";
      c.innerHTML = `
        <div class="mv-imgwrap">
          <img src="${p.img}" alt="${p.name}">
          <div class="mv-badge">❤️ Favorito</div>
        </div>
        <div class="card-body">
          <div class="card-title">${p.name}</div>
          <div class="price"><div class="now">${money(p.priceNow)}</div></div>
          <div class="mv-actions-top">
            <a class="btn outline small" href="producto.html?id=${encodeURIComponent(p.id)}">Ver</a>
            <button class="btn ghost small" onclick="removeFav('${p.id}')">Quitar</button>
            <button class="btn primary small" onclick="addToCart('${p.id}', 1)">Agregar</button>
          </div>
        </div>
      `;
      favGrid.appendChild(c);
    });
  }

  modal.classList.add("open");
};

window.closeFavorites = function(){
  document.getElementById("favModal").classList.remove("open");
};

window.removeFav = function(id){
  fav = fav.filter(x => x !== id);
  save(LS_FAV, fav);
  openFavorites();
  updateCounts();
};

window.favAddAllToCart = function(){
  if (!fav.length) return;
  fav.forEach(id => addToCart(id, 1, {silent:true}));
  openCart();
};

/* =========================
   CARRITO (drawer derecha)
   ========================= */
window.addToCart = function(id, qty=1, opts={}){
  const existing = cart.find(x => x.id === id);
  if (existing) existing.qty += qty;
  else cart.push({ id, qty });

  save(LS_CART, cart);
  updateCounts();

  if (!opts.silent){
    showToast("✅ Producto agregado");
    openCart();
  }
};

window.openCart = function(){
  renderCart();
  document.getElementById("cartModal").classList.add("open");
};

window.closeCart = function(){
  document.getElementById("cartModal").classList.remove("open");
};

function renderCart(){
  const list = document.getElementById("cartList");
  const totalEl = document.getElementById("cartTotal");
  list.innerHTML = "";

  if (!cart.length){
    list.innerHTML = `<div class="muted">Tu carrito está vacío.</div>`;
    totalEl.textContent = money(0);
    return;
  }

  let total = 0;

  cart.forEach((it, idx) => {
    const p = MV_PRODUCTS.find(x => x.id === it.id);
    if (!p) return;

    const sub = (p.priceNow||0) * (it.qty||1);
    total += sub;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div>
        <h4>${p.name}</h4>
        <div class="muted">Precio: ${money(p.priceNow)}</div>
        <div class="now" style="margin-top:8px;">${money(sub)}</div>
      </div>
      <div class="cart-qty">
        <button onclick="decQty(${idx})">−</button>
        <div style="min-width:24px; text-align:center; font-weight:900;">${it.qty}</div>
        <button onclick="incQty(${idx})">+</button>
        <button onclick="removeCart(${idx})" title="Eliminar">🗑️</button>
      </div>
    `;
    list.appendChild(row);
  });

  totalEl.textContent = money(total);
}

window.incQty = function(i){
  cart[i].qty++;
  save(LS_CART, cart);
  renderCart();
  updateCounts();
};
window.decQty = function(i){
  cart[i].qty--;
  if (cart[i].qty <= 0) cart.splice(i,1);
  save(LS_CART, cart);
  renderCart();
  updateCounts();
};
window.removeCart = function(i){
  cart.splice(i,1);
  save(LS_CART, cart);
  renderCart();
  updateCounts();
};

/* =========================
   CHECKOUT / BUY NOW / WEBPAY DEMO
   ========================= */
window.buyNow = function(id){
  // crea orden temporal con 1 unidad
  openCheckout([{ id, qty: 1 }]);
};

window.checkout = function(){
  if (!cart.length) return;
  openCheckout(cart);
};

function openCheckout(orderItems){
  const modal = document.getElementById("checkoutModal");
  const body = document.getElementById("checkoutBody");

  let total = 0;
  const html = orderItems.map(it => {
    const p = MV_PRODUCTS.find(x => x.id === it.id);
    if (!p) return "";
    const sub = (p.priceNow||0) * (it.qty||1);
    total += sub;
    return `
      <div class="cart-item" style="grid-template-columns:70px 1fr auto;">
        <img src="${p.img}" alt="${p.name}" style="width:70px; height:60px;">
        <div>
          <h4>${p.name}</h4>
          <div class="muted">Cantidad: ${it.qty}</div>
        </div>
        <div class="now">${money(sub)}</div>
      </div>
    `;
  }).join("");

  body.innerHTML = `
    <div class="muted" style="margin-bottom:10px;">Revisa tu pedido antes de confirmar.</div>
    ${html}
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px;">
      <div class="now">Total</div>
      <div class="now">${money(total)}</div>
    </div>

    <div class="reviews" style="margin-top:12px;">
      <div class="muted"><strong>Datos de compra (demo)</strong></div>
      <div class="pdp-row" style="margin-top:10px;">
        <input id="cName" placeholder="Nombre" style="padding:12px;border-radius:14px;border:1px solid var(--border);background:rgba(255,255,255,.6);color:var(--text);">
        <input id="cPhone" placeholder="Teléfono" style="padding:12px;border-radius:14px;border:1px solid var(--border);background:rgba(255,255,255,.6);color:var(--text);">
      </div>
      <div class="pdp-row" style="margin-top:8px;">
        <input id="cAddress" placeholder="Dirección (opcional)" style="width:100%;padding:12px;border-radius:14px;border:1px solid var(--border);background:rgba(255,255,255,.6);color:var(--text);">
      </div>
      <div class="muted" style="margin-top:8px;">Luego se conecta WebPay real o WhatsApp.</div>
    </div>
  `;

  modal.classList.add("open");
}

window.closeCheckout = function(){
  document.getElementById("checkoutModal").classList.remove("open");
};

window.confirmOrder = function(){
  closeCheckout();
  closeCart();

  // vaciar carrito
  cart = [];
  save(LS_CART, cart);
  updateCounts();

  alert("✅ Pedido confirmado (simulado). Luego conectamos WebPay real.");
};

window.payWebpay = function(id){
  // demo: si viene id -> compra directa, si no -> compra carrito
  if (id){
    alert("💳 WebPay (demo): aquí se conectará el pago real para " + id);
  } else {
    alert("💳 WebPay (demo): aquí se conectará el pago real del carrito.");
  }
};

/* =========================
   COUNTS + FLOATING CART
   ========================= */
function updateCounts(){
  const cartCount = cart.reduce((a, x) => a + (x.qty || 0), 0);
  document.getElementById("cartCount").textContent = `(${cartCount})`;
  document.getElementById("favCount").textContent  = `(${fav.length})`;
  document.getElementById("floatCartCount").textContent = cartCount;
}

/* =========================
   TOAST
   ========================= */
function showToast(msg){
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1400);
}

/* =========================
   CONTADOR (demo)
   ========================= */
function startCountdown(){
  // countdown demo: 6 horas desde ahora
  const end = Date.now() + 6 * 60 * 60 * 1000;
  const el = document.getElementById("mvCountdown");

  const tick = () => {
    const diff = Math.max(0, end - Date.now());
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    el.textContent = `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
  };

  tick();
  setInterval(tick, 1000);
}

/* =========================
   FILTROS
   ========================= */
window.clearMVFilters = function(){
  document.getElementById("mvSearch").value = "";
  document.getElementById("mvSort").value = "trending";
  query = "";
  sortMode = "trending";
  render();
};

/* =========================
   INIT
   ========================= */
(function init(){
  // search
  const s = document.getElementById("mvSearch");
  s.addEventListener("input", (e) => {
    query = e.target.value || "";
    render();
  });

  // sort
  const sort = document.getElementById("mvSort");
  sort.addEventListener("change", (e) => {
    sortMode = e.target.value || "trending";
    render();
  });

  startCountdown();
  render();
})();

