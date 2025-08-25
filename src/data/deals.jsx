import products from './products';

const flowerProducts = products.filter(p => p.category.toLowerCase() === 'flower');
const edibleProducts = products.filter(p => p.category.toLowerCase() === 'edibles');
const cartProducts = products.filter(p => p.category.toLowerCase() === 'cart');
const preRollProducts = products.filter(p => p.category.toLowerCase() === 'pre-rolls');
const disposableProducts = products.filter(p => p.category.toLowerCase() === 'disposable-cart');

const deals = [
  {
    id: 1,
    name: "2oz Flower Bundle",
    description: "Two ounces of premium flower for $180 (save $20+)",
    price: 180,
    category: "Bundle",
    type: "flower",
    image: "/images/bundles/flower-bundle.jpg",
    products: {
      flower1: flowerProducts,
      flower2: flowerProducts
    },
    defaultQuantities: {
      flower1: 1,
      flower2: 1
    },
    savingsEstimate: "20+",
    includes: ["Choice of two 1oz flower strains"],
    effects: ["Varied based on selection"],
    flavors: ["Varied based on selection"]
  },
  {
    id: 2,
    name: "6 Edible Packs",
    description: "Six packs of premium edibles for $100 (save $50+)",
    price: 100,
    category: "Bundle", 
    type: "edibles",
    image: "/images/bundles/edible-bundle.jpg",
    products: {
      edible: edibleProducts
    },
    defaultQuantities: {
      edible: 6
    },
    savingsEstimate: "50+",
    includes: ["Six packs of assorted edibles"],
    effects: ["Relaxed", "Happy", "Uplifted"],
    flavors: ["Mixed flavors"]
  },
  {
    id: 3,
    name: "5 Cartridges",
    description: "Five premium cartridges for $100 (save $125+)", 
    price: 100,
    category: "Bundle",
    type: "carts",
    image: "/images/bundles/cartridge-bundle.jpg",
    products: {
      cart: cartProducts
    },
    defaultQuantities: {
      cart: 5
    },
    savingsEstimate: "125+",
    includes: ["Five 510-thread cartridges"],
    effects: ["Varied based on selection"],
    flavors: ["Varied based on selection"]
  },
  {
    id: 4,
    name: "10 Pre-Rolls",
    description: "Ten premium pre-rolls for $80 (save $20+)",
    price: 80,
    category: "Bundle",
    type: "pre-rolls", 
    image: "/images/bundles/pre-roll-bundle.jpg",
    products: {
      preRoll: preRollProducts
    },
    defaultQuantities: {
      preRoll: 10
    },
    savingsEstimate: "20+",
    includes: ["Ten 1g premium pre-rolls"],
    effects: ["Varied based on selection"],
    flavors: ["Varied based on selection"]
  },
  {
    id: 5,
    name: "20 Pre-Rolls + 1 Edible",
    description: "Twenty pre-rolls plus one edible pack for $160 (save $40+)",
    price: 160,
    category: "Bundle",
    type: "mixed",
    image: "/images/bundles/mega-bundle.jpg",
    products: {
      preRoll: preRollProducts,
      edible: edibleProducts
    },
    defaultQuantities: {
      preRoll: 20,
      edible: 1
    },
    savingsEstimate: "40+",
    includes: ["Twenty 1g pre-rolls", "One edible pack"],
    effects: ["Varied based on selection"],
    flavors: ["Varied based on selection"]
  },
  {
    id: 6,
    name: "1oz Flower + 1 Edible",
    description: "Get any 1oz of flower plus one edible pack for just $100",
    price: 100,
    category: "Bundle",
    type: "mixed",
    image: "/images/bundles/starter-bundle.jpg",
    products: {
      flower: flowerProducts.map(p => ({
        ...p,
        priceOptions: p.priceOptions?.find(opt => opt.option === '1oz')
      })).filter(p => p.priceOptions),
      edible: edibleProducts
    },
    defaultQuantities: {
      flower: 1,
      edible: 1
    },
    savingsEstimate: "25+",
    includes: ["One 1oz flower", "One edible pack"],
    effects: ["Varied based on selection"],
    flavors: ["Varied based on selection"]
  },
  // New Disposable Deals
  {
    id: 7,
    name: "2 Disposable 1g Carts",
    description: "Two 1g disposable vape cartridges for $60 (save $20+)",
    price: 60,
    category: "Bundle",
    type: "disposable",
    image: "/images/bundles/disposable-bundle.jpg",
    products: {
      disposable: disposableProducts.filter(p => p.weight === '1g')
    },
    defaultQuantities: {
      disposable: 2
    },
    savingsEstimate: "20+",
    includes: ["Two 1g disposable vapes"],
    effects: ["Varied based on selection"],
    flavors: ["Varied based on selection"]
  },
  {
    id: 8,
    name: "4 Disposable 1g + 1 Edible",
    description: "Four 1g disposable vapes plus one edible pack for $120 (save $40+)",
    price: 120,
    category: "Bundle",
    type: "mixed",
    image: "/images/bundles/disposable-edible-bundle.jpg",
    products: {
      disposable: disposableProducts.filter(p => p.weight === '1g'),
      edible: edibleProducts
    },
    defaultQuantities: {
      disposable: 4,
      edible: 1
    },
    savingsEstimate: "40+",
    includes: ["Four 1g disposable vapes", "One edible pack"],
    effects: ["Varied based on selection"],
    flavors: ["Varied based on selection"]
  },
  {
    id: 9,
    name: "2 Disposable 3g Carts",
    description: "Two 3g disposable vape cartridges for $80 (save $30+)",
    price: 80,
    category: "Bundle",
    type: "disposable",
    image: "/images/bundles/disposable-3g-bundle.jpg",
    products: {
      disposable: disposableProducts.filter(p => p.weight === '3g')
    },
    defaultQuantities: {
      disposable: 2
    },
    savingsEstimate: "30+",
    includes: ["Two 3g disposable vapes"],
    effects: ["Varied based on selection"],
    flavors: ["Varied based on selection"]
  },
  {
    id: 10,
    name: "4 Disposable 3g + 1 Edible",
    description: "Four 3g disposable vapes plus one edible pack for $160 (save $60+)",
    price: 160,
    category: "Bundle",
    type: "mixed",
    image: "/images/bundles/disposable-3g-edible-bundle.jpg",
    products: {
      disposable: disposableProducts.filter(p => p.weight === '3g'),
      edible: edibleProducts
    },
    defaultQuantities: {
      disposable: 4,
      edible: 1
    },
    savingsEstimate: "60+",
    includes: ["Four 3g disposable vapes", "One edible pack"],
    effects: ["Varied based on selection"],
    flavors: ["Varied based on selection"]
  }
];

// Helper function to calculate original price for a deal
const calculateOriginalPrice = (deal, selections) => {
  if (deal.id === 1) {
    const flower1 = deal.products.flower1.find(p => p.id === selections.flower1);
    const flower2 = deal.products.flower2.find(p => p.id === selections.flower2);
    const price1 = flower1?.priceOptions?.find(opt => opt.option === '1oz')?.price || 0;
    const price2 = flower2?.priceOptions?.find(opt => opt.option === '1oz')?.price || 0;
    return price1 + price2;
  } else if (deal.id === 2) {
    const edible = deal.products.edible.find(p => p.id === selections.edible);
    return edible ? edible.price * 6 : 0;
  } else if (deal.id === 3) {
    const cart = deal.products.cart.find(p => p.id === selections.cart);
    return cart ? cart.price * 5 : 0;
  } else if (deal.id === 4) {
    const preRoll = deal.products.preRoll.find(p => p.id === selections.preRoll);
    return preRoll ? preRoll.price * 10 : 0;
  } else if (deal.id === 5) {
    const preRoll = deal.products.preRoll.find(p => p.id === selections.preRoll);
    const edible = deal.products.edible.find(p => p.id === selections.edible);
    return (preRoll ? preRoll.price * 20 : 0) + (edible ? edible.price : 0);
  } else if (deal.id === 6) {
    const flower = deal.products.flower.find(p => p.id === selections.flower);
    const edible = deal.products.edible.find(p => p.id === selections.edible);
    return (flower ? flower.priceOptions?.price : 0) + (edible ? edible.price : 0);
  } else if (deal.id === 7) {
    const disposable = deal.products.disposable.find(p => p.id === selections.disposable);
    return disposable ? disposable.price * 2 : 0;
  } else if (deal.id === 8) {
    const disposable = deal.products.disposable.find(p => p.id === selections.disposable);
    const edible = deal.products.edible.find(p => p.id === selections.edible);
    return (disposable ? disposable.price * 4 : 0) + (edible ? edible.price : 0);
  } else if (deal.id === 9) {
    const disposable = deal.products.disposable.find(p => p.id === selections.disposable);
    return disposable ? disposable.price * 2 : 0;
  } else if (deal.id === 10) {
    const disposable = deal.products.disposable.find(p => p.id === selections.disposable);
    const edible = deal.products.edible.find(p => p.id === selections.edible);
    return (disposable ? disposable.price * 4 : 0) + (edible ? edible.price : 0);
  }
  return 0;
};

// Helper function to get product by ID from deal
const findProductInDeal = (deal, productId, productType) => {
  return deal.products[productType]?.find(p => p.id === productId);
};

// Helper function to check if selection is complete for a deal
const isDealSelectionComplete = (deal, selections) => {
  if (deal.id === 1) {
    return selections.flower1 && selections.flower2;
  } else if (deal.id === 2) {
    return selections.edible;
  } else if (deal.id === 3) {
    return selections.cart;
  } else if (deal.id === 4) {
    return selections.preRoll;
  } else if (deal.id === 5) {
    return selections.preRoll && selections.edible;
  } else if (deal.id === 6) {
    return selections.flower && selections.edible;
  } else if (deal.id === 7) {
    return selections.disposable;
  } else if (deal.id === 8) {
    return selections.disposable && selections.edible;
  } else if (deal.id === 9) {
    return selections.disposable;
  } else if (deal.id === 10) {
    return selections.disposable && selections.edible;
  }
  return false;
};

// Helper function to get initial selections for a deal
const getInitialSelections = (deal) => {
  const selections = {};
  Object.keys(deal.products).forEach(key => {
    selections[key] = '';
  });
  return selections;
};

// Helper function to get product label for display
const getProductLabel = (productType, dealId) => {
  switch(productType) {
    case 'flower': return '1oz Flower';
    case 'flower1': return 'First Flower';
    case 'flower2': return 'Second Flower';
    case 'edible': 
      return dealId === 2 ? '6 Edible Packs' : '1 Edible Pack';
    case 'cart': return '5 Cartridges';
    case 'preRoll': 
      return dealId === 4 ? '10 Pre-Rolls' : dealId === 5 ? '20 Pre-Rolls' : 'Pre-Rolls';
    case 'disposable':
      if (dealId === 7) return '2 Disposable 1g Carts';
      if (dealId === 8) return '4 Disposable 1g Carts';
      if (dealId === 9) return '2 Disposable 3g Carts';
      if (dealId === 10) return '4 Disposable 3g Carts';
      return 'Disposable';
    default: return productType;
  }
};

export {
  deals,
  calculateOriginalPrice,
  findProductInDeal,
  isDealSelectionComplete,
  getInitialSelections,
  getProductLabel
};

export default deals;