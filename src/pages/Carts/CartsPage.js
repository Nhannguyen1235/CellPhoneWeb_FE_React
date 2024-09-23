import React from 'react'
import './CartsPage.css'
import Header from '../../ShopWeb/header/Header'
import Footer from '../../ShopWeb/footer/Footer'
import Cart from '../../ShopWeb/cart/Cart'

export default function CartsPage() {
  return (
    <div className="d-flex flex-column min-vh-100">
        <Header/>
        <main className="flex-fill">
        <Cart/>
        </main>
        <Footer/>
    </div>
  )
}
