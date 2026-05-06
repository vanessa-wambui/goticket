import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

// Helper function to generate a unique ID
const getUniqueId = (product) => {
  // If product has a valid unique id, use it
  if (product.id !== undefined && product.id !== null) {
    return product.id;
  }
  // Fallback: create a unique key from product name
  return product.product_name + '_' + product.product_cost;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const uniqueId = getUniqueId(product);
    
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.uniqueId === uniqueId);
      
      if (existingItem) {
        return prevItems.map((item) =>
          item.uniqueId === uniqueId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, uniqueId, quantity: 1 }];
    });
  };

  const updateQuantity = (uniqueId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(uniqueId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.uniqueId === uniqueId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (uniqueId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.uniqueId !== uniqueId));
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);