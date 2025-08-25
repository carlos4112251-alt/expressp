import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  LocalPharmacy,
  DeliveryDining,
  Nature, // Replaces Eco
  EmojiNature,
  VerifiedUser,
  Spa // Alternative plant icon
} from '@mui/icons-material';

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      icon: <LocalPharmacy fontSize="large" color="primary" />,
      title: "Premium Products",
      description: "Sourced from trusted local growers and manufacturers"
    },
    {
      icon: <DeliveryDining fontSize="large" color="primary" />,
      title: "Fast Delivery",
      description: "Discreet and reliable service in under 60 minutes"
    },
    {
      icon: <Nature fontSize="large" color="primary" />, // Changed from Eco to Nature
      title: "Sustainable Practices",
      description: "Eco-friendly packaging and cultivation methods"
    },
    {
      icon: <VerifiedUser fontSize="large" color="primary" />,
      title: "Lab Tested",
      description: "All products rigorously tested for purity and potency"
    }
  ];

  return (
    <Box sx={{ py: isMobile ? 4 : 8 }}>
      {/* Hero Section */}
      <Box sx={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/images/about-hero.PNG)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        py: 10,
        textAlign: 'center',
        mb: 6
      }}>
        <Container maxWidth="md">
          <Typography variant={isMobile ? 'h3' : 'h2'} component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Our Story
          </Typography>
          <Typography variant={isMobile ? 'h6' : 'h5'} component="p">
            Committed to quality, service, and community since 2025
          </Typography>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              The Pot Express Mission
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
              Founded in Washington, DC, Pot Express was born from a simple idea: cannabis should be accessible, 
              high-quality, and delivered with exceptional service.
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
              We partner with local growers who share our commitment to organic cultivation and sustainable practices, 
              ensuring you receive the purest products available.
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
              Our knowledgeable staff can guide both medical patients and recreational users to find the perfect 
              products for their needs.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/btl.PNG"
              alt="Cannabis cultivation"
              sx={{
                width: '100%',
                borderRadius: 2,
                boxShadow: 3
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ backgroundColor: '#f9f9f9', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 6, fontWeight: 600 }}>
            Why Choose Pot Express
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                  <Avatar sx={{ 
                    backgroundColor: 'primary.light', 
                    width: 60, 
                    height: 60,
                    margin: '0 auto 16px'
                  }}>
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
{/* 
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 6, fontWeight: 600 }}>
          Meet Our Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              name: "Alex Johnson",
              role: "Founder & CEO",
              image: "/images/team1.PNG",
              bio: "10+ years in cannabis industry advocacy"
            },
            {
              name: "Maria Garcia",
              role: "Head Grower",
              image: "/images/team2.PNG",
              bio: "Master horticulturist specializing in organic cultivation"
            },
            {
              name: "Jamie Smith",
              role: "Customer Care",
              image: "/images/team3.PNG",
              bio: "Dedicated to finding your perfect product match"
            }
          ].map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar
                  src={member.image}
                  alt={member.name}
                  sx={{ 
                    width: 160, 
                    height: 160, 
                    margin: '0 auto 16px',
                    border: '3px solid',
                    borderColor: 'primary.main'
                  }}
                />
                <Typography variant="h6" component="h3">
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  {member.role}
                </Typography>
                <Typography variant="body2">
                  {member.bio}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container> */}

      {/* Values Section */}
      <Box sx={{ backgroundColor: '#e8ececff', color: 'white', py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 6, fontWeight: 600 }}>
            Our Values
          </Typography>
          <Grid container spacing={4}>
            {[
              "Quality Over Quantity",
              "Community Engagement",
              "Education & Transparency",
              "Sustainable Practices",
              "Customer Satisfaction"
            ].map((value, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EmojiNature sx={{ mr: 2, fontSize: '2rem' }} />
                  <Typography variant="h6">
                    {value}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default About;