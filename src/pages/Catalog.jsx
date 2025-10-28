
import React from 'react'
import products from '../data/products.json'
import ProductGrid from '../components/ProductGrid'

export default function Catalog() {
  return (
    <>
      <section className="container-narrow my-4">
        <h1>Catalog</h1>
        <p className="text-white-50">Explore motorcycles, electric rides, wheels & speakers.</p>
      </section>
      <ProductGrid products={products} />
    </>
  )
}
