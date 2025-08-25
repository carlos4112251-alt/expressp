import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  TextField,
  Paper,
  Grid,
  Badge,
  Chip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  Delete as DeleteIcon, 
  ShoppingCart as ShoppingCartIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  LocalOffer as OfferIcon
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Cart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallMobile = useMediaQuery('(max-width:400px)');
  const location = useLocation();

  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    savings
  } = useCart();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuantityChange = (productId, selectedOption, newQuantity) => {
    const quantity = Math.max(1, Math.min(99, parseInt(newQuantity) || 1));
    updateQuantity(productId, selectedOption, quantity);
  };

  const incrementQuantity = (item) => {
    updateQuantity(item.id, item.selectedOption, item.quantity + 1);
  };

  const decrementQuantity = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.selectedOption, item.quantity - 1);
    }
  };

  const hasDiscount = (item) => {
    return item.originalPrice && item.originalPrice > item.price;
  };

  return (
    <Box sx={{ 
      width: '100vw',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      backgroundColor: theme.palette.background.default
    }}>
      <Box sx={{ 
        maxWidth: 1200, 
        margin: '0 auto', 
        p: isMobile ? 0 : 3,
        minHeight: '100vh'
      }}>
        {/* Header */}
        <Box sx={{ 
          p: isMobile ? 2 : 0,
          pb: isMobile ? 1 : 0,
          backgroundColor: 'background.paper',
          borderBottom: isMobile ? `1px solid ${theme.palette.divider}` : 'none'
        }}>
          <Typography 
            variant={isMobile ? "h6" : "h4"} 
            gutterBottom 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 2,
              flexWrap: 'wrap'
            }}
          >
            <Badge badgeContent={cartCount} color="primary" sx={{ mr: 2 }}>
              <ShoppingCartIcon fontSize={isMobile ? "medium" : "large"} />
            </Badge>
            Your Shopping Cart
          </Typography>
        </Box>

        {cart.items.length === 0 ? (
          <Box textAlign="center" py={8} px={2}>
            <Typography variant="h6" gutterBottom>
              Your cart is empty
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/shop"
              onClick={scrollToTop}
              sx={{ mt: 2 }}
              startIcon={<ShoppingCartIcon />}
              size={isMobile ? "medium" : "large"}
              fullWidth={isMobile}
            >
              Browse Products
            </Button>
          </Box>
        ) : (
          <Grid container spacing={0}>
            <Grid item xs={12} md={8} sx={{ 
              pr: isMobile ? 0 : 2,
              pb: isMobile ? 2 : 0
            }}>
              <Paper 
                elevation={isMobile ? 0 : 2} 
                sx={{ 
                  p: isMobile ? 2 : 2,
                  borderRadius: isMobile ? 0 : 1,
                  minHeight: isMobile ? 'auto' : '100%'
                }}
              >
                <List sx={{ p: 0 }}>
                  {cart.items.map((item) => (
                    <React.Fragment key={`${item.id}-${item.selectedOption?.option || 'default'}`}>
                      <ListItem
                        sx={{
                          flexDirection: isMobile ? 'column' : 'row',
                          alignItems: isMobile ? 'flex-start' : 'center',
                          padding: isMobile ? '16px 0' : '16px 8px',
                          width: '100%'
                        }}
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => removeFromCart(item.id, item.selectedOption)}
                            color="error"
                            sx={{ 
                              position: isMobile ? 'absolute' : 'static',
                              right: isMobile ? 0 : 'auto',
                              top: isMobile ? 8 : 'auto'
                            }}
                          >
                            <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar sx={{ 
                          minWidth: isSmallMobile ? 50 : 60,
                          mr: isMobile ? 1 : 2
                        }}>
                          <Avatar
                            alt={item.name}
                            src={item.image}
                            variant="square"
                            sx={{ 
                              width: isSmallMobile ? 50 : 60, 
                              height: isSmallMobile ? 50 : 60
                            }}
                          />
                        </ListItemAvatar>
                        
                        <ListItemText
                          primary={
                            <Box>
                              <Typography 
                                variant={isMobile ? "body1" : "h6"} 
                                component="div"
                                sx={{ 
                                  lineHeight: 1.2,
                                  fontWeight: isMobile ? 600 : 700
                                }}
                              >
                                {item.name}
                              </Typography>
                              {hasDiscount(item) && (
                                <Chip
                                  icon={<OfferIcon />}
                                  label={`Save $${((item.originalPrice - item.price) * item.quantity).toFixed(2)}`}
                                  color="success"
                                  size="small"
                                  sx={{ 
                                    mt: 0.5, 
                                    fontSize: isSmallMobile ? '0.65rem' : '0.75rem',
                                    height: isSmallMobile ? 20 : 24
                                  }}
                                />
                              )}
                            </Box>
                          }
                          secondary={
                            <>
                              {item.selectedOption?.option && (
                                <Typography variant="body2" component="div" sx={{ mt: 0.5 }}>
                                  Size: {item.selectedOption.option}
                                </Typography>
                              )}
                              <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 0.5, 
                                mt: 0.5,
                                flexWrap: 'wrap'
                              }}>
                                {hasDiscount(item) ? (
                                  <>
                                    <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                      ${item.originalPrice.toFixed(2)}
                                    </Typography>
                                    <Typography variant="body2" color="success.main" fontWeight="bold">
                                      ${item.price.toFixed(2)} each
                                    </Typography>
                                  </>
                                ) : (
                                  <Typography variant="body2">
                                    ${item.price.toFixed(2)} each
                                  </Typography>
                                )}
                              </Box>
                              {item.thcContent && (
                                <Chip 
                                  label={`${item.thcContent}Mg THC`} 
                                  size="small" 
                                  sx={{ 
                                    mt: 0.5,
                                    fontSize: isSmallMobile ? '0.65rem' : '0.75rem',
                                    height: isSmallMobile ? 20 : 24
                                  }}
                                />
                              )}
                            </>
                          }
                          sx={{ 
                            flex: 1,
                            mr: isMobile ? 0 : 2,
                            mb: isMobile ? 1 : 0
                          }}
                        />
                        
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          width: isMobile ? '100%' : 'auto',
                          justifyContent: isMobile ? 'space-between' : 'flex-start',
                          mt: isMobile ? 1 : 0,
                          gap: isMobile ? 1 : 0
                        }}>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            order: isMobile ? 2 : 1
                          }}>
                            <IconButton 
                              onClick={() => decrementQuantity(item)}
                              disabled={item.quantity <= 1}
                              size={isSmallMobile ? "small" : "medium"}
                              sx={{ p: isSmallMobile ? 0.5 : 1 }}
                            >
                              <RemoveIcon fontSize={isSmallMobile ? "small" : "medium"} />
                            </IconButton>
                            <TextField
                              size="small"
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(item.id, item.selectedOption, e.target.value)
                              }
                              inputProps={{ 
                                min: 1,
                                max: 99,
                                style: { 
                                  textAlign: 'center',
                                  padding: isSmallMobile ? '2px' : '6px',
                                  fontSize: isSmallMobile ? '0.8rem' : '0.9rem'
                                }
                              }}
                              sx={{ 
                                width: isSmallMobile ? 45 : 55, 
                                mx: 0.5,
                                '& .MuiInputBase-root': {
                                  height: isSmallMobile ? 30 : 36
                                }
                              }}
                            />
                            <IconButton 
                              onClick={() => incrementQuantity(item)}
                              size={isSmallMobile ? "small" : "medium"}
                              sx={{ p: isSmallMobile ? 0.5 : 1 }}
                            >
                              <AddIcon fontSize={isSmallMobile ? "small" : "medium"} />
                            </IconButton>
                          </Box>
                          
                          <Typography 
                            variant={isMobile ? "body1" : "h6"} 
                            fontWeight="bold" 
                            sx={{ 
                              ml: isMobile ? 0 : 2,
                              minWidth: isMobile ? 50 : 70,
                              textAlign: isMobile ? 'right' : 'right',
                              order: isMobile ? 1 : 2,
                              fontSize: isSmallMobile ? '0.9rem' : '1rem'
                            }}
                          >
                            ${(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        </Box>
                      </ListItem>
                      <Divider sx={{ my: 1 }} />
                    </React.Fragment>
                  ))}
                </List>
                
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  mt: 2,
                  pt: 1,
                  borderTop: `1px solid ${theme.palette.divider}`
                }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={clearCart}
                    startIcon={<DeleteIcon />}
                    size={isMobile ? "small" : "medium"}
                  >
                    Clear Entire Cart
                  </Button>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4} sx={{ 
              pl: isMobile ? 0 : 2,
              pt: isMobile ? 0 : 0
            }}>
              <Paper 
                elevation={isMobile ? 2 : 3} 
                sx={{ 
                  p: isMobile ? 2 : 3,
                  borderRadius: isMobile ? 0 : 1,
                  position: isMobile ? 'sticky' : 'static',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 1000
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontSize: isMobile ? '1.1rem' : '1.25rem' }}>
                  Order Summary
                </Typography>
                
                {savings > 0 && (
                  <Box sx={{ 
                    backgroundColor: 'success.light', 
                    color: 'success.contrastText', 
                    p: 1, 
                    borderRadius: 1, 
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    fontSize: isSmallMobile ? '0.75rem' : '0.85rem'
                  }}>
                    <OfferIcon fontSize="small" />
                    <Typography variant="body2" fontWeight="bold">
                      You saved ${savings.toFixed(2)}!
                    </Typography>
                  </Box>
                )}
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant={isSmallMobile ? "body2" : "body1"}>
                    Subtotal ({cartCount} items):
                  </Typography>
                  <Typography variant={isSmallMobile ? "body2" : "body1"}>
                    ${cartTotal.toFixed(2)}
                  </Typography>
                </Box>
                
                {savings > 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant={isSmallMobile ? "body2" : "body1"} color="success.main">
                      Discounts:
                    </Typography>
                    <Typography variant={isSmallMobile ? "body2" : "body1"} color="success.main">
                      -${savings.toFixed(2)}
                    </Typography>
                  </Box>
                )}
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}>
                    Estimated Total:
                  </Typography>
                  <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}>
                    ${cartTotal.toFixed(2)}
                  </Typography>
                </Box>
                
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size={isMobile ? "medium" : "large"}
                  component={RouterLink}
                  to="/checkout"
                  onClick={scrollToTop}
                  sx={{ 
                    py: isMobile ? 1.25 : 1.5,
                    fontSize: isMobile ? '0.9rem' : '1rem'
                  }}
                >
                  Proceed to Checkout
                </Button>
                
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  component={RouterLink}
                  to="/shop"
                  onClick={scrollToTop}
                  size={isMobile ? "medium" : "large"}
                  sx={{ 
                    mt: 1.5, 
                    py: isMobile ? 1.25 : 1.5,
                    fontSize: isMobile ? '0.9rem' : '1rem'
                  }}
                >
                  Continue Shopping
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Cart;