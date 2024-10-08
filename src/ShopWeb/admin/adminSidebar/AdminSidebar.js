import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from 'cdbreact';
import { CiLogout } from "react-icons/ci";
import "./AdminSidebar.css"
import { Link } from 'react-router-dom';
import { useLogout } from '../../redux/Logout';

const SideBar = () => {
  const handleLogout = useLogout();
  return (
      <CDBSidebar className='sidebar'>
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>Contrast</CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <CDBSidebarMenuItem icon="th-large">Dashboard</CDBSidebarMenuItem>
            <CDBSidebarMenuItem as={Link} to="/admin/product" icon="sticky-note">Product Management</CDBSidebarMenuItem>
            <CDBSidebarMenuItem as={Link} to="/admin/category" icon="sticky-note">Category Management</CDBSidebarMenuItem>
            <CDBSidebarMenuItem as={Link} to="/admin/voucher" icon="sticky-note">Voucher Management</CDBSidebarMenuItem>
            <CDBSidebarMenuItem as={Link} to="/admin/user" icon="sticky-note">User Management</CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{padding: '20px 5px', fontSize:'25px', cursor: 'pointer'}}
          onClick={handleLogout}
        >
          <CiLogout/> Logout
        </div>
        </CDBSidebarFooter>
      </CDBSidebar>
  );
};

export default SideBar;