import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  alpha,
  useTheme,
  useMediaQuery,
  Alert,
  Snackbar,
  IconButton
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  Schedule,
  Message, // Changed from Send to Message
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  WhatsApp,
  ContentCopy
} from '@mui/icons-material';

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSnackbarMessage('Thank you for your message! We\'ll get back to you within 24 hours.');
    setOpenSnackbar(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handlePhoneClick = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleEmailClick = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handleAddressClick = (address) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
  };

  const handleCopyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackbarMessage(`${type} copied to clipboard!`);
      setOpenSnackbar(true);
    }).catch(err => {
      console.error('Failed to copy:', err);
      setSnackbarMessage('Failed to copy to clipboard');
      setOpenSnackbar(true);
    });
  };

  const contactInfo = [
    
    {
      icon: <Phone sx={{ fontSize: '2rem' }} />,
      title: 'Phone',
      content: '(720) 555-1234',
      color: '#4ECDC4',
      action: (content) => handlePhoneClick(content),
      copy: (content) => handleCopyToClipboard(content, 'Phone number')
    },
    
    {
      icon: <Schedule sx={{ fontSize: '2rem' }} />,
      title: 'Hours',
      content: 'Mon-Thu: 9am-10pm\nFri-Sat: 9am-10pm\nSun: 9am-9pm',
      color: '#F9A826',
      copy: (content) => handleCopyToClipboard(content, 'Business hours')
    },
    {
      icon: <Email sx={{ fontSize: '2rem' }} />,
      title: 'Email',
      content: 'info@pexpress.com',
      color: '#45B7D1',
      action: (content) => handleEmailClick(content),
      copy: (content) => handleCopyToClipboard(content, 'Email')
    },
    {
      icon: <LocationOn sx={{ fontSize: '2rem' }} />,
      title: 'Location',
      content: 'Washington, DC',
      color: '#FF6B6B',
      action: (content) => handleAddressClick(content.replace('\n', ', ')),
      copy: (content) => handleCopyToClipboard(content.replace('\n', ', '), 'Address')
    }
  ];

  const socialLinks = [
    { icon: <Facebook />, color: '#1877F2', href: 'https://facebook.com/potexpress' },
    { icon: <Twitter />, color: '#1DA1F2', href: 'https://twitter.com/potexpress' },
    { icon: <Instagram />, color: '#E4405F', href: 'https://instagram.com/potexpress' },
    { icon: <LinkedIn />, color: '#0077B5', href: 'https://linkedin.com/company/potexpress' },
    { icon: <WhatsApp />, color: '#25D366', href: 'https://wa.me/17205551234' }
  ];

  return (
    <Box sx={{ 
      py: isMobile ? 4 : 8,
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)',
      minHeight: '100vh'
    }}>
      {/* Modern Hero Section */}
      <Box sx={{
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.9)} 0%, ${alpha(theme.palette.secondary.main, 0.9)} 100%), url(/images/contact-hero.PNG)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: isMobile ? 'scroll' : 'fixed',
        color: 'white',
        py: 12,
        textAlign: 'center',
        mb: 8,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(76, 175, 80, 0.4) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        
        <Container maxWidth="md">
          <Typography 
            variant={isMobile ? 'h3' : 'h2'} 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 800,
              letterSpacing: '-0.5px',
              mb: 3,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            Get in Touch
          </Typography>
          <Typography 
            variant={isMobile ? 'h6' : 'h5'} 
            component="p"
            sx={{ 
              opacity: 0.9,
              fontWeight: 300,
              maxWidth: 600,
              margin: '0 auto'
            }}
          >
            We're here to help you find the perfect products and answer all your questions
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl">
        <Grid container spacing={6} alignItems="stretch">
          {/* Contact Form - Modern Card */}
          <Grid item xs={12} md={7}>
            <Card sx={{ 
              borderRadius: 4,
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)'
            }}>
              <CardContent sx={{ p: 5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Message sx={{ 
                    fontSize: '2.5rem', 
                    mr: 2,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }} />
                  <Typography 
                    variant="h4" 
                    component="h2" 
                    sx={{ 
                      fontWeight: 700,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    Send Us a Message
                  </Typography>
                </Box>
                
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 3,
                            backgroundColor: 'white',
                            '&:hover': {
                              backgroundColor: '#fafafa'
                            }
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 3,
                            backgroundColor: 'white',
                            '&:hover': {
                              backgroundColor: '#fafafa'
                            }
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 3,
                            backgroundColor: 'white',
                            '&:hover': {
                              backgroundColor: '#fafafa'
                            }
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Your Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        multiline
                        rows={5}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 3,
                            backgroundColor: 'white',
                            '&:hover': {
                              backgroundColor: '#fafafa'
                            }
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        endIcon={<Message />}
                        sx={{
                          py: 2,
                          borderRadius: 3,
                          fontWeight: 700,
                          fontSize: '1.1rem',
                          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                          boxShadow: '0 8px 25px rgba(76, 175, 80, 0.3)',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 12px 35px rgba(76, 175, 80, 0.4)',
                            background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Info - Modern Layout */}
          <Grid item xs={12} md={5}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {/* Contact Info Cards */}
              <Grid container spacing={3}>
                {contactInfo.map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card sx={{ 
                      borderRadius: 3,
                      background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.12)'
                      }
                    }}>
                      <CardContent sx={{ p: 3, textAlign: 'center', position: 'relative' }}>
                        {/* Copy Button */}
                        <IconButton
                          size="small"
                          onClick={() => item.copy(item.content)}
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'text.secondary',
                            '&:hover': {
                              color: item.color,
                              backgroundColor: alpha(item.color, 0.1)
                            }
                          }}
                        >
                          <ContentCopy fontSize="small" />
                        </IconButton>

                        <Box 
                          onClick={() => item.action && item.action(item.content)}
                          sx={{ 
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            backgroundColor: alpha(item.color, 0.1),
                            color: item.color,
                            mb: 2,
                            cursor: item.action ? 'pointer' : 'default',
                            transition: 'all 0.3s ease',
                            '&:hover': item.action ? {
                              backgroundColor: alpha(item.color, 0.2),
                              transform: 'scale(1.1)'
                            } : {}
                          }}
                        >
                          {item.icon}
                        </Box>
                        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                          {item.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.secondary', 
                            whiteSpace: 'pre-line',
                            cursor: item.action ? 'pointer' : 'default',
                            '&:hover': item.action ? {
                              color: item.color,
                              textDecoration: 'underline'
                            } : {}
                          }}
                          onClick={() => item.action && item.action(item.content)}
                        >
                          {item.content}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Social Media */}
              <Card sx={{ 
                borderRadius: 3,
                background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.08)'
              }}>
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                    Follow Us
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    {socialLinks.map((social, index) => (
                      <IconButton
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          backgroundColor: alpha(social.color, 0.1),
                          color: social.color,
                          width: 50,
                          height: 50,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: social.color,
                            color: 'white',
                            transform: 'translateY(-2px)',
                            boxShadow: `0 6px 20px ${alpha(social.color, 0.3)}`
                          }
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    ))}
                  </Box>
                </CardContent>
              </Card>

              {/* Map */}
              <Box sx={{ 
                flex: 1,
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <iframe 
                  title="We are Located"
                  width="100%" 
                  height="300" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight="0" 
                  marginWidth="0" 
                  src="https://maps.google.com/maps?q=Washington,%20DC&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  style={{ 
                    filter: 'grayscale(20%) contrast(110%)',
                    border: 'none'
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Success Notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          sx={{ 
            borderRadius: 3,
            boxShadow: '0 8px 25px rgba(76, 175, 80, 0.3)',
            fontWeight: 500
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;