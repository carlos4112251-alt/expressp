import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AgeGate from './components/AgeGate';
import Wishlist from './components/Wishlist';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Specials from './pages/Specials';
import Delivery from './pages/Delivery';
import Contact from './pages/Contact';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import FAQ from './components/FAQ';
import './App.css';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <div className="app">
            <AgeGate />
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/specials" element={<Specials />} />

                <Route path="/delivery" element={<Delivery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/faqs" element={<FAQ />} />
                
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;