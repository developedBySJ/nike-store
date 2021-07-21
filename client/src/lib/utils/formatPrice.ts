const formatPrice = (price: number, fractionDigit?: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'inr',
    maximumFractionDigits: fractionDigit || 0,
    minimumFractionDigits: 0,
  }).format(price)
}

export {formatPrice}
