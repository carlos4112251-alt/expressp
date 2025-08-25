import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  LocalFireDepartment,
  Cake,
  Spa,
  Opacity,
  Whatshot,
  Straighten,
  BatteryAlert,
} from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();

  const featuredProducts = products.slice(0, 4);

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler for navigation with scroll to top
  const handleNavigate = (e) => {
    e.preventDefault();
    scrollToTop();
    // Navigate after a short delay to allow scrolling
    setTimeout(() => {
      window.location.href = e.currentTarget.href;
    }, 100);
  };

  // Get actual counts from products data
  const getCategoryCount = (category) =>
    products.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase()).length;

  const categories = [
    {
      name: 'Flower',
      icon: <Spa fontSize="large" />,
      count: getCategoryCount('flower'),
      filter: 'flower'
    },
    {
      name: 'Cartridges',
      icon: <Straighten fontSize="large" />,
      count: getCategoryCount('cart'),
      filter: 'cart'
    },
    {
      name: 'Disposables',
      icon: <BatteryAlert fontSize="large" />,
      count: getCategoryCount('disposable-cart'),
      filter: 'disposable-cart'
    },
    {
      name: 'Edibles',
      icon: <Cake fontSize="large" />,
      count: getCategoryCount('edibles'),
      filter: 'edibles'
    },
    {
      name: 'Shake',
      icon: <LocalFireDepartment fontSize="large" />,
      count: getCategoryCount('shake'),
      filter: 'shake'
    },
    {
      name: 'Concentrates',
      icon: <Opacity fontSize="large" />,
      count: getCategoryCount('concentrates'),
      filter: 'concentrates'
    },
    {
      name: 'Pre-rolls',
      icon: <LocalFireDepartment fontSize="large" />,
      count: getCategoryCount('pre-rolls'),
      filter: 'pre-rolls'
    }
  ];

  return (
    <Box>
      {/* Hero Banner */}
      <Hero />

      {/* Featured Products */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom sx={{
          fontWeight: 700,
          mb: 6,
          position: 'relative',
          '&:after': {
            content: '""',
            display: 'block',
            width: '80px',
            height: '4px',
            backgroundColor: 'primary.main',
            margin: '16px auto 0'
          }
        }}>
          Featured Products
        </Typography>

        <Grid container spacing={4}>
          {featuredProducts.map((product) => (
            <Grid item xs={6} sm={6} md={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            component={RouterLink}
            to="/shop"
            onClick={scrollToTop}
            sx={{
              px: 6,
              py: 1.5,
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}
          >
            View All Products
          </Button>
        </Box>
      </Container>

      {/* Categories Section */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" gutterBottom sx={{
            fontWeight: 700,
            mb: 6,
            position: 'relative',
            '&:after': {
              content: '""',
              display: 'block',
              width: '80px',
              height: '4px',
              backgroundColor: 'primary.main',
              margin: '16px auto 0'
            }
          }}>
            Shop By Category
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  component={RouterLink}
                  to={`/shop?category=${category.filter}`}
                  onClick={scrollToTop}
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: 2,
                    p: 3,
                    textAlign: 'center',
                    height: '100%',
                    width: '100%',
                    maxWidth: 300,
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 3
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    textTransform: 'none',
                    color: 'inherit'
                  }}
                >
                  <Box sx={{
                    width: 80,
                    height: 80,
                    backgroundColor: 'primary.light',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    color: 'primary.main'
                  }}>
                    {category.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.count} {category.count === 1 ? 'item' : 'items'}
                  </Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Why Choose Us Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              position: 'relative',
              display: 'inline-block',
              '&:after': {
                content: '""',
                display: 'block',
                width: '80px',
                height: '4px',
                backgroundColor: 'primary.main',
                margin: '16px auto 0'
              }
            }}
          >
            Why Choose Pot Express
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: '1.1rem',
              maxWidth: 700,
              margin: '0 auto',
              mb: 4
            }}
          >
            We're committed to providing the highest quality cannabis products with exceptional service.
          </Typography>
        </Box>

        <Grid container spacing={6} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            <Box
              component="ul"
              sx={{
                pl: 0,
                textAlign: 'center',
                listStyle: 'none',
                mb: 4
              }}
            >
              {[
                "Fast, discreet delivery",
                "Lab-tested products",
                "Knowledgeable staff",
                "Competitive pricing",
                "Local growers & producers"
              ].map((item, index) => (
                <Box
                  component="li"
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    fontSize: '1.1rem'
                  }}
                >
                  <Whatshot color="primary" sx={{ mr: 1, fontSize: '1.2rem' }} />
                  {item}
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={8} lg={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              component="img"
              src="/images/zip.png"
              alt="Premium cannabis products"
              sx={{
                width: '100%',
                maxWidth: 500,
                borderRadius: 2,
                boxShadow: 3
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box sx={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/images/cta-bg.JPG)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        py: 10,
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography variant={isMobile ? 'h4' : 'h3'} component="h2" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            Ready to Experience Premium Cannabis?
          </Typography>
          <Typography variant="h6" component="p" gutterBottom sx={{ mb: 4 }}>
            Order now for fast, discreet delivery
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            component={RouterLink}
            to="/shop"
            onClick={scrollToTop}
            sx={{
              px: 6,
              py: 1.5,
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}
          >
            Shop Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;