import React from "react";

import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const PaymentLayout = () => {
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <Outlet />;
      </div>
      <Footer />
    </div>
  );
};

export default PaymentLayout;
