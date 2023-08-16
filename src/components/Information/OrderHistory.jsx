import useSelection from "antd/es/table/hooks/useSelection";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ROUTES } from "../../constants/routes";
import { NumericFormat } from "react-number-format";
import { PrinterOutlined } from "@ant-design/icons";

const OrderHistory = (props) => {
  const navigate = useNavigate();

  const orderHistory = props.orders?.filter(
    (item) => item.orderEmail === props.userProfile?.email
  );

  const checkMember = props.userAccounts?.findIndex(
    (item) => item?.email === props.userProfile.email
  );

  const renderOrderHistory = () => {
    return orderHistory.map((order) => {
      return (
        <table className="table table-stripped border table-responsive-md mt-3">
          <thead className="text-primary text-center mt-2 bg-body">
            <tr className="text-left">
              <th colSpan={8}>
                <h5 className="align-middle">
                  Đơn hàng:{order?.orderCode} ({order.totalItemQty} sản phẩm)
                  được tạo lúc: {order.orderAt}
                </h5>
              </th>
            </tr>
            <tr>
              <th className="align-middle">Mã sản phẩm</th>
              <th className="align-middle">Hình ảnh</th>
              <th className="align-middle">Sản phẩm</th>
              <th className="align-middle">Size và màu sắc</th>
              <th className="align-middle">Số lượng</th>
              <th className="align-middle">Đơn giá</th>
              <th className="align-middle">Thành tiền</th>
              <th className="align-middle">Mua hàng lúc</th>
            </tr>
          </thead>
          {order?.orderList.map((item) => {
            return (
              <tbody className="text-center">
                <tr className="p-0 align-middle">
                  <td className=" align-middle">{item.productCode}</td>
                  <td className="align-middle">
                    <img src={item.productImg} className=" img w-50 h-50"></img>
                  </td>

                  <td className="align-middle">{item.productName}</td>
                  <td className="align-middle">{item.sizeAndColor}</td>
                  <td className="align-middle">{item.productQty}</td>

                  <td className="align-middle">
                    <NumericFormat
                      value={item.productPrice}
                      displayType={"text"}
                      allowLeadingZeros
                      thousandSeparator={true}
                      suffix={"đ"}
                    />
                  </td>

                  <td className="align-middle">
                    <NumericFormat
                      value={item.productAmount}
                      displayType={"text"}
                      allowLeadingZeros
                      thousandSeparator={true}
                      suffix={"đ"}
                    />
                  </td>
                  <td className="align-middle">{item.createdAt}</td>
                </tr>
              </tbody>
            );
          })}

          <tfoot>
            <tr>
              <td className="align-middle">Tổng cộng</td>
              <td className="align-middle" colSpan={7}>
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
              <td className="align-middle">Hình thức vận chuyển</td>
              <td className="align-middle" colSpan={7}>
                {order?.shippingType}
              </td>
            </tr>
            <tr>
              <td className="align-middle">Phí ship</td>
              <td className="align-middle" colSpan={7}>
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
              <td className="align-middle">Địa chỉ nhận hàng</td>
              <td className="align-middle">{order?.address}</td>
              <td colSpan={2}> Tỉnh/Thành phố:{order?.province}</td>
              <td colSpan={2}> Quận/Huyện:{order?.district}</td>
              <td colSpan={2}> Phường/Xã:{order?.ward}</td>
            </tr>
          </tfoot>
        </table>
      );
    });
  };

  return (
    <div className="container-fluid m-0 p-3">
      <h4 className="text-title-normal">KidShop</h4>
      <div>
        <h5>
          Thông tin lịch sử mua hàng của{" "}
          <span className="text-primary">{props.userProfile.fullName}</span>
        </h5>
      </div>

      <div className="border">{renderOrderHistory()}</div>

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
          className=" btn btn-primary text-right ml-3"
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
