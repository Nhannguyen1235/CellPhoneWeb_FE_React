import React from 'react'
import Header from '../../../ShopWeb/header/Header'
import SideBar from '../../../ShopWeb/admin/adminSidebar/AdminSidebar'
import "./AdminHomePage.css"
import ProductManagement from '../../../ShopWeb/admin/adminProducts/ProductManagement'

export default function AdminHomePage() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Header />
      <div className='d-flex flex-fill'>
        <SideBar />
        <div className='flex-fill'>
          <ProductManagement />
        </div>
      </div>
    </div>
  )
}
