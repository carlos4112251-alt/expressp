import React from 'react';
import { Badge, IconButton } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartIcon = () => {
  const { cartCount } = useCart();
  
  return (
    <IconButton 
      color="inherit" 
      component={RouterLink} 
      to="/cart"
      size="large"
    >
      <Badge 
        badgeContent={cartCount} 
        color="secondary"
        overlap="circular"
        max={99}
      >
        <ShoppingCart />
      </Badge>
    </IconButton>
  );
};

export default CartIcon;