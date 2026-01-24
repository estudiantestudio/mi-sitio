
const WHATSAPP_NUMBER = "56942989334"; 
const WEPAY_LINK = "https://TU-LINK-DE-WEPAY"; // <-- pega tu link real, o déjalo vacío "" si no usarás WePay

// ===== TUS PRODUCTOS (EDITA AQUÍ NOMBRE, PRECIO, IMAGEN, DESCRIPCIÓN) =====
const products = [
  {
    id: 1,
    name: "Producto 1 Premium",
    price: "$19.990",
    img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80",
    desc: "Beneficio principal: transforma tu día con un producto fácil, bonito y útil."
  },
  {
    id: 2,
    name: "Producto 2 Profesional",
    price: "$24.990",
    img: "https://images.unsplash.com/photo-1512499617640-c2f999fe7f72?auto=format&fit=crop&w=1200&q=80",
    desc: "Ideal para quienes buscan calidad, diseño y resultados reales."
  },
  {
    id: 3,
    name: "Producto 3 Edición Especial",
    price: "$29.990",
    img: "https://images.unsplash.com/photo-1520975682031-a9ce5a3b2dce?auto=format&fit=crop&w=1200&q=80",
    desc: "Perfecto para regalo. Se nota premium desde que lo ves."
  }
];

let selectedProduct = null;

// ===== RENDER DE PRODUCTOS =====
function renderProducts() {
  const container = document.getElementById("products");
  container.innerHTML = products.map(p => `
    <div class="card product">
      <img src="${p.img}" alt="${p.name}">
      <div class="product-body">
        <h3>${p.name}</h3>
        <div class="price">${p.price}</div>
        <p class="muted">${p.desc}</p>

        <div class="product-actions">
          <button class="btn btn-primary" onclick="abrirProducto(${p.id})">Ver / Comprar</button>
          <button class="btn btn-outline" onclick="comprarDirectoWhatsapp(${p.id})">WhatsApp</button>
        </div>
      </div>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", renderProducts);

// ===== MODAL =====
function abrirProducto(id) {
  selectedProduct = products.find(p => p.id === id);
  document.getElementById("mImg").src = selectedProduct.img;
  document.getElementById("mName").textContent = selectedProduct.name;
  document.getElementById("mPrice").textContent = selectedProduct.price;
  document.getElementById("mDesc").textContent = selectedProduct.desc;
  document.getElementById("modal").classList.add("open");
}

function cerrarModal() {
  document.getElementById("modal").classList.remove("open");
}

// Cerrar modal si clic fuera
document.addEventListener("click", (e) => {
  const modal = document.getElementById("modal");
  if (modal.classList.contains("open") && e.target === modal) cerrarModal();
});

// ===== COMPRA =====
function comprarSeleccion(metodo) {
  if (!selectedProduct) return;

  if (metodo === "whatsapp") {
    comprarDirectoWhatsapp(selectedProduct.id);
  } else if (metodo === "wepay") {
    if (!WEPAY_LINK || WEPAY_LINK.includes("TU-LINK")) {
      alert("Aún no configuraste tu link de WePay. Por ahora compra por WhatsApp.");
      comprarDirectoWhatsapp(selectedProduct.id);
      return;
    }
    // Si tienes un link por producto, aquí puedes personalizarlo.
    window.open(WEPAY_LINK, "_blank");
  }
}

function comprarDirectoWhatsapp(id) {
  const p = products.find(x => x.id === id);
  const msg = encodeURIComponent(
    `Hola! Quiero comprar: ${p.name} (${p.price}). ¿Cómo lo pago y cuánto sale el envío?`
  );
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
}

function irAWhatsapp() {
  const msg = encodeURIComponent("Hola! Quiero comprar, ¿me das información?");
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
}


