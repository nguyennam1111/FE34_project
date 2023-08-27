import useSelection from "antd/es/table/hooks/useSelection";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { ROUTES } from "../../constants/routes";
import { NumericFormat } from "react-number-format";
import { PrinterOutlined } from "@ant-design/icons";
import { Pagination } from "antd";

import { useEffect } from "react";
import {
  actGetAllOrders,
  setPage,
} from "../../redux/feature/ordersRecord/ordersRecordSlice";

const OrderHistory = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, pagination } = useSelector((state) => state.orders);
  const { isAuth, userProfile } = useSelector((state) => state.auth);

  const handleChangePage = (newPage) => {
    dispatch(setPage(newPage));
  };
  useEffect(() => {
    dispatch(
      actGetAllOrders({
        _page: pagination.currentPage,
        _limit: pagination.pageSize,
        orderEmail: userProfile.email,
      })
    );
    handleChangePage(pagination.currentPage);
  }, [userProfile.email, pagination.currentPage]);

  const renderOrderHistory = () => {
    return orders?.map((order) => {
      return (
        <table className="table table-stripped border table-responsive-md mt-3 align-middle">
          <thead className="text-primary mt-2 ">
            <tr className="text-left table-primary">
              <th colSpan={8}>
                <h5 className="m-0">
                  {" "}
                  Đơn hàng:{order?.orderCode} ({order.totalItemQty} sản phẩm)
                  được tạo lúc: {order.orderAt}
                </h5>
              </th>
            </tr>
            <tr>
              <th>Mã sản phẩm</th>
              <th>Hình ảnh</th>
              <th>Sản phẩm</th>
              <th>Size và màu sắc</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
              <th>Mua hàng lúc</th>
            </tr>
          </thead>
          {order?.orderList?.map((item) => {
            return (
              <tbody className="text-center">
                <tr className="p-0">
                  <td>{item.productCode}</td>
                  <td>
                    <img
                      src={item.productImg}
                      className="img-fluid order-summary-img"
                    ></img>
                  </td>

                  <td>{item.productName}</td>
                  <td>{item.sizeAndColor}</td>
                  <td>{item.productQty}</td>

                  <td>
                    <NumericFormat
                      value={item.productPrice}
                      displayType={"text"}
                      allowLeadingZeros
                      thousandSeparator={true}
                      suffix={"đ"}
                    />
                  </td>

                  <td>
                    <NumericFormat
                      value={item.productAmount}
                      displayType={"text"}
                      allowLeadingZeros
                      thousandSeparator={true}
                      suffix={"đ"}
                    />
                  </td>
                  <td>{item.createdAt}</td>
                </tr>
              </tbody>
            );
          })}

          <tfoot>
            <tr>
              <td>Tổng tiền hàng</td>
              <td colSpan={7}>
                <NumericFormat
                  value={order?.totalAmount}
                  displayType={"text"}
                  allowLeadingZeros
                  thousandSeparator={true}
                  suffix={"đ"}
                />
              </td>
            </tr>
            <tr>
              <td>Hình thức vận chuyển</td>
              <td colSpan={7}>{order?.shippingType}</td>
            </tr>
            <tr>
              <td>Phí ship</td>
              <td colSpan={7}>
                <NumericFormat
                  value={order?.shippingFee}
                  displayType={"text"}
                  allowLeadingZeros
                  thousandSeparator={true}
                  suffix={"đ"}
                />
              </td>
            </tr>
            <tr>
              <td>Tổng tiền thanh toán</td>
              <td colSpan={7}>
                <NumericFormat
                  value={
                    Number(order?.shippingFee) + Number(order?.totalAmount)
                  }
                  displayType={"text"}
                  allowLeadingZeros
                  thousandSeparator={true}
                  suffix={"đ"}
                />
              </td>
            </tr>
            <tr>
              <td>Địa chỉ nhận hàng</td>
              <td>{order?.address}</td>
              <td colSpan={2}> Tỉnh/Thành phố:{order?.provinceName}</td>
              <td colSpan={2}> Quận/Huyện:{order?.districtName}</td>
              <td colSpan={2}> Phường/Xã:{order?.ward}</td>
            </tr>
          </tfoot>
        </table>
      );
    });
  };

  return orders?.length === 0 ? (
    <>
      {" "}
      <p className="p-3">Không có lịch sử mua hàng</p>
      <button
        className=" btn btn-primary text-right ms-3"
        type="button"
        onClick={() => navigate(ROUTES.HOME)}
      >
        Quay về
      </button>
    </>
  ) : (
    <div className="container-fluid m-0 p-3">
      <h4 className="text-title-normal">KidShop</h4>
      <div>
        <h5>
          Thông tin lịch sử mua hàng của{" "}
          <span className="text-primary">{userProfile.fullName}.</span>
          <span>Tổng {pagination.totalOrders} đơn hàng đã mua</span>
        </h5>
      </div>

      <div className="border">
        <div className="border overflow-x-scroll">{renderOrderHistory()}</div>
        <Pagination
          className="text-center"
          onChange={(page) => {
            handleChangePage(page);
          }}
          pageSize={pagination.pageSize}
          total={pagination.totalOrders}
        ></Pagination>
      </div>
      <div className="mt-3 text-center">
        <button
          style={{ color: "#2A9DCC", fontSize: 20 }}
          className="border-0 bg-transparent"
          onClick={() => window.print()}
        >
          {" "}
          <PrinterOutlined /> In
        </button>
        <button
          className=" btn btn-primary text-right ms-3"
          type="button"
          onClick={() => navigate(ROUTES.HOME)}
        >
          Quay về
        </button>
      </div>
    </div>
  );
};

export default OrderHistory;
