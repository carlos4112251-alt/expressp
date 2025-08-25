import React from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  Avatar,
  IconButton,
  Paper,
  Grid,
  Chip,
  Container,
  Snackbar,
  Alert,
  Tooltip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  ArrowBack as ArrowBackIcon,
  AddShoppingCart
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Wishlist = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    wishlist,
    removeFromWishlist,
    clearWishlist,
    wishlistCount
  } = useWishlist();

  const { addToCart } = useCart();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const formatPrice = (price) => {
    const num = Number(price);
    return isNaN(num) ? '0.00' : num.toFixed(2);
  };

  const handleAddToCart = (item) => {
    try {
      addToCart(
        {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          thcContent: item.thcContent,
          category: item.category,
          description: item.description,
          strain: item.strain,
          priceOptions: item.priceOptions
        },
        item.selectedOption || null,
        1
      );
      removeFromWishlist(item.id, item.selectedOption);
      setSnackbarMessage(`${item.name} added to cart!`);
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Failed to add item to cart');
      setSnackbarOpen(true);
    }
  };

  const handleRemoveFromWishlist = (id, selectedOption) => {
    removeFromWishlist(id, selectedOption);
    setSnackbarMessage('Item removed from wishlist');
    setSnackbarOpen(true);
  };

  const handleClearWishlist = () => {
    clearWishlist();
    setSnackbarMessage('Wishlist cleared');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: isMobile ? 2 : 4, px: isMobile ? 1 : 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: isMobile ? 2 : 3, flexDirection: isMobile ? 'column' : 'row' }}>
        <Button
          component={RouterLink}
          to="/shop"
          startIcon={<ArrowBackIcon />}
          sx={{ mr: isMobile ? 0 : 2, mb: isMobile ? 1 : 0 }}
          size={isMobile ? 'small' : 'medium'}
        >
          {isMobile ? 'Shop' : 'Continue Shopping'}
        </Button>
        <Typography 
          variant={isMobile ? 'h5' : 'h4'} 
          sx={{ 
            flexGrow: 1,
            textAlign: isMobile ? 'center' : 'left',
            mt: isMobile ? 1 : 0
          }}
        >
          <FavoriteIcon color="error" sx={{ verticalAlign: 'middle', mr: 1 }} />
          Your Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
        </Typography>
      </Box>

      {wishlist.items.length === 0 ? (
        <Box textAlign="center" py={isMobile ? 4 : 8}>
          <FavoriteIcon color="disabled" sx={{ fontSize: isMobile ? 60 : 80, mb: 2 }} />
          <Typography variant={isMobile ? 'h6' : 'h5'} gutterBottom>
            Your wishlist is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, px: isMobile ? 2 : 0 }}>
            Save your favorite items here to access them later
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/shop"
            sx={{ mt: 2 }}
            startIcon={<FavoriteIcon />}
            size={isMobile ? 'medium' : 'large'}
          >
            Browse Products
          </Button>
        </Box>
      ) : (
        <Grid container spacing={isMobile ? 1 : 3}>
          <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
            <Paper elevation={isMobile ? 0 : 3} sx={{ p: isMobile ? 1 : 2 }}>
              <List>
                {wishlist.items.map((item) => (
                  <React.Fragment key={`${item.id}-${item.selectedOption?.option || 'default'}`}>
                    <ListItem sx={{ p: 0 }}>
                      <Grid container spacing={2} alignItems="center" sx={{ p: isMobile ? 1 : 2 }}>
                        {/* Product Image - Fixed small size */}
                        <Grid item xs={3} sm={2} md={2}>
                          <Box sx={{ 
                            width: 60, 
                            height: 60,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Avatar
                              alt={item.name}
                              src={item.image}
                              variant="square"
                              sx={{ 
                                width: 60, 
                                height: 60,
                                borderRadius: 1,
                                objectFit: 'cover'
                              }}
                            />
                          </Box>
                        </Grid>

                        {/* Product Info */}
                        <Grid item xs={5} sm={6} md={6}>
                          <Typography 
                            variant="subtitle1" 
                            component="div"
                            sx={{ 
                              fontWeight: 500,
                              mb: 0.5,
                              lineHeight: 1.2,
                              fontSize: isMobile ? '0.9rem' : '1rem'
                            }}
                          >
                            {item.name}
                          </Typography>
                          {item.selectedOption?.option && (
                            <Typography variant="body2" component="div" sx={{ fontWeight: 500, mb: 0.5, fontSize: isMobile ? '0.8rem' : '0.875rem' }}>
                              {item.selectedOption.option}: ${formatPrice(item.selectedOption.price || item.price)}
                            </Typography>
                          )}
                          {!item.selectedOption && (
                            <Typography variant="body2" component="div" sx={{ fontWeight: 500, mb: 0.5, fontSize: isMobile ? '0.8rem' : '0.875rem' }}>
                              ${formatPrice(item.price)}
                            </Typography>
                          )}
                          {item.thcContent && (
                            <Chip 
                              label={`${item.thcContent}% THC`} 
                              size="small" 
                              sx={{ 
                                backgroundColor: 'success.light',
                                color: 'success.dark',
                                fontSize: '0.7rem',
                                height: 20
                              }}
                            />
                          )}
                        </Grid>

                        {/* Action Buttons */}
                        <Grid item xs={4} sm={4} md={4}>
                          <Box sx={{ 
                            display: 'flex', 
                            flexDirection: isMobile ? 'column' : 'row',
                            gap: 1,
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                          }}>
                            <Tooltip title="Add to cart">
                              <IconButton
                                onClick={() => handleAddToCart(item)}
                                sx={{ 
                                  color: 'primary.main',
                                  backgroundColor: 'primary.light',
                                  '&:hover': {
                                    backgroundColor: 'primary.main',
                                    color: 'white'
                                  },
                                  p: 1,
                                  borderRadius: 2,
                                  width: 36,
                                  height: 36
                                }}
                                size="small"
                              >
                                <AddShoppingCart fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Remove from wishlist">
                              <IconButton
                                onClick={() => handleRemoveFromWishlist(item.id, item.selectedOption)}
                                sx={{ 
                                  color: 'error.main',
                                  backgroundColor: 'error.light',
                                  '&:hover': {
                                    backgroundColor: 'error.main',
                                    color: 'white'
                                  },
                                  p: 1,
                                  borderRadius: 2,
                                  width: 36,
                                  height: 36
                                }}
                                size="small"
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <Divider sx={{ my: isMobile ? 1 : 2 }} />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              mt: 2,
              px: isMobile ? 1 : 0
            }}>
              <Button
                variant="outlined"
                color="error"
                onClick={handleClearWishlist}
                startIcon={<DeleteIcon />}
                disabled={wishlistCount === 0}
                size={isMobile ? 'small' : 'medium'}
                sx={{
                  '&:hover': {
                    backgroundColor: 'error.main',
                    color: 'white'
                  }
                }}
              >
                Clear Wishlist
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
            <Paper elevation={isMobile ? 0 : 3} sx={{ 
              p: isMobile ? 2 : 3,
              mb: isMobile ? 2 : 0,
              position: isMobile ? 'sticky' : 'static',
              top: isMobile ? 0 : 'auto',
              zIndex: isMobile ? 1 : 'auto',
              backgroundColor: isMobile ? 'background.paper' : 'inherit'
            }}>
              <Typography variant={isMobile ? 'h6' : 'h6'} gutterBottom>
                Wishlist Summary
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant={isMobile ? 'body2' : 'body1'}>Items in Wishlist:</Typography>
                <Typography variant={isMobile ? 'body2' : 'body1'} fontWeight="bold">
                  {wishlistCount}
                </Typography>
              </Box>
              
              <Button
                fullWidth
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/shop"
                sx={{ 
                  py: isMobile ? 1 : 1.5, 
                  mb: 2,
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  borderRadius: 2
                }}
                size={isMobile ? 'small' : 'medium'}
                startIcon={<ShoppingCartIcon />}
              >
                Continue Shopping
              </Button>
              
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                component={RouterLink}
                to="/cart"
                sx={{ 
                  py: isMobile ? 1 : 1.5,
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  borderRadius: 2
                }}
                size={isMobile ? 'small' : 'medium'}
                startIcon={<FavoriteIcon />}
              >
                View Cart
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: isMobile ? 'center' : 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          sx={{ width: isMobile ? '90%' : '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Wishlist;