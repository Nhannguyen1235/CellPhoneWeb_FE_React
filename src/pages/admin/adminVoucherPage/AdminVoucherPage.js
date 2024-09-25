import React from 'react'
import Header from '../../../ShopWeb/header/Header'
import SideBar from '../../../ShopWeb/admin/adminSidebar/AdminSidebar'
import VoucherManagement from '../../../ShopWeb/admin/adminVoucher/VoucherManagement'

export default function AdminVoucherPage() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Header />
      <div className='d-flex flex-fill'>
        <SideBar />
        <div className='flex-fill'>
          <VoucherManagement />
        </div>
      </div>
    </div>
  )
}
