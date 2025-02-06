export function calculateBuyBackPrice(
  precioCompra: number,
  fechaCompra: string
): number {
  const purchase = new Date(fechaCompra);
  const now = new Date();
  let yearsPassed = now.getFullYear() - purchase.getFullYear();

  const anniversary = new Date(
    now.getFullYear(),
    purchase.getMonth(),
    purchase.getDate()
  );
  if (now < anniversary) {
    yearsPassed--;
  }

  let buyBackPrice = precioCompra;
  for (let i = 0; i < yearsPassed; i++) {
    buyBackPrice /= 2;
  }
  return buyBackPrice;
}
