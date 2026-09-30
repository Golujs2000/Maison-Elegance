import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { STORAGE_KEYS } from "../utils/constants";
import { formatPrice } from "../utils/formatPrice";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CART);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Cart localStorage load error:", e);
      return [];
    }
  });

  // Sync to localStorage whenever cart state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.error("Cart localStorage save error:", e);
    }
  }, [cart]);

  /**
   * Adds an item to cart
   */
  const addToCart = (product, selectedVariant = null, quantity = 1) => {
    // Unique ID combining product id and variant specs
    const variantKey = selectedVariant
      ? `${selectedVariant.color || ""}-${selectedVariant.size || ""}`
      : "standard";
    const cartItemId = `${product.id}__${variantKey}`;

    const effectiveBasePrice = product.discountPrice || product.price;
    const variantAdjustment = selectedVariant?.priceAdjustment || 0;
    const finalUnitPrice = effectiveBasePrice + variantAdjustment;

    // Find primary image
    const primaryImg =
      product.media?.find((m) => m.type === "image" && m.isPrimary)?.url ||
      product.media?.find((m) => m.type === "image")?.url ||
      "";

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };
        return updated;
      } else {
        const newItem = {
          cartItemId,
          productId: product.id,
          name: product.name,
          slug: product.slug,
          sku: product.sku,
          image: primaryImg,
          price: finalUnitPrice,
          basePrice: product.price,
          discountPrice: product.discountPrice,
          variant: selectedVariant,
          quantity,
          maxStock: product.stock,
        };
        return [...prevCart, newItem];
      }
    });

    toast.success(
      `Added "${product.name}" (${quantity}) to cart!`,
      {
        icon: "🛋️",
        style: {
          borderRadius: "8px",
          background: "#1A1918",
          color: "#FAF7F2",
          fontFamily: "Plus Jakarta Sans, sans-serif",
          fontSize: "14px",
        },
      }
    );
  };

  /**
   * Updates quantity of a cart item
   */
  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  /**
   * Removes an item from cart
   */
  const removeFromCart = (cartItemId) => {
    setCart((prev) => {
      const target = prev.find((i) => i.cartItemId === cartItemId);
      if (target) {
        toast(`Removed "${target.name}" from cart`, {
          icon: "🗑️",
        });
      }
      return prev.filter((item) => item.cartItemId !== cartItemId);
    });
  };

  /**
   * Clears the entire cart
   */
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(STORAGE_KEYS.CART);
  };

  // Computations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
