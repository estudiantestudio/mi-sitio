function comprar() {
  const numeroWhatsApp = "56942989334";
  const mensaje = encodeURIComponent(
    "Hola, quiero comprar el producto. ¿Me puedes dar más información?"
  );

  const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
  window.open(url, "_blank");
}

