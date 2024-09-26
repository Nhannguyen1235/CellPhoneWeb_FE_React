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

const SideBar = () => {
  return (
      <CDBSidebar className='sidebar'>
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>Contrast</CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <CDBSidebarMenuItem icon="th-large">Dashboard</CDBSidebarMenuItem>
            <CDBSidebarMenuItem as={Link} to="/admin/product" icon="sticky-note">Product Management</CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="sticky-note">Account Management</CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="sticky-note">Category Management</CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="sticky-note">Order Management</CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="sticky-note">Brand Management</CDBSidebarMenuItem>
            <CDBSidebarMenuItem as={Link} to="/admin/voucher" icon="sticky-note">Voucher Management</CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="sticky-note">Review Management</CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="sticky-note">Review Management</CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="sticky-note">Review Management</CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="credit-card" iconType="solid">
              Metrics
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem as={Link} to="/admin/user" icon="sticky-note">User Management</CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="sticky-note">test</CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="sticky-note">test</CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="sticky-note">test</CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{padding: '20px 5px',fontSize:'25px'}}
          >
           <CiLogout/> Logout
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
  );
};

export default SideBar;