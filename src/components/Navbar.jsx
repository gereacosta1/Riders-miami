import React from 'react'
import { useCart } from '../context/CartContext'
import './Navbar.css'

export default function Navbar({ onCartClick }) {
  const { totals } = useCart()

  return (
    <nav className="navbar-riders container-narrow d-flex align-items-center justify-content-between py-3">
      <a href="/" className="brand d-flex align-items-center gap-2">
        <img src="/logo-riders-chico.png" alt="Riders Miami" width="32" height="32" />
        <strong>Riders Miami</strong>
      </a>

      <div className="nav-links d-flex gap-4 align-items-center">
        <a href="/" className="nav-item">Home</a>
        <a href="/catalog" className="nav-item">Catalog</a>
        <a href="/contact" className="nav-item">Contact</a>

        <button
          className="btn btn-sm btn-outline-light position-relative cart-btn"
          onClick={onCartClick}
          aria-label="Open cart"
        >
          Cart
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">
            {totals.count}
          </span>
        </button>
      </div>
    </nav>
  )
}
