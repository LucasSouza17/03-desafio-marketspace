export function FormatCurrency(value: number): string {
  const formatedCurrency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value).replace("R$", "")

  return formatedCurrency
}