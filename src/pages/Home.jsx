
import React from 'react'
import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid'
import products from '../data/products.json'

export default function Home() {
  return (
    <>
      <Hero />
      <section className="container-narrow my-5">
        <div className="row g-3">
          {[
            ['Flexible financing with Affirm','public/logo-affirm.png'],
            ['Fast shipping','public/fast.jpg'],
            ['12-month warranty','public/12meses.png'],
            ['Premium support','public/logo-suport.jpg'],
          ].map(([t,icon],i)=>(
            <div className="col-12 col-md-6 col-lg-3" key={i}>
              <div className="card-dark p-3 h-100 hover-raise d-flex flex-row gap-3 align-items-center">
                <img src={icon} width="28" height="28" alt="" />
                <div className="fw-semibold">{t}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <ProductGrid products={products} />
    </>
  )
}
