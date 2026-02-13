/* =========================
   LO NUEVO (ZARA STYLE)
   ========================= */

/**
 * IMPORTANT:
 * - Si quieres que "Ver producto" funcione con tu producto.html,
 *   usa IDs que EXISTAN en tu producto.js / catálogo real.
 * - Si todavía no existen, igual funciona la página, pero "Ver producto" no mostrará el producto correcto.
 */
const NEW_PRODUCTS = [
  {
    id: "incienso-vanilla",
    name: "INCIENSO VAINILLA",
    price: 3990,
    badge: "NEW",
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "incienso-lavanda",
    name: "INCIENSO LAVANDA",
    price: 3990,
    badge: "NEW",
    img: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "incienso-eucalipto",
    name: "INCIENSO EUCALIPTO",
    price: 3990,
    badge: "NEW",
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "incienso-romero",
    name: "INCIENSO ROMERO",
    price: 3990,
    badge: "NEW",
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1400&q=80"
  }
];

/* Storage (usa los mismos nombres que ya vienes usando) */
const LS_CART = "ch_cart_v1"; // [{id, qty}]
const LS_FAV  = "ch_fav_v1";  // [id]

const load = (k, fallback) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? fallback; }
  catch { return fallback; }
};
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const money = (n) => "$" + (n || 0).toLocaleString("es-CL");

let cart = load(LS_CART, []);
let fav  = load(LS_FAV, []);

const grid = document.getElementById("znGrid");
const toast = document.getElementById("znToast");

function isFav(id){ return fav.includes(id); }

function updateCounts(){
  const cartCount = cart.reduce((a,x)=> a + (x.qty || 0), 0);
  document.getElementById("znCartCount").textContent = cartCount;
  document.getElementById("znFavCount").textContent  = fav.length;
}

function showToast(msg){
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(()=> toast.classList.remove("show"), 1200);
}

function render(){
  grid.innerHTML = "";
  NEW_PRODUCTS.forEach(p => grid.appendChild(cardEl(p)));
  updateCounts();
}

/* Card Zara-style: botones aparecen en hover */
function cardEl(p){
  const el = document.createElement("article");
  el.className = "zn-card";

  el.innerHTML = `
    <div class="zn-imgwrap">
      <img src="${p.img}" alt="${p.name}">
      <div class="zn-badge">${p.badge || "NEW"}</div>

      <div class="zn-hover">
        <div class="zn-hover-actions">
          <a class="zn-btn zn-btn-text" href="producto.html?id=${encodeURIComponent(p.id)}">Ver producto</a>

          <div class="zn-row">
            <button class="zn-iconmini" data-fav="${p.id}" aria-label="Favorito">${isFav(p.id) ? "♥" : "♡"}</button>
            <button class="zn-btn zn-btn-black" data-add="${p.id}">Agregar</button>
          </div>

          <button class="zn-btn zn-btn-line" data-buy="${p.id}">Comprar ahora</button>
          <button class="zn-btn zn-btn-ghost" data-webpay="${p.id}">Pagar con WebPay</button>
        </div>
      </div>
    </div>

    <div class="zn-info">
      <div class="zn-name">${p.name}</div>
      <div class="zn-price">${money(p.price)}</div>
    </div>
  `;

  // Mobile/touch: si tocas la imagen, muestra overlay (porque no hay hover)
  el.querySelector(".zn-imgwrap").addEventListener("click", (e) => {
    const isButton = e.target.closest("button,a");
    if (isButton) return;
    el.classList.toggle("touch-open");
  });

  // botones
  el.querySelector(`[data-fav="${p.id}"]`).addEventListener("click", (e) => {
    e.preventDefault();
    toggleFav(p.id);
    // refresca solo el icono
    e.target.textContent = isFav(p.id) ? "♥" : "♡";
  });

  el.querySelector(`[data-add="${p.id}"]`).addEventListener("click", (e) => {
    e.preventDefault();
    addToCart(p.id, 1);
    showToast("Agregado al carrito");
    ZN.openCart();
  });

  el.querySelector(`[data-buy="${p.id}"]`).addEventListener("click", (e) => {
    e.preventDefault();
    buyNow(p.id);
  });

  el.querySelector(`[data-webpay="${p.id}"]`).addEventListener("click", (e) => {
    e.preventDefault();
    payWebpay(p.id);
  });

  return el;
}

/* Favoritos */
function toggleFav(id){
  if (isFav(id)) fav = fav.filter(x => x !== id);
  else fav.push(id);
  save(LS_FAV, fav);
  updateCounts();
}

/* Carrito */
function addToCart(id, qty=1){
  const it = cart.find(x => x.id === id);
  if (it) it.qty += qty;
  else cart.push({ id, qty });
  save(LS_CART, cart);
  updateCounts();
}

function removeCartIndex(i){
  cart.splice(i,1);
  save(LS_CART, cart);
  renderCart();
  updateCounts();
}

function incQty(i){
  cart[i].qty++;
  save(LS_CART, cart);
  renderCart();
  updateCounts();
}

function decQty(i){
  cart[i].qty--;
  if (cart[i].qty <= 0) cart.splice(i,1);
  save(LS_CART, cart);
  renderCart();
  updateCounts();
}

function renderCart(){
  const list = document.getElementById("znCartList");
  const totalEl = document.getElementById("znCartTotal");
  list.innerHTML = "";

  if (!cart.length){
    list.innerHTML = `<div class="zn-empty">Tu carrito está vacío.</div>`;
    totalEl.textContent = money(0);
    return;
  }

  let total = 0;

  cart.forEach((it, idx) => {
    const p = NEW_PRODUCTS.find(x => x.id === it.id);
    if (!p) return;
    const sub = (p.price || 0) * (it.qty || 1);
    total += sub;

    const row = document.createElement("div");
    row.className = "zn-cart-item";
    row.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="zn-cart-mid">
        <div class="zn-cart-name">${p.name}</div>
        <div class="zn-cart-price">${money(p.price)}</div>
      </div>
      <div class="zn-cart-right">
        <div class="zn-qty">
          <button class="zn-qbtn" aria-label="Menos">−</button>
          <span class="zn-qnum">${it.qty}</span>
          <button class="zn-qbtn" aria-label="Más">+</button>
        </div>
        <div class="zn-cart-sub">${money(sub)}</div>
        <button class="zn-remove" aria-label="Eliminar">Eliminar</button>
      </div>
    `;

    const [bMinus, bPlus] = row.querySelectorAll(".zn-qbtn");
    bMinus.addEventListener("click", ()=> decQty(idx));
    bPlus.addEventListener("click", ()=> incQty(idx));
    row.querySelector(".zn-remove").addEventListener("click", ()=> removeCartIndex(idx));

    list.appendChild(row);
  });

  totalEl.textContent = money(total);
}

/* Checkout / Compra */
function buyNow(id){
  addToCart(id, 1);
  ZN.openCart();
}

function checkout(){
  if (!cart.length) return;
  alert("✅ Checkout (demo). Aquí conectas WebPay real / WePay y datos de envío.");
}

function payWebpay(id){
  if (id) alert("💳 WebPay (demo): pago directo para " + id);
  else alert("💳 WebPay (demo): pago del carrito");
}

/* Favoritos drawer */
function renderFav(){
  const list = document.getElementById("znFavList");
  list.innerHTML = "";

  if (!fav.length){
    list.innerHTML = `<div class="zn-empty">Aún no tienes favoritos.</div>`;
    return;
  }

  fav.map(id => NEW_PRODUCTS.find(p => p.id === id))
    .filter(Boolean)
    .forEach(p => {
      const row = document.createElement("div");
      row.className = "zn-fav-item";
      row.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <div class="zn-fav-mid">
          <div class="zn-cart-name">${p.name}</div>
          <div class="zn-cart-price">${money(p.price)}</div>
          <div class="zn-fav-actions">
            <a class="zn-btn zn-btn-text" href="producto.html?id=${encodeURIComponent(p.id)}">Ver producto</a>
            <button class="zn-btn zn-btn-black" data-addfav="${p.id}">Agregar</button>
            <button class="zn-btn zn-btn-line" data-removefav="${p.id}">Quitar</button>
          </div>
        </div>
      `;

      row.querySelector(`[data-addfav="${p.id}"]`).addEventListener("click", ()=> {
        addToCart(p.id, 1);
        showToast("Agregado al carrito");
        updateCounts();
      });

      row.querySelector(`[data-removefav="${p.id}"]`).addEventListener("click", ()=> {
        fav = fav.filter(x => x !== p.id);
        save(LS_FAV, fav);
        renderFav();
        updateCounts();
      });

      list.appendChild(row);
    });
}

/* API global */
window.ZN = {
  openCart(){
    renderCart();
    document.getElementById("znCartModal").classList.add("open");
  },
  closeCart(){
    document.getElementById("znCartModal").classList.remove("open");
  },
  openFavorites(){
    renderFav();
    document.getElementById("znFavModal").classList.add("open");
  },
  closeFavorites(){
    document.getElementById("znFavModal").classList.remove("open");
  },
  addAllFavToCart(){
    if (!fav.length) return;
    fav.forEach(id => addToCart(id, 1));
    showToast("Favoritos al carrito");
    ZN.openCart();
  },
  checkout,
  payWebpay
};

/* Cerrar drawer al tocar fondo */
document.getElementById("znCartModal").addEventListener("click", (e)=>{
  if (e.target.id === "znCartModal") ZN.closeCart();
});
document.getElementById("znFavModal").addEventListener("click", (e)=>{
  if (e.target.id === "znFavModal") ZN.closeFavorites();
});

/* Init */
render();
