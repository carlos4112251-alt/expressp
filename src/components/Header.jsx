import React, { useState } from 'react';
import { 
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tooltip
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart,
  Close,
  LocalMall,
  FavoriteBorder,
  Phone,
  Whatshot,
  Call,
  Message,
  Close as CloseIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [textDialogOpen, setTextDialogOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const phoneNumber = '2024288187';
  const formattedNumber = '(202) 428-8187';

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { 
      name: 'Special offer', 
      path: '/specials',
      icon: <Whatshot fontSize="small" />,
      color: 'error.main'
    },
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
  ];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handlePhoneClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePhoneClose = () => {
    setAnchorEl(null);
  };

  const handleCall = () => {
    window.open(`tel:${phoneNumber}`);
    handlePhoneClose();
  };

  const handleText = () => {
    setTextDialogOpen(true);
    handlePhoneClose();
  };

  const handleSendText = () => {
    window.open(`sms:${phoneNumber}${message ? `?body=${encodeURIComponent(message)}` : ''}`);
    setTextDialogOpen(false);
    setMessage('');
  };

  const handleCloseTextDialog = () => {
    setTextDialogOpen(false);
    setMessage('');
  };

  // Handler for navigation with scroll to top
  const handleNavigation = (e) => {
    scrollToTop();
    // Close drawer if open
    if (drawerOpen) {
      setDrawerOpen(false);
    }
  };

  return (
    <AppBar position="sticky" sx={{ 
      backgroundColor: 'white',
      color: 'text.primary',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo */}
        <Typography 
          variant="h6" 
          component={Link} 
          to="/"
          onClick={scrollToTop}
          sx={{ 
            fontWeight: 700,
            color: 'primary.main',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            mr: 2
          }}
        >
          <LocalMall sx={{ mr: 1, fontSize: 30 }} />
          PotExpress
        </Typography>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                component={Link}
                to={item.path}
                onClick={scrollToTop}
                sx={{ 
                  mx: 1,
                  color: item.color || 'text.primary',
                  fontWeight: 500,
                  '&:hover': {
                    color: item.color ? 'error.dark' : 'primary.main',
                    backgroundColor: 'transparent'
                  }
                }}
                startIcon={item.icon || null}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Action Icons */}
        <Box sx={{ display: 'flex' }}>
          {/* Phone Contact Button */}
          <Tooltip title="Contact Us">
            <IconButton 
              color="inherit" 
              onClick={handlePhoneClick}
              sx={{ mx: 1 }}
            >
              <Phone />
            </IconButton>
          </Tooltip>

          <IconButton 
            color="inherit" 
            component={Link} 
            to="/wishlist"
            onClick={scrollToTop}
            sx={{ mx: 1 }}
          >
            <Badge badgeContent={wishlistCount} color="primary">
              <FavoriteBorder />
            </Badge>
          </IconButton>
          
          <IconButton 
            color="inherit" 
            component={Link} 
            to="/cart"
            onClick={scrollToTop}
            sx={{ mx: 1 }}
          >
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>

      {/* Phone Contact Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handlePhoneClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200
          }
        }}
      >
        <MenuItem onClick={handleCall}>
          <ListItemIcon>
            <Call fontSize="small" />
          </ListItemIcon>
          <ListItemText>Call {formattedNumber}</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={handleText}>
          <ListItemIcon>
            <Message fontSize="small" />
          </ListItemIcon>
          <ListItemText>Text {formattedNumber}</ListItemText>
        </MenuItem>
      </Menu>

      {/* Text Message Dialog */}
      <Dialog open={textDialogOpen} onClose={handleCloseTextDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6">Send Text Message</Typography>
          <Typography variant="body2" color="text.secondary">
            To: {formattedNumber}
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Your message (optional)"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
          />
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleCloseTextDialog} startIcon={<CloseIcon />}>
            Cancel
          </Button>
          <Button 
            onClick={handleSendText} 
            variant="contained" 
            startIcon={<Message />}
            disabled={message.length > 160}
          >
            Send Text
          </Button>
        </DialogActions>
        
        {message.length > 0 && (
          <Typography variant="caption" color="text.secondary" sx={{ px: 3, pb: 2 }}>
            Characters: {message.length}/160
          </Typography>
        )}
      </Dialog>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box'
          }
        }}
      >
        <Box
          sx={{ 
            display: 'flex',
            justifyContent: 'flex-end',
            p: 1 
          }}
        >
          <IconButton onClick={toggleDrawer(false)}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem 
              button 
              key={item.name}
              component={Link}
              to={item.path}
              onClick={(e) => {
                handleNavigation(e);
                toggleDrawer(false)();
              }}
              sx={{
                '&:hover': {
                  backgroundColor: item.color ? 'error.light' : 'primary.light',
                  color: item.color ? 'error.dark' : 'primary.main'
                }
              }}
            >
              {item.icon && (
                <Box sx={{ color: item.color, mr: 1 }}>
                  {item.icon}
                </Box>
              )}
              <ListItemText 
                primary={item.name} 
                sx={{ 
                  color: item.color || 'inherit',
                  fontWeight: item.color ? 600 : 'normal'
                }} 
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem 
            button 
            component={Link}
            to="/wishlist"
            onClick={(e) => {
              handleNavigation(e);
              toggleDrawer(false)();
            }}
          >
            <ListItemText 
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  Wishlist
                  <Badge 
                    badgeContent={wishlistCount} 
                    color="primary" 
                    sx={{ ml: 1 }}
                  />
                </Box>
              } 
            />
          </ListItem>
          <ListItem 
            button 
            component={Link}
            to="/cart"
            onClick={(e) => {
              handleNavigation(e);
              toggleDrawer(false)();
            }}
          >
            <ListItemText 
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  Cart
                  <Badge 
                    badgeContent={cartCount} 
                    color="primary" 
                    sx={{ ml: 1 }}
                  />
                </Box>
              } 
            />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;