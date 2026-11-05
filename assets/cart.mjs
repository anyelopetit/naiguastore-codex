export const MAX_QUANTITY = 99;
export const CART_KEY = 'naiguastore.cart.v1';
export const PHONE = '584146380868';
export function cleanCart(input, products) {
  if (!Array.isArray(input)) return [];
  const valid = new Set(products.map(p => p.id));
  const merged = new Map();
  for (const row of input) {
    if (!row || !valid.has(row.id) || !Number.isInteger(row.quantity) || row.quantity < 1) continue;
    merged.set(row.id, Math.min(MAX_QUANTITY, (merged.get(row.id) || 0) + row.quantity));
  }
  return [...merged].map(([id, quantity]) => ({id, quantity}));
}
export function totalCents(cart, products) {
  const byId = new Map(products.map(p => [p.id,p]));
  return cleanCart(cart, products).reduce((sum,row) => sum + byId.get(row.id).priceCents * row.quantity, 0);
}
export function money(cents) {
  return 'USD ' + new Intl.NumberFormat('es-VE', {minimumFractionDigits:2, maximumFractionDigits:2}).format(cents / 100);
}
export function messageFor(cart, products, details = {}) {
  const normalized = cleanCart(cart, products);
  if (!normalized.length) throw new Error('Agrega un producto antes de continuar.');
  const lines = normalized.map((row,i) => {
    const p = products.find(p => p.id === row.id);
    return `${i+1}. ${p.name}\nReferencia de catálogo: ${p.id}\n${p.short}\nCantidad: ${row.quantity}\nPrecio unitario de referencia: ${money(p.priceCents)}\nSubtotal de referencia: ${money(p.priceCents * row.quantity)}`;
  });
  const fields = [details.name && `Nombre: ${details.name}`, details.delivery && `Entrega preferida: ${details.delivery}`, details.city && `Ciudad y estado: ${details.city}`, details.payment && `Pago preferido: ${details.payment}`, details.notes && `Consulta o compatibilidad: ${details.notes}`].filter(Boolean);
  return `Hola, NaiguaStore. Quiero consultar estos productos:\n\n${lines.join('\n\n')}\n\nSubtotal de referencia: ${money(totalCents(normalized,products))}\nEnvío: por confirmar.\nImporte final: por confirmar.\n\n${fields.join('\n')}\n\nPor favor, confirmen precio vigente, variante exacta, disponibilidad, garantía aplicable y entrega antes del pago.`;
}
export const whatsappURL = text => `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
