import React from "react";

const AdminSideBar = () => {
  return (
    <div className="container-fluid col-md-2 bg-success">
      <div className="mt-3 border-bottom">
        <button className="border-0 bg-transparent">DashBoard</button>
      </div>
      <div className="mt-3 border-bottom">
        <button className="border-0 bg-transparent">Products</button>
      </div>
      <div className="mt-3 border-bottom">
        <button className="border-0 bg-transparent">SaleStatus</button>
      </div>
      <div className="mt-3 border-bottom">
        <button className="border-0 bg-transparent">Banner</button>
      </div>
      <div className="mt-3 border-bottom">
        <button className="border-0 bg-transparent">Logos</button>
      </div>
      <div className="mt-3 border-bottom">
        <button className="border-0 bg-transparent">Guidance</button>
      </div>
      <div className="mt-3 border-bottom">
        <button className="border-0 bg-transparent">News</button>
      </div>
      <div className="mt-3 border-bottom">
        <button className="border-0 bg-transparent">Contact</button>
      </div>
    </div>
  );
};

export default AdminSideBar;
