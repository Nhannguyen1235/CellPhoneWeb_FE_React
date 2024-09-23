import React from 'react'
import Header from '../../ShopWeb/header/Header'
import Footer from '../../ShopWeb/footer/Footer'
import CheckoutPage from '../../ShopWeb/checkOut/CheckOuts'

export default function CheckOutPage() {
  return (
    <div className="d-flex flex-column min-vh-100">
        <Header/>
        <main className="flex-fill">
        <CheckoutPage/>
        </main>
        <Footer/>
    </div>
  )
}
