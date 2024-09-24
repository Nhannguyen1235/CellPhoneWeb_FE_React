import React from 'react';
import './LoginPage.css';
import Header from '../../ShopWeb/header/Header';
import Footer from '../../ShopWeb/footer/Footer';
import Login from '../../ShopWeb/login/Login';

export default function LoginPage() {
    

    return (
       <div className='d-flex flex-column min-vh-100'>
        <Header />
        <div className='flex-fill'>
        <Login />
        </div>
        <div className='login-footer'>
        <Footer />
        </div>
       </div>
    );
}