import React from 'react'
import Header from '../../../ShopWeb/header/Header'
import SideBar from '../../../ShopWeb/admin/adminSidebar/AdminSidebar'
import CategoryManagement from '../../../ShopWeb/admin/adminCategory/CategoryManagement'

export default function AdminCategoryPage() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Header />
      <div className='d-flex flex-fill'>
        <SideBar />
        <div className='flex-fill'>
          <CategoryManagement />
        </div>
      </div>
    </div>
  )
}
