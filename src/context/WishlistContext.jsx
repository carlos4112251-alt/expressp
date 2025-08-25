// src/context/WishlistContext.js
import React, { createContext, useContext, useReducer } from 'react';

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      // Check if item already exists in wishlist
      const existingItem = state.items.find(
        item => item.id === action.payload.id && 
        JSON.stringify(item.selectedOption) === JSON.stringify(action.payload.selectedOption)
      );
      
      if (existingItem) {
        return state; // Item already in wishlist
      }
      
      return {
        ...state,
        items: [...state.items, action.payload],
        count: state.count + 1
      };
      
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        items: state.items.filter(
          item => !(item.id === action.payload.id && 
          JSON.stringify(item.selectedOption) === JSON.stringify(action.payload.selectedOption))
        ),
        count: Math.max(0, state.count - 1)
      };
      
    case 'CLEAR_WISHLIST':
      return {
        items: [],
        count: 0
      };
      
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, dispatch] = useReducer(wishlistReducer, {
    items: [],
    count: 0
  });

  const addToWishlist = (product, selectedOption = null) => {
    dispatch({
      type: 'ADD_TO_WISHLIST',
      payload: {
        ...product,
        selectedOption
      }
    });
  };

  const removeFromWishlist = (productId, selectedOption = null) => {
    dispatch({
      type: 'REMOVE_FROM_WISHLIST',
      payload: {
        id: productId,
        selectedOption
      }
    });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        wishlistCount: wishlist.count
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};