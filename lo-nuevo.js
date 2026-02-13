/* ============================
   LO NUEVO — ZARA STYLE (Premium)
   ============================ */

const ZN_PRODUCTS = [
  {
    id: "incienso-vanilla",
    name: "INCIENSO VAINILLA",
    price: 3990,
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
    badge: "NEW"
  },
  {
    id: "incienso-lavanda",
    name: "INCIENSO LAVANDA",
    price: 3990,
    img: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=1600&q=80",
    badge: "NEW"
  },
  {
    id: "incienso-eucalipto",
    name: "INCIENSO EUCALIPTO",
    price: 3990,
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
    badge: "NEW"
  },
  {
    id: "incienso-romero",
    name: "INCIENSO ROMERO",
    price: 3990,
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1600&q=80",
    badge: "NEW"
  }
];

// LocalStorage keys (mantenlos consistentes)
const LS_CART = "ch_cart_v1";
const LS_FAV  = "ch_fav_v1";

const load = (k, fallback) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? fallback; }
  catch { return fallback; }
};
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

let cart = load(LS_CART, []); // [{id, qty}]
let fav  = load(LS_FAV, []);  // [id]

const $ = (id) => document.getElementById(id);
const money = (n) => "$" + Number(n || 0).toLocaleString("es-CL");

const toastEl = () => $("znToast");

function showToast(msg){
  const t = toastEl();
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 1200);
}

function isFav(id){ return fav.includes(id); }
function getP(id){ return ZN_PRODUCTS.find(p => p.id === id); }

function setCounts(){
  const cartCount = cart.reduce((a, x) => a + (x.qty || 0), 0);
  $("znCartCount").textContent = cartCount;
  $("znFavCount").textContent = fav.length;
}

function renderGrid(){
  const grid = $("znGrid");
  grid.innerHTML = "";

  ZN_PRODUCTS.forEach(p => {
    const card = document.createElement("article");
    card.className = "zn-card" + (isFav(p.id) ? " zn-faved" : "");
    card.innerHTML = `
      <div class="zn-imgwrap">
        <img src="${p.img}" alt="${p.name}">
        <div class="zn-badge">${p.badge || "NEW"}</div>

        <!-- Overlay (solo hover) -->
        <div class="zn-overlay">
          <div class="zn-overlay-inner">
            <a class="zn-act zn-act-link" href="producto.html?id=${encodeURIComponent(p.id)}">VER PRODUCTO</a>

            <div class="zn-row">
              <button class="zn-iconmini" onclick="ZN.toggleFav('${p.id}')" aria-label="Favorito">
                <span class="zn-heart">${isFav(p.id) ? "♥" : "♡"}</span>
              </button>
              <button class="zn-act zn-act-black" onclick="ZN.addToCart('${p.id}', 1)">AGREGAR</button>
            </div>

            <button class="zn-act zn-act-line" onclick="ZN.buyNow('${p.id}')">COMPRAR AHORA</button>
            <button class="zn-act zn-act-ghost" onclick="ZN.webpay('${p.id}')">PAGAR CON WEBPAY</button>
          </div>
        </div>
      </div>

      <div class="zn-info">
        <div class="zn-name">${p.name}</div>
        <div class="zn-price">${money(p.price)}</div>
      </div>
    `;

  card.addEventListener("click", (e) => {
  if (!window.matchMedia("(hover: none)").matches) return;
  const isButton = e.target.closest("button") || e.target.closest("a");
  if (isButton) return;

  document.querySelectorAll(".zn-card.zn-touch-open").forEach(c => {
    if (c !== card) c.classList.remove("zn-touch-open");
  });

  card.classList.toggle("zn-touch-open");
});


}

/* ================
   Favorites
   ================ */
function renderFav(){
  const body = $("znFavBody");
  const items = fav.map(id => getP(id)).filter(Boolean);

  if (!items.length){
    body.innerHTML = `<div class="zn-empty">No tienes favoritos todavía.</div>`;
    return;
  }

  body.innerHTML = items.map(p => `
    <div class="zn-fav-item">
      <img src="${p.img}" alt="${p.name}">
      <div class="zn-cart-mid">
        <div class="zn-cart-name">${p.name}</div>
        <div class="zn-cart-price">${money(p.price)}</div>
        <div class="zn-fav-actions">
          <a class="zn-mini-link" href="producto.html?id=${encodeURIComponent(p.id)}">VER</a>
          <button class="zn-mini-btn" onclick="ZN.addToCart('${p.id}', 1, true)">AGREGAR</button>
          <button class="zn-mini-btn" onclick="ZN.removeFav('${p.id}')">QUITAR</button>
        </div>
      </div>
    </div>
  `).join("");
}

/* ================
   Cart
   ================ */
function cartTotal(){
  return cart.reduce((sum, it) => {
    const p = getP(it.id);
    if (!p) return sum;
    return sum + (p.price * (it.qty || 0));
  }, 0);
}

function renderCart(){
  const body = $("znCartBody");

  if (!cart.length){
    body.innerHTML = `<div class="zn-empty">Tu carrito está vacío.</div>`;
    $("znCartTotal").textContent = money(0);
    return;
  }

  body.innerHTML = cart.map((it, idx) => {
    const p = getP(it.id);
    if (!p) return "";
    const sub = p.price * it.qty;

    return `
      <div class="zn-cart-item">
        <img src="${p.img}" alt="${p.name}">
        <div class="zn-cart-mid">
          <div class="zn-cart-name">${p.name}</div>
          <div class="zn-cart-price">${money(p.price)}</div>
        </div>
        <div class="zn-cart-right">
          <div class="zn-qty">
            <button class="zn-qbtn" onclick="ZN.decQty(${idx})">−</button>
            <div class="zn-qnum">${it.qty}</div>
            <button class="zn-qbtn" onclick="ZN.incQty(${idx})">+</button>
          </div>
          <div class="zn-cart-sub">${money(sub)}</div>
          <button class="zn-remove" onclick="ZN.removeCart(${idx})">ELIMINAR</button>
        </div>
      </div>
    `;
  }).join("");

  $("znCartTotal").textContent = money(cartTotal());
}

/* ================
   Public API (window.ZN)
   ================ */
window.ZN = {
  toggleFav(id){
    if (isFav(id)) fav = fav.filter(x => x !== id);
    else fav.push(id);
    save(LS_FAV, fav);
    setCounts();
    renderGrid();
    // si drawer abierto, refresca
    if ($("znFavModal").classList.contains("open")) renderFav();
  },

  removeFav(id){
    fav = fav.filter(x => x !== id);
    save(LS_FAV, fav);
    setCounts();
    renderGrid();
    renderFav();
  },

  favMoveAllToCart(){
    if (!fav.length) return;
    fav.forEach(id => this.addToCart(id, 1, true));
    this.openCart();
    showToast("Movido al carrito");
  },

  addToCart(id, qty=1, silent=false){
    const ex = cart.find(x => x.id === id);
    if (ex) ex.qty += qty;
    else cart.push({ id, qty });

    save(LS_CART, cart);
    setCounts();
    if (!silent){
  showToast("Agregado");
  this.openCart();
}

    renderCart();
  },

  incQty(i){
    cart[i].qty++;
    save(LS_CART, cart);
    setCounts();
    renderCart();
  },

  decQty(i){
    cart[i].qty--;
    if (cart[i].qty <= 0) cart.splice(i, 1);
    save(LS_CART, cart);
    setCounts();
    renderCart();
  },

  removeCart(i){
    cart.splice(i, 1);
    save(LS_CART, cart);
    setCounts();
    renderCart();
  },

  buyNow(id){
    // compra rápida: 1 unidad -> abre drawer carrito
    this.addToCart(id, 1, true);
    this.openCart();
    showToast("Compra rápida lista");
  },

  webpay(id){
  showToast("WebPay listo (demo)");
  },

  checkout(){
  if (!cart.length) return;
  showToast("Checkout listo (demo)");
}


  openFav(){
    renderFav();
    $("znFavModal").classList.add("open");
    $("znFavModal").setAttribute("aria-hidden", "false");
  },
  closeFav(){
    $("znFavModal").classList.remove("open");
    $("znFavModal").setAttribute("aria-hidden", "true");
  },

  openCart(){
    renderCart();
    $("znCartModal").classList.add("open");
    $("znCartModal").setAttribute("aria-hidden", "false");
  },
  closeCart(){
    $("znCartModal").classList.remove("open");
    $("znCartModal").setAttribute("aria-hidden", "true");
  }
};

/* INIT */
(function init(){
  setCounts();
  renderGrid();

  // cerrar al click fuera
  $("znFavModal").addEventListener("click", (e) => {
    if (e.target.id === "znFavModal") ZN.closeFav();
  });
  $("znCartModal").addEventListener("click", (e) => {
    if (e.target.id === "znCartModal") ZN.closeCart();
  });
})();
