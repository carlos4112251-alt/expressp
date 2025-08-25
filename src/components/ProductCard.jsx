import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  Chip, 
  IconButton, 
  Tooltip,
  Badge,
  Box,
  Menu,
  MenuItem
} from '@mui/material';
import { 
  Favorite, 
  FavoriteBorder, 
  ShoppingCart,
  LocalFireDepartment,
  Cake,
  Spa,
  Opacity,
  BatteryFull,
  Straighten,
  ArrowDropDown
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const [isFavorite, setIsFavorite] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState(
    product.priceOptions ? product.priceOptions[0] : null
  );
  const { addToCart, cart } = useCart();

  // Check if product is in wishlist when component mounts
  useEffect(() => {
    const isInWishlist = wishlist.items.some(item => 
      item.id === product.id && 
      (!item.selectedOption || item.selectedOption.option === selectedOption?.option)
    );
    setIsFavorite(isInWishlist);
  }, [wishlist, product.id, selectedOption]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    handleMenuClose();
  };

  const getCategoryIcon = () => {
    switch(product.category.toLowerCase()) {
      case 'flower':
        return <Spa color="success" />;
      case 'edibles':
        return <Cake color="secondary" />;
      case 'concentrates':
        return <Opacity color="info" />;
      case 'cart':
        return <Straighten color="primary" />;
      case 'disposable-cart':
        return <BatteryFull color="warning" />;
      default:
        return <LocalFireDepartment color="error" />;
    }
  };

  const isInCart = cart.items.some(item => 
    item.id === product.id && 
    item.selectedOption?.option === selectedOption?.option
  );

  const handleAddToCart = () => {
    addToCart(product, selectedOption, 1);
  };

  const handleWishlistToggle = () => {
    if (isFavorite) {
      removeFromWishlist(product.id, selectedOption);
    } else {
      addToWishlist(product, selectedOption);
    }
    setIsFavorite(!isFavorite);
  };

  const displayPrice = selectedOption 
    ? selectedOption.price 
    : product.price;

  return (
    <Card sx={{ 
      maxWidth: 345, 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
      }
    }}>
      {/* Product image with badges */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.name}
          sx={{ objectFit: 'cover' }}
        />
        
        {/* Top-left category badge */}
        <Tooltip title={product.category}>
          <Chip
            icon={getCategoryIcon()}
            label={product.category}
            size="small"
            sx={{ 
              position: 'absolute',
              top: 10,
              left: 10,
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white',
              textTransform: 'capitalize'
            }}
          />
        </Tooltip>
        
        {/* Top-right favorite button */}
        <IconButton
          aria-label="add to favorites"
          onClick={handleWishlistToggle}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            color: isFavorite ? 'red' : 'white',
            backgroundColor: 'rgba(0,0,0,0.2)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.3)',
              color: isFavorite ? 'red' : 'white'
            }
          }}
        >
          {isFavorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        
        {/* New badge */}
        {product.isNew && (
          <Chip
            label="New"
            size="small"
            sx={{
              position: 'absolute',
              top: 10,
              right: product.thcContent ? 50 : 10,
              backgroundColor: 'primary.main',
              color: 'white',
              fontWeight: 'bold'
            }}
          />
        )}
        
        {/* THC percentage badge */}
        {product.thcContent && (
          <Chip
            label={`${product.thcContent}Mg THC`}
            size="small"
            sx={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              backgroundColor: 'rgba(76, 175, 80, 0.9)',
              color: 'white',
              fontWeight: 'bold'
            }}
          />
        )}
      </Box>

      {/* Product details */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.strain} • {product.weight}
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 1 }}>
          {product.description || 'Premium quality product'}
        </Typography>

        {/* Effects and flavors */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
          {product.effects?.slice(0, 3).map((effect, index) => (
            <Chip 
              key={`effect-${index}`} 
              label={effect} 
              size="small" 
              color="primary"
              variant="outlined"
            />
          ))}
          {product.flavors?.slice(0, 3).map((flavor, index) => (
            <Chip 
              key={`flavor-${index}`} 
              label={flavor} 
              size="small" 
              color="secondary"
              variant="outlined"
            />
          ))}
        </Box>
      </CardContent>

      {/* Price and action buttons */}
      <CardActions sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        pt: 0
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {product.priceOptions ? (
            <>
              <Typography variant="h6" color="primary" sx={{ mr: 1 }}>
                ${displayPrice?.toFixed(2)}
              </Typography>
              <Button
                onClick={handleMenuOpen}
                endIcon={<ArrowDropDown />}
                sx={{
                  fontWeight: 'bold',
                  color: 'text.primary',
                  textTransform: 'none'
                }}
              >
                {selectedOption?.option || product.priceOptions[0].option}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {product.priceOptions.map((option, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    selected={selectedOption?.option === option.option}
                  >
                    {option.option}: ${option.price}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Typography variant="h6" color="primary">
              ${displayPrice?.toFixed(2)}
            </Typography>
          )}
        </Box>
        
        <Tooltip title={isInCart ? 'Already in cart' : 'Add to cart'}>
          <Badge 
            badgeContent={isInCart ? '✓' : 0} 
            color="success"
            overlap="circular"
          >
            <Button
              size="small"
              variant={isInCart ? 'outlined' : 'contained'}
              color="primary"
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
              sx={{
                fontWeight: 'bold',
                minWidth: '120px'
              }}
            >
              {isInCart ? 'Added' : 'Add'}
            </Button>
          </Badge>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

ProductCard.defaultProps = {
  product: {
    name: 'Product Name',
    category: 'Flower',
    thcContent: 20,
    price: 49.99,
    image: '/images/disposables.jpg',
    description: 'Premium quality product',
    priceOptions: [
      { option: '1/4oz', price: 40 },
      { option: '1/2oz', price: 60 },
      { option: '1oz', price: 100 }
    ]
  }
};

export default ProductCard;