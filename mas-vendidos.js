const topProducts = [
  {
    id:1,
    nombre:"Incienso Palo Santo",
    precio:3990,
    precioAntes:4990,
    img:"https://images.unsplash.com/photo-1602874801006-59f24f7b2e6f",
    vendidos:350,
    badge:"🔥 Bestseller"
  },
  {
    id:2,
    nombre:"Incienso Lavanda",
    precio:3990,
    precioAntes:null,
    img:"https://images.unsplash.com/photo-1608571423539-e951e3df4d08",
    vendidos:280,
    badge:"⭐ Más vendido"
  },
  {
    id:3,
    nombre:"Vela Luna Tierra",
    precio:14990,
    precioAntes:null,
    img:"https://images.unsplash.com/photo-1527515637462-cff94eecc1ac",
    vendidos:210,
    badge:"Nuevo"
  }
];

function renderTopProducts(){
  const grid = document.getElementById("topProductsGrid");
  grid.innerHTML = "";

  topProducts.forEach(p => {
    grid.innerHTML += `
      <div class="card">
        <div class="badge-offer">${p.badge}</div>
        <img src="${p.img}">
        <div class="card-body">
          <div class="card-title">${p.nombre}</div>

          <div class="rating">⭐⭐⭐⭐⭐ • Más de ${p.vendidos} vendidos</div>

          <div class="price">
            <div class="now">$${p.precio.toLocaleString()}</div>
            ${p.precioAntes ? `<div class="was">$${p.precioAntes.toLocaleString()}</div>` : ""}
          </div>

          <div class="card-actions">
            <a href="producto.html?id=${p.id}" class="btn outline small">Ver producto</a>
            <button class="btn ghost small">❤️</button>
            <button class="btn small" onclick="addToCart(${p.id})">🛒</button>
            <button class="btn primary small">⚡ Comprar</button>
          </div>

          <button class="btn outline small" style="margin-top:8px;width:100%;">
            💳 WebPay
          </button>
        </div>
      </div>
    `;
  });
}

renderTopProducts();
