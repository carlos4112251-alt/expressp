import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
  Button,
  List
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  Message,
  LocationOn
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Enhanced action handlers with scroll to top
  const createActionHandler = (action) => {
    return () => {
      scrollToTop();
      if (action) action();
    };
  };

  const footerLinks = [
    {
      title: 'Shop',
      links: [
        { text: 'All Products', url: '/shop' },
        { text: 'Special Offers', url: '/specials' }
      ]
    },
    {
      title: 'Information',
      links: [
        { text: 'About Us', url: '/about' },
        { text: 'Delivery Info', url: '/delivery' },
      ]
    },
    {
      title: 'Customer Service',
      links: [
        { text: 'Contact Us', url: '/contact' },
        { text: 'FAQs', url: '/faqs' },
      ]
    }
  ];

  const contactInfo = [
    {
      icon: <Message />,
      text: '(202) 428-8187',
      action: () => window.open('sms:+12024288187'),
      copy: () => navigator.clipboard.writeText('(202) 428-8187')
    },
    {
      icon: <Phone />,
      text: '(202) 428-8187',
      action: () => window.location.href = 'tel:+12024288187',
      copy: () => navigator.clipboard.writeText('(202) 428-8187')
    },
    {
      icon: <Email />,
      text: 'info@pexpress.com',
      action: () => window.location.href = 'mailto:info@pexpress.com',
      copy: () => navigator.clipboard.writeText('info@pexpress.com')
    },
    {
      icon: <LocationOn />,
      text: 'Washington, DC',
      action: () => window.open('https://maps.google.com?q=Washington+DC', '_blank'),
      copy: () => navigator.clipboard.writeText('Washington, DC')
    }
  ];

  // Enhanced link component with scroll to top
  const FooterLink = ({ href, children, ...props }) => {
    const handleClick = (e) => {
      e.preventDefault();
      scrollToTop();
      // Navigate after scrolling
      setTimeout(() => {
        window.location.href = href;
      }, 100);
    };

    return (
      <Link
        href={href}
        onClick={handleClick}
        color="inherit"
        underline="hover"
        sx={{
          display: 'block',
          mb: 1,
          fontSize: '0.875rem',
          '&:hover': {
            color: theme.palette.primary.main
          }
        }}
        {...props}
      >
        {children}
      </Link>
    );
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        pt: 8,
        pb: 4,
        borderTop: `1px solid ${theme.palette.divider}`
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Logo and description */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main,
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              onClick={scrollToTop}
            >
              Pot Express
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Your premier destination for high-quality cannabis products.
              We're committed to providing the best experience for our customers.
            </Typography>

            {/* I-71 Compliance Notice */}
            <Typography variant="caption" sx={{
              display: 'block',
              mb: 2,
              p: 1.5,
              backgroundColor: theme.palette.grey[100],
              borderRadius: 1,
              border: `1px solid ${theme.palette.grey[300]}`,
              fontSize: '0.75rem',
              lineHeight: 1.4,
              color: theme.palette.text.secondary
            }}>
              🚨 I-71 COMPLIANCE NOTICE: Must be 21+.
              Valid government ID required. Products contain THC.
              Keep out of reach of children. Consume responsibly.
            </Typography>

            {/* Social media */}
            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              <IconButton
                aria-label="Facebook"
                color="primary"
                onClick={createActionHandler(() => window.open('https://facebook.com', '_blank'))}
              >
                <Facebook />
              </IconButton>
              <IconButton
                aria-label="Twitter"
                color="primary"
                onClick={createActionHandler(() => window.open('https://twitter.com', '_blank'))}
              >
                <Twitter />
              </IconButton>
              <IconButton
                aria-label="Instagram"
                color="primary"
                onClick={createActionHandler(() => window.open('https://instagram.com', '_blank'))}
              >
                <Instagram />
              </IconButton>
              <IconButton
                aria-label="LinkedIn"
                color="primary"
                onClick={createActionHandler(() => window.open('https://linkedin.com', '_blank'))}
              >
                <LinkedIn />
              </IconButton>
            </Box>

            {/* Newsletter */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Subscribe to our newsletter
              </Typography>
              <Box
                component="form"
                sx={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: 1
                }}
              >
                <input
                  type="email"
                  placeholder="Your email"
                  style={{
                    padding: '10px 15px',
                    borderRadius: '8px',
                    border: `1px solid ${theme.palette.divider}`,
                    flexGrow: 1,
                    fontSize: '14px',
                    backgroundColor: theme.palette.background.default
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: '8px'
                  }}
                  onClick={createActionHandler()}
                >
                  Subscribe
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Footer links */}
          {footerLinks.map((column, index) => (
            <Grid item xs={12} sm={4} md={2} key={index}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: theme.palette.text.primary
                }}
              >
                {column.title}
              </Typography>
              <List dense>
                {column.links.map((link, linkIndex) => (
                  <FooterLink key={linkIndex} href={link.url}>
                    {link.text}
                  </FooterLink>
                ))}
              </List>
            </Grid>
          ))}

          {/* Contact info */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: theme.palette.text.primary
              }}
            >
              Contact Us
            </Typography>
            <Box>
              {contactInfo.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                    cursor: 'pointer',
                    '&:hover': {
                      color: theme.palette.primary.main
                    }
                  }}
                  onClick={createActionHandler(item.action)}
                >
                  <Box sx={{
                    color: theme.palette.primary.main,
                    mr: 2,
                    display: 'flex'
                  }}>
                    {item.icon}
                  </Box>
                  <Typography variant="body2" sx={{ userSelect: 'none' }}>
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Additional Compliance Text */}
            <Box sx={{ mt: 3, p: 2, backgroundColor: theme.palette.grey[50], borderRadius: 2 }}>
              <Typography variant="caption" sx={{
                display: 'block',
                fontSize: '0.7rem',
                lineHeight: 1.4,
                color: theme.palette.text.secondary
              }}>
                ⚠️ LEGAL DISCLAIMER: This product has intoxicating effects
                and may be habit forming. Marijuana can impair concentration,
                coordination, and judgment. Do not operate a vehicle or
                machinery under the influence.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Copyright and compliance footer */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Pot Express. All rights reserved.
          </Typography>

          {/* Additional compliance text */}
          <Typography variant="caption" align="center" sx={{
            maxWidth: 800,
            color: theme.palette.text.disabled,
            fontSize: '0.7rem',
            lineHeight: 1.4
          }}>
            🏛️ DISTRICT COMPLIANCE: Operating under DC Initiative 71 regulations.
            Products are provided as gifts with qualifying purchases.
            Not for sale to minors. All transactions comply with DC Code § 48–901.02.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;