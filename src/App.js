import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/Home/HomePage';
import store from './ShopWeb/redux/store';
import './style.css';
import ContactPage from './pages/Contact/ContactPage';
import ProductsPage from './pages/Products/ProductsPage';
import ProductDetailPage from './pages/ProductDetail/ProductDetailPage';
import CartsPage from './pages/Carts/CartsPage';
import CheckOutPage from './pages/CheckOut/CheckOutPage';
import LoginPage from './pages/Login/LoginPage';
import AdminHomePage from './pages/admin/adminHomePage/AdminHomePage';
import AdminVoucherPage from './pages/admin/adminVoucherPage/AdminVoucherPage';
import AdminProductPage from './pages/admin/adminProductPage/AdminProductPage';
import AdminRoute from './ShopWeb/ultil/AdminRoute';
import AdminUserPage from './pages/admin/adminUserPage/AdminUserPage';

import AdminCategoryPage from './pages/admin/adminCategoryPage/AdminCategoryPage';
export default function App() {
  return (
    <Provider store={store}>
      <HashRouter basename="/">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartsPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:category/:price/:search" element={<ProductsPage />} />
          <Route path="/products/:category/:price" element={<ProductsPage />} />
          <Route path="/checkouts/" element={<CheckOutPage />} />
          <Route path="/products/:category/" element={<ProductsPage />} />
          <Route path="/products/search/:search/" element={<ProductsPage />} />
          <Route path="/products/:price" element={<ProductsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<HomePage />} />

          {/* Routes admin */}
          <Route path="/admin" element={<AdminRoute><AdminHomePage /></AdminRoute>} />
          <Route path="/admin/product" element={<AdminRoute><AdminProductPage /></AdminRoute>} />
          <Route path="/admin/voucher" element={<AdminRoute><AdminVoucherPage /></AdminRoute>} />
          <Route path="/admin/user" element={<AdminRoute><AdminUserPage /></AdminRoute>} />
          <Route path="/admin/category" element={<AdminRoute><AdminCategoryPage /></AdminRoute>} />
        </Routes>
      </HashRouter>
    </Provider>
  );
}