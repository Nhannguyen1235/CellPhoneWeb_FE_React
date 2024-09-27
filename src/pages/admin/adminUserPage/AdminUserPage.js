import React from 'react'
import Header from '../../../ShopWeb/header/Header'
import SideBar from '../../../ShopWeb/admin/adminSidebar/AdminSidebar'
import UserManagement from '../../../ShopWeb/admin/adminUser/UserManagement'

export default function AdminUserPage() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Header />
      <div className='d-flex flex-fill'>
        <SideBar />
        <div className='flex-fill'>
          <UserManagement />
        </div>
      </div>
    </div>
  )
}
