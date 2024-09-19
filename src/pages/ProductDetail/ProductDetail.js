import React from 'react'
import Product from '../../ShopWeb/product/product'
import Header from '../../ShopWeb/header/Header'
import Footer from '../../ShopWeb/footer/Footer'
import ProductSlider from "../../ShopWeb/slider/ProductSlider";

export default function ProductDetail() {
  return (
    <div className="d-flex flex-column min-vh-100">
        <Header/>
        <main className="flex-fill">
        <Product/>
        </main>
        <section className='best-seller text-center pt-3'>
          <h1>Best Seller</h1>
        <ProductSlider/>
        </section>
        
        <Footer/>
    </div>
  )
}
