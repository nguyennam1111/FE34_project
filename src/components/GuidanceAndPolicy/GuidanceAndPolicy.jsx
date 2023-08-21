import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
const GuidanceAndPolicy = (props) => {
  const renderGuidanceAndPolicy = (data) => {
    return data.map((item) => {
      return (
        <div key={item.id && item.index} className="guidance">
          <h2 className="pt-3 mx-5">Chính sách & hướng dẫn của kidshop !</h2>
          <div className="row mx-5 ">
            <div className="col-md-6 my-3">
              <div className="d-flex">
                <div>1.</div>
                <div>
                  <h5>
                    <Link className="text-white bg-transparent text-decoration-none">
                      {item.policy.title}
                    </Link>
                  </h5>
                  <p>{item.policy.content}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 my-3">
              <div className="d-flex">
                <div>2.</div>
                <div>
                  <h5>
                    <Link
                      to={"/Information?branch=OnlineShopping"}
                      className="text-white bg-transparent text-decoration-none"
                    >
                      {item.onlineShopping.title}
                    </Link>
                  </h5>
                  <p>{item.onlineShopping.content}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 my-3">
              <div className="d-flex">
                <div>3.</div>
                <div>
                  <h5>
                    <a
                      href="#"
                      className="text-white bg-transparent text-decoration-none"
                    >
                      {item.exchange.title}
                    </a>
                  </h5>
                  <p>{item.exchange.content}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 my-3">
              <div className="d-flex">
                <div className="px-2">4.</div>
                <div>
                  <h5>
                    <a
                      href="#"
                      className="text-white bg-transparent text-decoration-none"
                    >
                      {item.giftPrizePromote.title}
                    </a>
                  </h5>
                  <p>{item.giftPrizePromote.content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return <>{renderGuidanceAndPolicy(props.data)}</>;
};

export default GuidanceAndPolicy;
