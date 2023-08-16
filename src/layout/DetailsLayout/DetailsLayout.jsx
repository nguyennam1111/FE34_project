import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ShowsBestSale from "../../components/Product/ShowBestSale";
const DetailsLayout = () => {
  return (
    <div>
      <Header />
      <div className="row m-0">
        <div className="col-md-3" id="sideBar">
          <SideBar />
        </div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default DetailsLayout;
