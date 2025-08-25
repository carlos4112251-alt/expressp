import React from 'react';
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  Container,
  Grid,
  IconButton,
  Fade
} from '@mui/material';
import {
  ShoppingCart,
  ExpandMore,
  Whatshot,
  KeyboardArrowUp
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to featured products section
  const scrollToFeatured = () => {
    const featuredSection = document.getElementById('featured-products');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: scroll down by viewport height
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  const features = [
    { icon: '🌿', text: 'Organic Products' },
    { icon: '🚚', text: '1-Hour Delivery' },
    { icon: '🔒', text: 'Secure Checkout' }
  ];

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        height: { xs: '90vh', sm: '95vh', md: '100vh' },
        minHeight: { xs: 500, sm: 600, md: 700 },
        maxHeight: { xs: 900, md: 1200 },
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      {/* Background with gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(to bottom, rgba(30, 30, 30, 0.7), rgba(30, 30, 30, 0.3)),
            url('/images/juice.PNG')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 4, md: 2 } }}>
        <Grid container spacing={isMobile ? 4 : 4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Fade in timeout={800}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' }, pr: { md: 2 } }}>
                <Typography
                  variant="overline"
                  component="p"
                  color="primary.main"
                  sx={{
                    mb: 1,
                    display: 'block',
                    fontWeight: 600,
                    letterSpacing: 2,
                    fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                  }}
                >
                  PREMIUM CANNABIS
                </Typography>

                <Typography
                  variant={isMobile ? (isSmallMobile ? 'h4' : 'h3') : 'h2'}
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    lineHeight: 1.1,
                    mb: 2,
                    color: 'common.white',
                    fontSize: {
                      xs: '1.6rem',
                      sm: '2.2rem',
                      md: '2.5rem',
                      lg: '2.8rem'
                    },
                    textShadow: '0 2px 4px rgba(0,0,0,0.7)',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word'
                  }}
                >
                  Quality Cannabis Delivered Discreetly
                </Typography>

                <Typography
                  variant="body1"
                  component="p"
                  sx={{
                    mb: 2,
                    color: 'rgba(255,255,255,0.9)',
                    maxWidth: 600,
                    mx: { xs: 'auto', md: '0' },
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.05rem' },
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    lineHeight: 1.5
                  }}
                >
                  Discover our exclusive collection flower, edibles, cartages and potent concentrates. We offer fast, reliable local delivery, serving Washington DC in full compliance with I-71.
                </Typography>

                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  mb: 4, 
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  alignItems: 'center'
                }}>
                  <Button
                    component={RouterLink}
                    to="/shop"
                    variant="contained"
                    color="primary"
                    size={isSmallMobile ? 'medium' : 'large'}
                    startIcon={<ShoppingCart />}
                    onClick={scrollToTop}
                    sx={{
                      px: { xs: 3, sm: 4 },
                      py: 1.5,
                      fontWeight: 700,
                      borderRadius: '12px',
                      boxShadow: '0 4px 20px rgba(76, 175, 80, 0.3)',
                      width: { xs: '100%', sm: 'auto' },
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 6px 25px rgba(76, 175, 80, 0.5)',
                        backgroundColor: '#087f23',
                      }
                    }}
                  >
                    Shop Now
                  </Button>

                  <Button
                    component={RouterLink}
                    to="/specials"
                    variant="outlined"
                    size={isSmallMobile ? 'medium' : 'large'}
                    color="inherit"
                    startIcon={<Whatshot sx={{ color: '#FF6D00' }} />}
                    onClick={scrollToTop}
                    sx={{
                      px: { xs: 3, sm: 4 },
                      py: 1.5,
                      fontWeight: 700,
                      borderRadius: '12px',
                      borderColor: 'rgba(255,255,255,0.3)',
                      color: 'common.white',
                      width: { xs: '100%', sm: 'auto' },
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        borderColor: '#FF6D00',
                        backgroundColor: 'rgba(255, 109, 0, 0.15)',
                        boxShadow: '0 6px 20px rgba(255, 109, 0, 0.25)',
                      }
                    }}
                  >
                    Special Offers
                  </Button>
                </Box>

                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}>
                  {features.map((feature, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: 'rgba(255,255,255,0.1)',
                        px: 2,
                        py: 1,
                        borderRadius: '8px',
                        backdropFilter: 'blur(4px)',
                        minWidth: { xs: '40%', sm: 'auto' },
                        flex: { xs: '1 0 auto', sm: '0 0 auto' },
                        transition: 'transform 0.2s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          bgcolor: 'rgba(255,255,255,0.15)',
                        }
                      }}
                    >
                      <Typography variant="h6" sx={{ mr: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                        {feature.icon}
                      </Typography>
                      <Typography variant="body2" color="common.white" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                        {feature.text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Fade>
          </Grid>

          {!isMobile && (
            <Grid item xs={12} md={6}>
              <Fade in timeout={1000}>
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    height: { md: '55vh', lg: '65vh' },
                    maxHeight: 550,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)'
                    }
                  }}
                >
                  <Box
                    component="img"
                    src="/images/imm1.png"
                    alt="Premium cannabis products"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      display: 'block',
                      transition: 'transform 0.5s ease',
                      '&:hover': {
                        transform: 'scale(1.03)'
                      }
                    }}
                  />
                </Box>
              </Fade>
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Scroll indicator - Scrolls down to featured products */}
      <IconButton
        onClick={scrollToFeatured}
        sx={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'common.white',
          zIndex: 2,
          animation: 'bounce 2s infinite',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(4px)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            transform: 'translateX(-50%) translateY(-5px)',
          },
          transition: 'all 0.3s ease',
        }}
        aria-label="Scroll down to featured products"
      >
        <ExpandMore fontSize="large" />
      </IconButton>

      {/* Add keyframes for bounce animation */}
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateX(-50%) translateY(0);
            }
            40% {
              transform: translateX(-50%) translateY(-10px);
            }
            60% {
              transform: translateX(-50%) translateY(-5px);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default Hero;