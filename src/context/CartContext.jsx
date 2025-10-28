
import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'

const CartContext = createContext(null)
const KEY = 'ridersmiami_cart_v1'

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items))
  }, [items])

  const addItem = (product, qty = 1) => {
    setItems(prev => {
      const found = prev.find(p => p.id === product.id)
      if (found) {
        return prev.map(p => p.id === product.id ? { ...p, qty: Math.max(1, p.qty + qty) } : p)
      }
      return [...prev, { ...product, qty: Math.max(1, qty) }]
    })
  }
  const removeItem = (id) => setItems(prev => prev.filter(p => p.id !== id))
  const updateQty = (id, qty) => setItems(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(1, qty) } : p))
  const clearCart = () => setItems([])

  const totals = useMemo(() => {
    const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0)
    return { count: items.reduce((a,i)=>a+i.qty,0), subtotal, tax: 0, total: subtotal }
  }, [items])

  const value = { items, addItem, removeItem, updateQty, clearCart, totals }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
