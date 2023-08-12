import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actGetContact } from "../../redux/feature/Contact/contactSlice";

const ContactUs = () => {
  const callBackUrl = window.location.pathname;

  localStorage.setItem("callBackUrl", JSON.stringify(callBackUrl));
  const dispatch = useDispatch();
  const { contact } = useSelector((state) => state.contact);
  useEffect(() => {
    dispatch(actGetContact());
  }, []);

  const renderContactInformation = () => {
    return contact?.map((item) => {
      return (
        <ul className="text-decoration-none">
          <li>
            Hotline: <a>{item.hotline}</a>
          </li>
          <li>
            Zalo: <a>{item.zalo}</a>
          </li>
          <li>
            Facebook: <a href={item.facebook}>{item.facebook}</a>
          </li>
        </ul>
      );
    });
  };
  return (
    <div className="col-sm-9 container text-left mt-3">
      <h3 className="h3 text-success">Contact Us</h3>
      <h5 className="text-warning">Please contact us following:</h5>
      {renderContactInformation()}
    </div>
  );
};

export default ContactUs;
