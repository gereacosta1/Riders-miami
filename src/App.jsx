// src/App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Checkout from './pages/Checkout';
import OrderConfirmed from './pages/OrderConfirmed';
import NotFound from './pages/NotFound';
import { CartProvider } from './context/CartContext';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import FloatingCartButton from './components/FloatingCartButton';
import Solar from './pages/Solar';

function useRoute() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href]');
      if (!a) return;

      const href = a.getAttribute('href') || '';
      // Solo interceptamos rutas internas tipo "/algo"
      if (!href.startsWith('/')) return;

      // Evita interceptar archivos (por si linkean a /logo.png, etc.)
      const looksLikeFile = /\.[a-zA-Z0-9]+($|\?)/.test(href);
      if (looksLikeFile) return;

      e.preventDefault();
      window.history.pushState({}, '', href);
      setPath(window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const onPop = () => setPath(window.location.pathname);

    document.addEventListener('click', onClick);
    window.addEventListener('popstate', onPop);

    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('popstate', onPop);
    };
  }, []);

  return path;
}

export default function App() {
  const path = useRoute();
  const [cartOpen, setCartOpen] = useState(false);

  let Page = Home;
  if (path === '/catalog') Page = Catalog;
  else if (path === '/solar') Page = Solar;
  else if (path === '/checkout') Page = Checkout;
  else if (path === '/order-confirmed') Page = OrderConfirmed;
  else if (path === '/contact') Page = Contact;
  else if (path !== '/' && path !== '/index.html') Page = NotFound;

  return (
    <CartProvider>
      {/* Navbar sticky */}
      <Navbar onCartClick={() => setCartOpen(true)} />

      {/* Contenido principal */}
      <main>
        <Page />
      </main>

      {/* Footer único */}
      <Footer />

      {/* Drawer del carrito */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Botón flotante de carrito, siempre visible */}
      <FloatingCartButton onClick={() => setCartOpen(true)} />
    </CartProvider>
  );
}