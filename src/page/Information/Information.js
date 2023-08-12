import React, { useEffect } from "react";
import OrderHistory from "../../components/Information/OrderHistory";
import { useDispatch, useSelector } from "react-redux";
import { actGetAllOrders } from "../../redux/feature/ordersRecord/ordersRecordSlice";
import { useParams, useSearchParams } from "react-router-dom";
import { actLogin } from "../../redux/feature/Authenticate/authSlice";
import { actFetchAllUserAccounts } from "../../redux/feature/UserAccount/userAccountSlice";
import Transportation from "../../components/Information/Transportation";
import { actfetchAllGuidance } from "../../redux/feature/guidance/guidanceSlice";
import OnlineShopping from "../../components/Information/OnlineShopping";

const Information = () => {
  const callBackUrl = window.location.pathname;

  localStorage.setItem("callBackUrl", JSON.stringify(callBackUrl));
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const { isAuth, userProfile } = useSelector((state) => state.auth);
  const { userAccounts } = useSelector((state) => state.userAccount);
  const [searchParams] = useSearchParams();
  const { guidance } = useSelector((state) => state.guidance);
  const branch = searchParams.get("branch");
  const currentUrl = window.location.pathname;
  localStorage.setItem("currentUrl", JSON.stringify(currentUrl));
  useEffect(() => {
    dispatch(actGetAllOrders());
    dispatch(actFetchAllUserAccounts());
    dispatch(actLogin());
    dispatch(actfetchAllGuidance());
  }, []);

  switch (branch) {
    case "history":
      return (
        <div className="col-sm-9 container-fluid m-0 py-3">
          <OrderHistory
            orders={orders}
            userProfile={userProfile}
            userAccounts={userAccounts}
            isAuth={isAuth}
          />
        </div>
      );
      break;
    case "transportationPolicy":
      return (
        <div className="col-sm-9 container-fluid m-0 py-3">
          <h4 className="text-title-normal">
            Chính sách vận chuyển của KidShop
          </h4>
          <Transportation data={guidance} />
        </div>
      );
    case "OnlineShopping":
      return (
        <div className="col-sm-9 container-fluid m-0 py-3">
          <h4 className="text-title-normal">Hướng dẫn mua hàng online</h4>
          <OnlineShopping data={guidance} />
        </div>
      );
  }
};

export default Information;
