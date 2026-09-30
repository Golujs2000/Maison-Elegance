/**
 * Formats a number as a currency string.
 * @param {number} amount
 * @param {string} currencySymbol - e.g. '₹'
 * @returns {string}
 */
export function formatPrice(amount, currencySymbol = "₹") {
  if (amount === null || amount === undefined || isNaN(amount)) return "—";
  
  // Format with Indian number system (lakhs/crores) or standard commas
  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(amount);

  return `${currencySymbol}${formatted}`;
}

/**
 * Calculates discount percentage
 */
export function calculateDiscount(price, discountPrice) {
  if (!discountPrice || discountPrice >= price) return 0;
  return Math.round(((price - discountPrice) / price) * 100);
}
