export const formatearMoneda = (cantidad) => {
  return cantidad.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  });
};
