import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Container
} from '@mui/material';
import {
  Schedule as ScheduleIcon,
  LocalShipping as DeliveryIcon,
  LocationOn as LocationIcon,
  Textsms,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Star as StarIcon
} from '@mui/icons-material';

const Delivery = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const deliveryHours = [
    { day: 'Monday - Thursday', hours: '9:00 AM - 10:00 PM' },
    { day: 'Friday - Saturday', hours: '9:00 AM - 10:00 PM' },
    { day: 'Sunday', hours: '9:00 AM - 9:00 PM' }
  ];

  const deliveryZones = [
    { zone: 'Downtown Area', fee: '$10', minOrder: '$10', time: '30-45 min' },
    { zone: 'Washington, DC', fee: '$10', minOrder: '$10', time: '45-60 min' },
    { zone: 'DMV Area', fee: '$10', minOrder: '$20', time: '60-75 min' }
  ];

  const serviceAreas = [
    'Washington, DC',
    'DMV Area',
    'Columbia Heights',
    'Dupont Circle',
    'Foggy Bottom',
    'Logan Circle',
    'Adams Morgan',
    'Union Market'
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box textAlign="center" sx={{ mb: 6 }}>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            color: theme.palette.primary.main,
            fontSize: isMobile ? '2.5rem' : '3rem'
          }}
        >
          <DeliveryIcon sx={{ fontSize: isMobile ? '2rem' : '2.5rem', mr: 2, verticalAlign: 'middle' }} />
          Pot Express Delivery
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Fast, reliable cannabis delivery right to your doorstep. Serving the community with quality products and exceptional service.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Delivery Hours */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <ScheduleIcon color="primary" sx={{ mr: 1 }} />
              Delivery Hours
            </Typography>
            
            <List>
              {deliveryHours.map((item, index) => (
                <React.Fragment key={item.day}>
                  <ListItem>
                    <ListItemIcon>
                      <Chip 
                        label={index + 1} 
                        color="primary" 
                        size="small" 
                        sx={{ minWidth: 30, height: 30 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.day}
                      secondary={item.hours}
                      primaryTypographyProps={{ fontWeight: 600 }}
                      secondaryTypographyProps={{ color: 'text.primary', fontWeight: 500 }}
                    />
                  </ListItem>
                  {index < deliveryHours.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>

            <Box sx={{ mt: 3, p: 2, bgcolor: 'warning.light', borderRadius: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                📢 Holiday Hours: Closed on Christmas Day and New Year's Day
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Delivery Fees & Times */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <DeliveryIcon color="primary" sx={{ mr: 1 }} />
              Delivery Fees & Times
            </Typography>

            <Grid container spacing={2}>
              {deliveryZones.map((zone) => (
                <Grid item xs={12} key={zone.zone}>
                  <Card variant="outlined" sx={{ borderRadius: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {zone.zone}
                        </Typography>
                        <Chip 
                          label={zone.fee} 
                          color="secondary" 
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Typography variant="body2">
                          📦 Min Order: {zone.minOrder}
                        </Typography>
                        <Typography variant="body2">
                          ⏰ Est. Time: {zone.time}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 3, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                🎉 Free delivery on orders over $40!
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Service Areas */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <LocationIcon color="primary" sx={{ mr: 1 }} />
              Service Areas
            </Typography>

            <Typography variant="body1" paragraph>
              We currently deliver to the following areas:
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {serviceAreas.map((area) => (
                <Chip
                  key={area}
                  label={area}
                  color="primary"
                  variant="outlined"
                  icon={<LocationIcon />}
                  sx={{ mb: 1 }}
                />
              ))}
            </Box>

            <Box sx={{ mt: 3, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
              <Typography variant="body2">
                💡 Not sure if we deliver to your area? Contact us to check!
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* How It Works */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <StarIcon color="primary" sx={{ mr: 1 }} />
              How It Works
            </Typography>

            <List>
              {[
                { step: 1, text: 'Browse our menu and add items to your cart' },
                { step: 2, text: 'Enter your delivery address at checkout' },
                { step: 3, text: 'Choose your preferred delivery time' },
                { step: 4, text: 'Place your order online, or by Text Message' },
                { step: 5, text: 'A team member will contact you to confirm your order' }
              ].map((item) => (
                <ListItem key={item.step} sx={{ alignItems: 'flex-start' }}>
                  <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 600,
                        fontSize: '0.875rem'
                      }}
                    >
                      {item.step}
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ variant: 'body1' }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 700 }}>
              Need Help With Your Order?
            </Typography>
            
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={4} textAlign="center">
                <PhoneIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  Call Us
                </Typography>
                <Typography variant="body1">
                  (202) 428-8187
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} textAlign="center">
                <Textsms sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  Text Us
                </Typography>
                <Typography variant="body1">
                  (202) 428-8187
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={4} textAlign="center">
                <EmailIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  Email Us
                </Typography>
                <Typography variant="body1">
                  info@pexpress.com
                </Typography>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Chip 
                label="9:00AM - 10:00PM Customer Support" 
                sx={{ 
                  bgcolor: 'white', 
                  color: 'primary.main', 
                  fontWeight: 600,
                  fontSize: '1rem',
                  p: 2
                }} 
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Delivery;