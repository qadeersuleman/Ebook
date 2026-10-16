import { createContext, useContext, useEffect, useState } from 'react';
import { useLibrary } from './useLibrary.js';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { setStatus } = useLibrary();

  const [cart, setCart] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('ilmora:cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [toast, setToast] = useState(null);
  const [cartBump, setCartBump] = useState(false);

  useEffect(() => {
    localStorage.setItem('ilmora:cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const triggerBump = () => {
    setCartBump(true);
    setTimeout(() => setCartBump(false), 400);
  };

  const addToCart = (book, format = 'ePub') => {
    setCart((prev) => {
      const exists = prev.find((item) => item.book.id === book.id && item.format === format);
      if (exists) {
        return prev.map((item) =>
          item.book.id === book.id && item.format === format
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { book, quantity: 1, format }];
    });
    triggerBump();
    showToast(`Added "${book.title}" to your cart! 🛒`);
  };

  const removeFromCart = (bookId, format) => {
    setCart((prev) => prev.filter((item) => !(item.book.id === bookId && (!format || item.format === format))));
    showToast('Item removed from cart');
  };

  const updateQuantity = (bookId, delta, format) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.book.id === bookId && (!format || item.format === format)) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ILMORA20' || clean === 'ILMORA') {
      setCoupon(clean);
      setDiscountPercent(20);
      showToast('🎉 20% discount coupon applied successfully!');
      return true;
    }
    if (clean === 'FIRST50') {
      setCoupon(clean);
      setDiscountPercent(50);
      showToast('🎉 50% Welcome Discount applied!');
      return true;
    }
    showToast('Invalid coupon code. Try "ILMORA20"', 'error');
    return false;
  };

  const subtotal = cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discountAmount);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const completePurchase = (customerDetails) => {
    // Automatically add bought books to user's reading shelf
    cart.forEach((item) => {
      setStatus(item.book.id, 'want');
    });

    clearCart();
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    showToast(`Order confirmed for ${customerDetails.name}! Books added to your shelf. ✨`);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        isCheckoutOpen,
        openCheckout: () => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        },
        closeCheckout: () => setIsCheckoutOpen(false),
        coupon,
        discountPercent,
        applyCoupon,
        subtotal,
        discountAmount,
        total,
        totalItems,
        toast,
        cartBump,
        completePurchase,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

