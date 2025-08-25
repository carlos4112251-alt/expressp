import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import './Shop.css';

function Shop() {
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get('category'); // Changed from 'filter' to 'category'
  
  // Set initial filter based on URL parameter or default to 'all'
  const [category, setCategory] = useState(urlCategory || 'all');

  const filteredProducts = category === 'all' 
    ? products 
    : products.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase());

  return (
    <div className="container">
      <div className="section">
        <h2 className="section-title">Our Products</h2>
        <div className="shop-filters">
          <button 
            className={category === 'all' ? 'active' : ''}
            onClick={() => setCategory('all')}
          >
            All Products
          </button>
          <button 
            className={category === 'flower' ? 'active' : ''}
            onClick={() => setCategory('flower')}
          >
            Flower
          </button>
          <button 
            className={category === 'cart' ? 'active' : ''}
            onClick={() => setCategory('cart')}
          >
            Cart
          </button>
          <button 
            className={category === 'disposable-cart' ? 'active' : ''}
            onClick={() => setCategory('disposable-cart')}
          >
            Disposable Cart
          </button>
          <button 
            className={category === 'edibles' ? 'active' : ''}
            onClick={() => setCategory('edibles')}
          >
            Edibles
          </button>
          <button 
            className={category === 'pre-rolls' ? 'active' : ''}
            onClick={() => setCategory('pre-rolls')}
          >
            Pre-rolls
          </button>
          <button 
            className={category === 'shake' ? 'active' : ''}
            onClick={() => setCategory('shake')}
          >
            Shake
          </button>
          <button 
            className={category === 'concentrates' ? 'active' : ''}
            onClick={() => setCategory('concentrates')}
          >
            Concentrates
          </button>
        </div>
      </div>
      
      <div className="product-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Shop;