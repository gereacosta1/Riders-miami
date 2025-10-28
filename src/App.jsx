
import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import CartDrawer from './components/CartDrawer'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Checkout from './pages/Checkout'
import OrderConfirmed from './pages/OrderConfirmed'
import NotFound from './pages/NotFound'
import { CartProvider } from './context/CartContext'
import Contact from './pages/Contact'
import Footer from './components/Footer';


function useRoute() {
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href]')
      if (a && a.getAttribute('href').startsWith('/')) {
        e.preventDefault()
        const to = a.getAttribute('href')
        window.history.pushState({}, '', to)
        setPath(to)
      }
    }
    const onPop = () => setPath(window.location.pathname)
    document.addEventListener('click', onClick)
    window.addEventListener('popstate', onPop)
    return () => { document.removeEventListener('click', onClick); window.removeEventListener('popstate', onPop) }
  }, [])
  return path
}

export default function App(){
  const path = useRoute()
  const [cartOpen, setCartOpen] = useState(false)

  let Page = Home
  if (path === '/catalog') Page = Catalog
  else if (path === '/checkout') Page = Checkout
  else if (path === '/order-confirmed') Page = OrderConfirmed
  else if (path === '/contact') Page = Contact
  else if (path !== '/' && path !== '/index.html') Page = NotFound

  return (
  <CartProvider>
    <Navbar onCartClick={() => setCartOpen(true)} />
    <main>
      <Page />
    </main>

    {/* ÚNICO footer */}
    <Footer />

    <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
  </CartProvider>
)

}
