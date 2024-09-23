import React from 'react';
import './LoginPage.css';
import Header from '../../ShopWeb/header/Header';
import Footer from '../../ShopWeb/footer/Footer';
import Login from '../../ShopWeb/login/Login';

export default function LoginPage() {
    

    return (
       <div>
        <Header />
        <Login />
        <div className='login-footer'>
        <Footer />
        </div>
       </div>
    );
}