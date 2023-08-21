import React from "react";
import "./adminLayout.css";
import { useNavigate } from "react-router";

const AdminProducts = (props) => {
  const navigate = useNavigate();
  const handleEditProduct = (id) => {
    navigate(`/Admin?branch=products/${id}`);
  };
  const handleRemovedProducts = (id) => {};

  const renderAdminProduct = (products) => {
    return products?.map((item) => {
      return (
        <tr>
          <td>{item.id}</td>
          <td>{item.productCode}</td>
          <td>{item.productName}</td>
          <td>{item.productBranch}</td>
          <td>{item.productCatalogue}</td>

          <td>
            <img
              src={item.productsImg[0]}
              alt=""
              className="img-fluid admin-img"
            />
          </td>
          <td>{item.oldProductPrice}</td>
          <td>{item.stock.totalQty}</td>
          <td>{item.stock.saledQty}</td>
          <td>{Number(item.stock.totalQty) - Number(item.stock.saledQty)}</td>
          <td>{item.productActive}</td>
          <td>
            <div className="d-flex">
              <button
                className="border-0 bg-transparent"
                onClick={() => handleEditProduct(item.id)}
              >
                <i class="bi bi-pencil-square text-success fs-7"></i>
              </button>
              <button className="border-0 bg-transparent fs-7">
                <i class="bi bi-trash text-danger"></i>
              </button>
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="col-md-10 my-2 p-0 ps-2 ">
      <button className="btn btn-primary">Add product</button>

      <div
        className=" overflow-x-scroll overflow-y-scroll border mt-2"
        style={{ maxHeight: 400, height: "100%" }}
      >
        <table
          className="table align-middle table-responsive-md   p-0"
          style={{ fontSize: 12 }}
        >
          <thead className=" align-middle bg-light">
            <tr>
              <th>ProductId</th>
              <th>ProductCode</th>
              <th>ProductName</th>
              <th>productBranch</th>
              <th>productCatalogue</th>

              <th>ProductImage</th>
              <th>ProductPrice</th>
              <th>Inbound Quantity</th>
              <th>Saled Quantity</th>
              <th>Available in stock</th>
              <th>Active</th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>{renderAdminProduct(props.products)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
