import { formatPrice } from "./formatPrice";

/**
 * Normalizes phone number into international digits without symbols/spaces
 * e.g. "+91 98765-43210" -> "919876543210"
 */
export function cleanPhoneNumber(phone) {
  if (!phone) return "919876543210";
  return phone.replace(/[^\d]/g, "");
}

/**
 * Builds WhatsApp inquiry URL for a single product
 */
export function generateProductInquiryUrl({
  whatsappNumber,
  product,
  selectedVariant,
  quantity = 1,
  currentUrl = window.location.href,
}) {
  const phone = cleanPhoneNumber(whatsappNumber);
  const effectivePrice = product.discountPrice || product.price;
  const unitPrice = effectivePrice + (selectedVariant?.priceAdjustment || 0);
  const totalPrice = unitPrice * quantity;

  let message = `*Maison Élégance | Product Inquiry*\n\n`;
  message += `Hello Maison Élégance, I would like to inquire about this piece:\n\n`;
  message += `🛋️ *${product.name}*\n`;
  if (product.sku) message += `🏷️ *SKU:* ${product.sku}\n`;
  if (selectedVariant) {
    message += `🎨 *Finish/Color:* ${selectedVariant.color}\n`;
    if (selectedVariant.size) message += `📐 *Size/Config:* ${selectedVariant.size}\n`;
  }
  message += `🔢 *Quantity:* ${quantity}\n`;
  message += `💰 *Price:* ${formatPrice(unitPrice)} (Total: ${formatPrice(totalPrice)})\n\n`;
  message += `🔗 *View Piece:* ${currentUrl}\n\n`;
  message += `Kindly share availability, delivery timeframe, and finish customization options. Thank you!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds WhatsApp inquiry URL for the complete shopping cart
 */
export function generateCartInquiryUrl({
  whatsappNumber,
  cartItems,
  totalAmount,
}) {
  const phone = cleanPhoneNumber(whatsappNumber);

  let message = `*Maison Élégance | Bespoke Order Inquiry*\n\n`;
  message += `Hello Maison Élégance, I would like to inquire about the following items in my selection:\n\n`;

  cartItems.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`;
    if (item.sku) message += `   SKU: ${item.sku}\n`;
    if (item.variant) {
      message += `   Variant: ${item.variant.color || ""} ${item.variant.size ? `(${item.variant.size})` : ""}\n`;
    }
    message += `   Qty: ${item.quantity} × ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}\n\n`;
  });

  message += `---------------------------------\n`;
  message += `🧾 *Estimated Selection Total:* ${formatPrice(totalAmount)}\n`;
  message += `---------------------------------\n\n`;
  message += `Please confirm stock availability, white-glove delivery schedule to my location, and payment modalities.\n\nThank you!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Direct WhatsApp chat link
 */
export function generateGeneralInquiryUrl(whatsappNumber, customGreeting = "") {
  const phone = cleanPhoneNumber(whatsappNumber);
  const text = customGreeting || "Hello Maison Élégance Team, I would like assistance with bespoke furniture consultations.";
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
