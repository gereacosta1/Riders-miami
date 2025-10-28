
import React from 'react'
import { usd } from '../utils/currency'
import AffirmPromo from './AffirmPromo'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  return (
    <div className="card-dark p-3 hover-raise">
      <div className="ratio ratio-4x3 rounded" style={{background:'#0b0f14', overflow:'hidden'}}>
        <img src={product.image} alt={product.title} style={{objectFit:'cover'}} />
      </div>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          <div className="small text-white-50">{product.category}</div>
          <div className="fw-semibold">{product.title}</div>
        </div>
        {product.badge && <span className="rm-badge">{product.badge}</span>}
      </div>
      <div className="mt-2 d-flex flex-column gap-1">
        <div className="fw-bold">{usd(product.price)}</div>
        <AffirmPromo price={product.price} />
      </div>
      <div className="mt-3 d-flex gap-2">
        <button className="btn btn-accent flex-grow-1" onClick={() => addItem(product,1)}>Add to Cart</button>
        <a className="btn btn-outline-light" href="#details">View</a>
      </div>
    </div>
  )
}
