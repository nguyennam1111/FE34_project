import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import SignLayout from "./layout/SignLayout/SignLayout";
import { ROUTES } from "./constants/routes";
import Home from "./page/Home/Home";
import SignUp from "./page/SignUp/SignUp";
import SignIn from "./page/SignIn/SignIn";
import DetailsLayout from "./layout/DetailsLayout/DetailsLayout";
import Introduce from "./page/Introduce/Introduce";
import Services from "./page/Services/Services";
import News from "./page/News/News";
import HomeLayout from "./layout/HomeLayout/HomeLayout";
import Products from "./page/Products/Products";
import ContactUs from "./page/ContactUs/ContactUs";
import Cart from "./page/Cart/Cart";
import ProductDetails from "./page/ProductDetails/ProductDetails";
import Payment from "./page/Payment/Payment";
import PaymentLayout from "./layout/PaymentLayout/PaymentLayout";
import Information from "./page/Information/Information";
function App() {
  return (
    <div className="App container-fluid p-0">
      <BrowserRouter>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path={ROUTES.HOME} element={<Home />}></Route>
            <Route path={ROUTES.CART} element={<Cart />}></Route>
            <Route path={ROUTES.SIGNIN} element={<SignIn />}></Route>
            <Route path={ROUTES.SIGNUP} element={<SignUp />}></Route>
            <Route path={ROUTES.USERACCOUNTDETAIL} element={<SignUp />}></Route>

            <Route
              path={ROUTES.PRODUCT_DETAILS}
              element={<ProductDetails />}
            ></Route>
          </Route>
          <Route path="/" element={<Navigate to={ROUTES.HOME} />} />
        </Routes>

        {/* <Routes>
          <Route element={<SignLayout />}>
            <Route path={ROUTES.SIGNIN} element={<SignIn />}></Route>
            <Route path={ROUTES.SIGNUP} element={<SignUp />}></Route>
            <Route path={ROUTES.INFORMATION} element={<Information />}></Route>
          </Route>
          <Route path="/" element={<Navigate to={ROUTES.HOME} />} />
        </Routes> */}

        <Routes>
          <Route element={<PaymentLayout />}>
            <Route path={ROUTES.PAYMENT} element={<Payment />}></Route>
            <Route path={ROUTES.ORDERHISTORY} element={<Payment />}></Route>
          </Route>

          <Route path="/" element={<Navigate to={ROUTES.HOME} />} />
        </Routes>
        <Routes>
          <Route element={<DetailsLayout />}>
            <Route path={ROUTES.PRODUCTS} element={<Products />}></Route>
            <Route path={ROUTES.INTRODUCE} element={<Introduce />}></Route>
            <Route path={ROUTES.SERVICES} element={<Services />}></Route>
            <Route path={ROUTES.NEWS} element={<News />}></Route>
            <Route path={ROUTES.CONTACTUS} element={<ContactUs />}></Route>
            <Route path={ROUTES.INFORMATION} element={<Information />}></Route>
          </Route>
          <Route path="/" element={<Navigate to={ROUTES.HOME} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
