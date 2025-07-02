// CartContext.js
import React, { createContext, useReducer, useContext } from 'react';
import { cartReducer } from './CartContex';

const CartContext = createContext();

const initialCart = JSON.parse(localStorage.getItem('cart')) || {
  items: [],
  address: null,
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
