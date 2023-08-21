import React from "react";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router";
import Footer from "../../components/Footer/Footer";
import AdminSideBar from "../../components/Admin/AdminSideBar";

const AdminLayout = () => {
  return (
    <div>
      <Header />
      <div className="row m-0 container-fluid">
        <AdminSideBar />

        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
