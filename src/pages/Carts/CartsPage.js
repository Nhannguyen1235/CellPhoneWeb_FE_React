import React from 'react'
import './CartsPage.css'
import Header from '../../ShopWeb/header/Header'
import Footer from '../../ShopWeb/footer/Footer'
import Cart from '../../ShopWeb/cart/Cart'
import { Container } from 'reactstrap'

export default function CartsPage() {
  return (
    <div className="d-flex flex-column min-vh-100">
        <Header/>
        <main className="flex-fill">
          <div className='title-cart'>
            <Container>
                <h1>Giỏ hàng</h1>
            </Container>
          </div>
          <Cart/>
        </main>
        <Footer/>
    </div>
  )
}
