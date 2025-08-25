import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'cannabis_cart';

const cartReducer = (state, action) => {
  let newState;
  
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id && 
               item.selectedOption?.option === action.payload.selectedOption?.option
      );
      
      if (existingItemIndex >= 0) {
        newState = {
          ...state,
          items: state.items.map((item, index) =>
            index === existingItemIndex
              ? { 
                  ...item, 
                  quantity: item.quantity + action.payload.quantity,
                  // Ensure price is updated if it changed
                  price: action.payload.selectedOption?.price || action.payload.price 
                }
              : item
          ),
        };
      } else {
        newState = {
          ...state,
          items: [...state.items, {
            ...action.payload,
            // Store the actual price from selected option or product
            price: action.payload.selectedOption?.price || action.payload.price
          }],
        };
      }
      break;

    case 'REMOVE_ITEM':
      newState = {
        ...state,
        items: state.items.filter(item => 
          !(item.id === action.payload.id && 
            item.selectedOption?.option === action.payload.selectedOption?.option)
        ),
      };
      break;

    case 'UPDATE_QUANTITY':
      newState = {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id && 
          item.selectedOption?.option === action.payload.selectedOption?.option
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        ),
      };
      break;

    case 'CLEAR_CART':
      newState = { items: [] };
      break;

    case 'LOAD_CART':
      return action.payload;

    default:
      return state;
  }

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
  return newState;
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  const addToCart = (product, selectedOption, quantity = 1) => {
    // Calculate the actual price based on selected option
    const actualPrice = selectedOption?.price || product.price;
    
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        image: product.image,
        price: actualPrice, // Use the calculated price
        selectedOption,
        quantity,
        category: product.category,
        thcContent: product.thcContent,
        // Store original product price for reference
        originalPrice: product.price
      },
    });
  };

  const removeFromCart = (productId, selectedOption) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: {
        id: productId,
        selectedOption,
      },
    });
  };

  const updateQuantity = (productId, selectedOption, quantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: {
        id: productId,
        selectedOption,
        quantity: parseInt(quantity),
      },
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const cartTotal = cartState.items.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  const cartCount = cartState.items.reduce(
    (count, item) => count + item.quantity,
    0
  );

  // Calculate savings if products have original prices
  const calculateSavings = () => {
    return cartState.items.reduce((savings, item) => {
      if (item.originalPrice && item.originalPrice > item.price) {
        return savings + ((item.originalPrice - item.price) * item.quantity);
      }
      return savings;
    }, 0);
  };

  const savings = calculateSavings();

  return (
    <CartContext.Provider
      value={{
        cart: cartState,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        savings
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};