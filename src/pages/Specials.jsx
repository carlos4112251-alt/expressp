import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Box, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Snackbar,
  Alert,
  Chip,
  IconButton,
  Tabs,
  Tab
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { 
  deals, 
  calculateOriginalPrice, 
  findProductInDeal, 
  isDealSelectionComplete, 
  getInitialSelections,
  getProductLabel 
} from '../data/deals';
import './Specials.css';

const Specials = () => {
  const { addToCart } = useCart();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [quantities, setQuantities] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique categories from deals
  const categories = ['all', ...new Set(deals.map(deal => deal.type))];

  // Filter deals by selected category
  const filteredDeals = selectedCategory === 'all' 
    ? deals 
    : deals.filter(deal => deal.type === selectedCategory);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const handleDealSelect = (deal) => {
    setSelectedDeal(deal);
    setSelectedProducts(getInitialSelections(deal));
    setQuantities({ ...deal.defaultQuantities });
    setOpenDialog(true);
  };

  const handleProductChange = (productType, value) => {
    setSelectedProducts(prev => ({
      ...prev,
      [productType]: value
    }));
  };

  const handleQuantityChange = (productType, delta) => {
    setQuantities(prev => ({
      ...prev,
      [productType]: Math.max(1, (prev[productType] || 1) + delta)
    }));
  };

  const handleAddToCart = () => {
    if (!selectedDeal || !isDealSelectionComplete(selectedDeal, selectedProducts)) return;
    
    try {
      const bundleId = `deal-${selectedDeal.id}-${Date.now()}`;
      const originalTotal = calculateOriginalPrice(selectedDeal, selectedProducts);
      
      // Add each product in the bundle to cart with special pricing
      Object.entries(selectedProducts).forEach(([productType, productId]) => {
        const product = findProductInDeal(selectedDeal, productId, productType);
        const quantity = quantities[productType] || selectedDeal.defaultQuantities[productType] || 1;
        
        let specialPrice = product.price;
        let originalPrice = product.price;
        
        // Calculate special pricing based on bundle type
        if (selectedDeal.id === 1) {
          // 2oz Flower Bundle - $90 per ounce
          specialPrice = 90;
          originalPrice = product.priceOptions?.find(opt => opt.option === '1oz')?.price || product.price;
        } else if (selectedDeal.id === 2) {
          // 6 Edible Packs - $16.67 per pack
          specialPrice = 16.67;
        } else if (selectedDeal.id === 3) {
          // 5 Cartridges - $20 per cartridge
          specialPrice = 20;
        } else if (selectedDeal.id === 4) {
          // 10 Pre-Rolls - $8 per pre-roll
          specialPrice = 8;
        } else if (selectedDeal.id === 5) {
          // 20 Pre-Rolls + 1 Edible
          if (productType === 'preRoll') {
            const ediblePrice = findProductInDeal(selectedDeal, selectedProducts.edible, 'edible')?.price || 0;
            specialPrice = (selectedDeal.price - ediblePrice) / 20;
          }
          // Edible keeps its normal price
        } else if (selectedDeal.id === 6) {
          // 1oz Flower + 1 Edible
          if (productType === 'flower') {
            const ediblePrice = findProductInDeal(selectedDeal, selectedProducts.edible, 'edible')?.price || 0;
            specialPrice = selectedDeal.price - ediblePrice;
            originalPrice = product.priceOptions?.price || product.price;
          }
          // Edible keeps its normal price
        } else if (selectedDeal.id === 7) {
          // 2 Disposable 1g Carts - $30 each
          specialPrice = 30;
        } else if (selectedDeal.id === 8) {
          // 4 Disposable 1g + 1 Edible
          if (productType === 'disposable') {
            const ediblePrice = findProductInDeal(selectedDeal, selectedProducts.edible, 'edible')?.price || 0;
            specialPrice = (selectedDeal.price - ediblePrice) / 4;
          }
          // Edible keeps its normal price
        } else if (selectedDeal.id === 9) {
          // 2 Disposable 3g Carts - $40 each
          specialPrice = 40;
        } else if (selectedDeal.id === 10) {
          // 4 Disposable 3g + 1 Edible
          if (productType === 'disposable') {
            const ediblePrice = findProductInDeal(selectedDeal, selectedProducts.edible, 'edible')?.price || 0;
            specialPrice = (selectedDeal.price - ediblePrice) / 4;
          }
          // Edible keeps its normal price
        }
        
        addToCart({
          ...product,
          price: specialPrice,
          originalPrice: originalPrice,
          selectedOption: productType === 'flower' ? { 
            ...product.priceOptions, 
            price: specialPrice 
          } : undefined,
          special: {
            id: selectedDeal.id,
            name: selectedDeal.name,
            originalPrice: originalTotal,
            bundleId,
            isBundle: true,
            bundlePrice: selectedDeal.price
          }
        }, null, quantity);
      });
      
      setSnackbarMessage(`${selectedDeal.name} added to cart!`);
      setSnackbarOpen(true);
      setOpenDialog(false);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setSnackbarMessage('Failed to add deal to cart');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const renderProductSelector = (productType, label, products, fixedQuantity = null) => (
    <>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={selectedProducts[productType] || ''}
          onChange={(e) => handleProductChange(productType, e.target.value)}
          label={label}
        >
          <MenuItem value="">
            <em>Select {label.toLowerCase()}</em>
          </MenuItem>
          {products.map(product => (
            <MenuItem key={product.id} value={product.id}>
              {product.name} {product.strain && `(${product.strain})`} - ${product.price}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      {renderQuantityControls(productType, `${label} Quantity`, fixedQuantity)}
    </>
  );

  const renderQuantityControls = (productType, label, fixedQuantity = null) => {
    if (fixedQuantity !== null) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography variant="body2">{label}:</Typography>
          <Typography variant="body2" sx={{ ml: 1, fontWeight: 'bold' }}>
            {fixedQuantity} (Special Quantity)
          </Typography>
        </Box>
      );
    }
    
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="body2">{label}:</Typography>
        <IconButton 
          size="small" 
          onClick={() => handleQuantityChange(productType, -1)}
          disabled={quantities[productType] <= 1}
        >
          <Remove />
        </IconButton>
        <Typography variant="body2" sx={{ mx: 1 }}>
          {quantities[productType] || 1}
        </Typography>
        <IconButton 
          size="small" 
          onClick={() => handleQuantityChange(productType, 1)}
        >
          <Add />
        </IconButton>
      </Box>
    );
  };

  return (
    <Container maxWidth="lg" className="specials-container">
      <Typography variant="h2" component="h1" gutterBottom className="specials-title">
        Current Deals
      </Typography>
      <Typography variant="subtitle1" paragraph className="specials-subtitle">
        Limited time offers - save big on our premium products
      </Typography>

      {/* Category Filter Tabs */}
      <Box sx={{ 
  borderBottom: 2, 
  borderColor: 'primary.main', 
  mb: 4,
  background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(139, 195, 74, 0.05) 100%)',
  borderRadius: '8px',
  padding: '16px',
  boxShadow: '0 4px 12px rgba(76, 175, 80, 0.1)'
}}>
        <Tabs
          value={selectedCategory}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="deal categories"
        >
          <Tab label="All Deals" value="all" />
          <Tab label="Mixed Bundles" value="mixed" />
          <Tab label="Flower" value="flower" />
          <Tab label="Edibles" value="edibles" />
          <Tab label="Carts" value="carts" />
          <Tab label="Pre-Rolls" value="pre-rolls" />
          <Tab label="Disposable Carts" value="disposable" />
        </Tabs>
      </Box>

      <Grid container spacing={4} className="specials-grid">
        {filteredDeals.map((deal) => (
          <Grid item xs={12} md={4} key={deal.id}>
            <Box className="special-card" data-deal-type={deal.type}>
              <Typography variant="h5" component="h3" className="special-title">
                {deal.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" className="special-price">
                  ${deal.price}
                </Typography>
                <Chip label={`Save $${deal.savingsEstimate}`} color="success" size="small" sx={{ ml: 1 }} />
              </Box>
              <Typography variant="body1" paragraph className="special-description">
                {deal.description}
              </Typography>
              
              <Box className="special-products">
                <Typography variant="subtitle2" className="products-title">
                  Includes:
                </Typography>
                <ul className="products-list">
                  {deal.includes.map((item, index) => (
                    <li key={index} className="product-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleDealSelect(deal)}
                className="special-button"
                sx={{ mt: 'auto' }}
              >
                Select Products
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Empty state when no deals match filter */}
      {filteredDeals.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h6" color="text.secondary">
            No deals found in this category
          </Typography>
          <Button 
            variant="outlined" 
            onClick={() => setSelectedCategory('all')}
            sx={{ mt: 2 }}
          >
            View All Deals
          </Button>
        </Box>
      )}

      {/* Product Selection Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        {selectedDeal && (
          <>
            <DialogTitle>{selectedDeal.name}</DialogTitle>
            <DialogContent dividers>
              <Typography variant="h6" gutterBottom>
                Deal Price: ${selectedDeal.price}
              </Typography>
              <Typography paragraph>{selectedDeal.description}</Typography>
              
              <Box sx={{ mt: 2 }}>
                {selectedDeal.id === 1 && (
                  <>
                    {renderProductSelector('flower1', 'Select First Flower', selectedDeal.products.flower1)}
                    {renderProductSelector('flower2', 'Select Second Flower', selectedDeal.products.flower2)}
                  </>
                )}
                
                {selectedDeal.id === 2 && (
                  renderProductSelector('edible', 'Select Edible', selectedDeal.products.edible, 6)
                )}
                
                {selectedDeal.id === 3 && (
                  renderProductSelector('cart', 'Select Cartridge', selectedDeal.products.cart, 5)
                )}
                
                {selectedDeal.id === 4 && (
                  renderProductSelector('preRoll', 'Select Pre-Roll', selectedDeal.products.preRoll, 10)
                )}
                
                {selectedDeal.id === 5 && (
                  <>
                    {renderProductSelector('preRoll', 'Select Pre-Roll', selectedDeal.products.preRoll, 20)}
                    {renderProductSelector('edible', 'Select Edible', selectedDeal.products.edible, 1)}
                  </>
                )}
                
                {selectedDeal.id === 6 && (
                  <>
                    {renderProductSelector('flower', 'Select 1oz Flower', selectedDeal.products.flower, 1)}
                    {renderProductSelector('edible', 'Select Edible', selectedDeal.products.edible, 1)}
                  </>
                )}
                
                {/* Disposable Deals */}
                {selectedDeal.id === 7 && (
                  renderProductSelector('disposable', 'Select Disposable', selectedDeal.products.disposable, 2)
                )}
                
                {selectedDeal.id === 8 && (
                  <>
                    {renderProductSelector('disposable', 'Select Disposable', selectedDeal.products.disposable, 4)}
                    {renderProductSelector('edible', 'Select Edible', selectedDeal.products.edible, 1)}
                  </>
                )}
                
                {selectedDeal.id === 9 && (
                  renderProductSelector('disposable', 'Select Disposable', selectedDeal.products.disposable, 2)
                )}
                
                {selectedDeal.id === 10 && (
                  <>
                    {renderProductSelector('disposable', 'Select Disposable', selectedDeal.products.disposable, 4)}
                    {renderProductSelector('edible', 'Select Edible', selectedDeal.products.edible, 1)}
                  </>
                )}
              </Box>
              
              {isDealSelectionComplete(selectedDeal, selectedProducts) && (
                <Box sx={{ mt: 2, p: 2, backgroundColor: 'grey.100', borderRadius: 1 }}>
                  <Typography variant="subtitle2">
                    Original Price: ${calculateOriginalPrice(selectedDeal, selectedProducts).toFixed(2)}
                  </Typography>
                  <Typography variant="subtitle2" color="primary">
                    You Save: ${(calculateOriginalPrice(selectedDeal, selectedProducts) - selectedDeal.price).toFixed(2)}
                  </Typography>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button 
                onClick={handleAddToCart} 
                variant="contained" 
                color="primary"
                disabled={!isDealSelectionComplete(selectedDeal, selectedProducts)}
              >
                Add to Cart - ${selectedDeal.price}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Specials;