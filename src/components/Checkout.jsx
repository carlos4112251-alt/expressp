import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Container,
  InputAdornment,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardContent,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Person as PersonIcon,
  LocalShipping as ShippingIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Home as HomeIcon,
  Public as CountryIcon,
  ArrowBack,
  CheckCircle as CheckCircleIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  FlashOn as AsapIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { Link as RouterLink } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const Checkout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { cart, cartTotal, cartCount, savings, clearCart } = useCart();

  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('asap');
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    deliveryDate: '',
    deliveryTime: ''
  });
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  

  const handleDeliveryOptionChange = (event) => {
    setDeliveryOption(event.target.value);
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = ['fullName', 'phone', 'address', 'city', 'state', 'zipCode'];

    requiredFields.forEach(field => {
      if (!shippingInfo[field]?.trim()) {
        errors[field] = 'This field is required';
      }
    });

    // Delivery validation based on option
    if (deliveryOption === 'scheduled') {
      if (!shippingInfo.deliveryDate) {
        errors.deliveryDate = 'Please select a delivery date';
      }
      if (!shippingInfo.deliveryTime) {
        errors.deliveryTime = 'Please select a delivery time';
      }
    }

    // Phone validation
    if (shippingInfo.phone && !/^\d{10}$/.test(shippingInfo.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }

    // ZIP code validation
    if (shippingInfo.zipCode && !/^\d{5}(-\d{4})?$/.test(shippingInfo.zipCode)) {
      errors.zipCode = 'Please enter a valid ZIP code';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) {
      return;
    }

    // Open order summary dialog
    setOrderDialogOpen(true);
  };

  const handleCloseOrderDialog = () => {
    setOrderDialogOpen(false);
  };

const handleConfirmOrder = async () => {
  setIsSubmitting(true);
  setSubmitError('');

  try {
    // Format order items as HTML table rows
    const orderItemsHTML = cart.items.map(item => {
      const optionText = item.selectedOption?.option ? ` (${item.selectedOption.option})` : '';
      const totalPrice = (item.price * item.quantity).toFixed(2);
      
      return `
        <tr>
          <td>${item.name}${optionText}</td>
          <td>${item.quantity}</td>
          <td>$${totalPrice}</td>
        </tr>
      `;
    }).join('');

    // Prepare email template parameters
    const templateParams = {
      to_email: 'carlos4112251@gmail.com',
      order_number: `ORD-${Date.now()}`,
      customer_name: shippingInfo.fullName,
      customer_phone: shippingInfo.phone,
      customer_address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zipCode}`,
      delivery_time: formatDeliveryDateTime(),
      order_items: orderItemsHTML,
      subtotal: `$${cartTotal.toFixed(2)}`,
      discounts: savings > 0 ? `-$${savings.toFixed(2)}` : '$0.00',
      total: `$${cartTotal.toFixed(2)}`,
      order_date: new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };


// Send email using EmailJS
    await emailjs.send(
      'service_odkqnis',
      'template_ek7zrgs',
      templateParams,
      'huotkLj3uge1-koQL'
    );

    // Clear cart and show success
    clearCart();
    setOrderDialogOpen(false);
    setOrderConfirmed(true);
  } catch (error) {
    console.error('Failed to send order:', error);
    setSubmitError('Failed to place order. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
  const formatDeliveryDateTime = () => {
    if (deliveryOption === 'asap') {
      return 'ASAP (Within 30 to 45 minutes)';
    }

    if (!shippingInfo.deliveryDate) return '';

    const date = new Date(shippingInfo.deliveryDate);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return `${formattedDate} at ${shippingInfo.deliveryTime}`;
  };

  // Get today's date in YYYY-MM-DD format for the min attribute
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get max date (30 days from now) in YYYY-MM-DD format
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  if (orderConfirmed) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            bgcolor: 'success.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 4,
            boxShadow: `0 0 20px ${theme.palette.success.light}`
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 50, color: 'white' }} />
        </Box>

        <Typography variant="h3" gutterBottom sx={{
          fontWeight: 800,
          mb: 3,
          color: theme.palette.success.main,
          background: `linear-gradient(45deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
          backgroundClip: 'text',
          textFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Thank You For Your Order!
        </Typography>

        <Typography variant="h6" sx={{
          mb: 3,
          color: 'text.secondary',
          lineHeight: 1.6,
          maxWidth: 600,
          mx: 'auto'
        }}>
          Your order has been confirmed and is being prepared. A team member will contact you shortly to confirm delivery details.
        </Typography>

        <Typography variant="body1" sx={{
          mb: 4,
          color: 'text.secondary',
          maxWidth: 500,
          mx: 'auto'
        }}>
          For any changes or questions, reach us at <strong style={{ color: theme.palette.primary.main }}></strong>
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            component={RouterLink}
            to="/shop"
            size="large"
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 700,
              fontSize: '1.1rem',
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: theme.shadows[8]
              },
              transition: 'all 0.3s ease'
            }}
            onClick={scrollToTop}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 6 }}>
        <Button
          component={RouterLink}
          to="/cart"
          startIcon={<ArrowBack />}
          sx={{
            mb: 3,
            borderRadius: 2,
            px: 3,
            py: 1
          }}
          variant="outlined"
        >
          Back to Cart
        </Button>

        <Typography variant="h3" gutterBottom sx={{
          fontWeight: 800,
          color: theme.palette.text.primary,
          mb: 4,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          backgroundClip: 'text',
          textFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Checkout
        </Typography>

        <Box>
          <Typography variant="h4" gutterBottom sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 4,
            fontWeight: 700,
            color: theme.palette.primary.main
          }}>
            <ShippingIcon sx={{ fontSize: 32 }} /> Delivery Information
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Card elevation={2} sx={{ borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" gutterBottom sx={{
                    fontWeight: 600,
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <PersonIcon color="primary" /> Personal Information
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        required
                        fullWidth
                        label="Full Name"
                        name="fullName"
                        value={shippingInfo.fullName}
                        onChange={handleShippingChange}
                        error={!!formErrors.fullName}
                        helperText={formErrors.fullName}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                        variant="outlined"
                        size="medium"
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        required
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleShippingChange}
                        error={!!formErrors.phone}
                        helperText={formErrors.phone}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                        variant="outlined"
                        size="medium"
                        placeholder="2025550123"
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card elevation={2} sx={{ borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" gutterBottom sx={{
                    fontWeight: 600,
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <LocationIcon color="primary" /> Delivery Address
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Street Address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleShippingChange}
                        error={!!formErrors.address}
                        helperText={formErrors.address}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <HomeIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                        variant="outlined"
                        size="medium"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        required
                        fullWidth
                        label="City"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingChange}
                        error={!!formErrors.city}
                        helperText={formErrors.city}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                        variant="outlined"
                        size="medium"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        required
                        fullWidth
                        label="State"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleShippingChange}
                        error={!!formErrors.state}
                        helperText={formErrors.state}
                        variant="outlined"
                        size="medium"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        required
                        fullWidth
                        label="ZIP Code"
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleShippingChange}
                        error={!!formErrors.zipCode}
                        helperText={formErrors.zipCode}
                        variant="outlined"
                        size="medium"
                        placeholder="20001"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <FormControl fullWidth required>
                        <InputLabel>Country</InputLabel>
                        <Select
                          name="country"
                          value={shippingInfo.country}
                          label="Country"
                          onChange={handleShippingChange}
                          startAdornment={
                            <InputAdornment position="start">
                              <CountryIcon />
                            </InputAdornment>
                          }
                          variant="outlined"
                        >
                          <MenuItem value="United States">United States</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card elevation={2} sx={{ borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" gutterBottom sx={{
                    fontWeight: 600,
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <ScheduleIcon color="primary" /> Delivery Time
                  </Typography>

                  <FormControl component="fieldset" fullWidth>
                    <RadioGroup
                      value={deliveryOption}
                      onChange={handleDeliveryOptionChange}
                    >
                      <FormControlLabel
                        value="asap"
                        control={<Radio color="primary" />}
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AsapIcon color="primary" />
                            <Box>
                              <Typography variant="body1" fontWeight={500}>
                                ASAP Delivery
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Within 30 to 45 minutes
                              </Typography>
                            </Box>
                          </Box>
                        }
                        sx={{
                          mb: 2,
                          p: 2,
                          border: deliveryOption === 'asap' ? `2px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.divider}`,
                          borderRadius: 2,
                          backgroundColor: deliveryOption === 'asap' ? `${theme.palette.primary.light}20` : 'transparent'
                        }}
                      />

                      <FormControlLabel
                        value="scheduled"
                        control={<Radio color="primary" />}
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CalendarIcon color="primary" />
                            <Box>
                              <Typography variant="body1" fontWeight={500}>
                                Schedule Delivery
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Choose date and time
                              </Typography>
                            </Box>
                          </Box>
                        }
                        sx={{
                          p: 2,
                          border: deliveryOption === 'scheduled' ? `2px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.divider}`,
                          borderRadius: 2,
                          backgroundColor: deliveryOption === 'scheduled' ? `${theme.palette.primary.light}20` : 'transparent'
                        }}
                      />
                    </RadioGroup>
                  </FormControl>

                  {deliveryOption === 'scheduled' && (
                    <Box sx={{ mt: 3, p: 3, border: `1px dashed ${theme.palette.divider}`, borderRadius: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            label="Delivery Date"
                            name="deliveryDate"
                            type="date"
                            value={shippingInfo.deliveryDate}
                            onChange={handleShippingChange}
                            error={!!formErrors.deliveryDate}
                            helperText={formErrors.deliveryDate}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <CalendarIcon color="action" />
                                </InputAdornment>
                              ),
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              min: getTodayDate(),
                              max: getMaxDate()
                            }}
                            variant="outlined"
                            size="medium"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            label="Delivery Time"
                            name="deliveryTime"
                            type="time"
                            value={shippingInfo.deliveryTime}
                            onChange={handleShippingChange}
                            error={!!formErrors.deliveryTime}
                            helperText={formErrors.deliveryTime}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <TimeIcon color="action" />
                                </InputAdornment>
                              ),
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              step: 300, // 5 min intervals
                            }}
                            variant="outlined"
                            size="medium"
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 6 }}>
            <Button
              variant="contained"
              onClick={handlePlaceOrder}
              size="large"
              sx={{
                borderRadius: 3,
                px: 6,
                py: 1.5,
                fontWeight: 700,
                fontSize: '1.1rem',
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[8]
                },
                transition: 'all 0.3s ease'
              }}
            >
              Place Order
            </Button>
          </Box>
        </Box>

        {/* Order Summary Dialog */}
        <Dialog
          open={orderDialogOpen}
          onClose={handleCloseOrderDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3 }
          }}
        >
          <DialogTitle>
            <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
              Confirm Your Order
            </Typography>
          </DialogTitle>
          <DialogContent>
            {submitError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {submitError}
              </Alert>
            )}

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 600 }}>
                  <PersonIcon color="primary" /> Customer Information
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Full Name
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {shippingInfo.fullName}
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Phone Number
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {shippingInfo.phone}
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Delivery Address
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {shippingInfo.address}
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Delivery Time
                  </Typography>
                  <Typography variant="body1" fontWeight={600} color="primary">
                    {formatDeliveryDateTime()}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Order Details
                </Typography>

                <List>
                  {cart.items.map((item) => (
                    <ListItem key={`${item.id}-${item.selectedOption?.option || 'default'}`} sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar
                          alt={item.name}
                          src={item.image}
                          variant="square"
                          sx={{ width: 50, height: 50, borderRadius: 2 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="body1" fontWeight={500}>
                            {item.name}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" component="span" display="block">
                              Quantity: {item.quantity} • ${(item.price * item.quantity).toFixed(2)}
                            </Typography>
                            {item.selectedOption?.option && (
                              <Chip
                                label={item.selectedOption.option}
                                size="small"
                                sx={{ mt: 0.5, backgroundColor: theme.palette.primary.light }}
                              />
                            )}
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1">
                    Subtotal:
                  </Typography>
                  <Typography variant="body1">
                    ${cartTotal.toFixed(2)}
                  </Typography>
                </Box>

                {savings > 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body1" color="success.main">
                      Discounts:
                    </Typography>
                    <Typography variant="body1" color="success.main">
                      -${savings.toFixed(2)}
                    </Typography>
                  </Box>
                )}

                <Divider sx={{ my: 3 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">
                    Total:
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${cartTotal.toFixed(2)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={handleCloseOrderDialog}
              color="secondary"
              variant="outlined"
              sx={{ borderRadius: 2, px: 4 }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmOrder}
              variant="contained"
              color="primary"
              sx={{
                borderRadius: 2,
                px: 4,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} /> : 'Confirm Order'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Checkout;