import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const GuidanceAndPolicy = (props) => {
  const renderGuidanceAndPolicy = (data) => {
    return data.map((item) => {
      return (
        <div key={item.id && item.index} className="guidance mt-3">
          <h2 className="pt-3 mx-5">Chính sách & hướng dẫn của kidshop !</h2>
          <div className="row mx-5 ">
            <div className="col-sm-6 my-3">
              <div className="d-flex">
                <div>1.</div>
                <div>
                  <h5>
                    <a href="#" className="text-white bg-transparent">
                      {item.policy.title}
                    </a>
                  </h5>
                  <p>{item.policy.content}</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 my-3">
              <div className="d-flex">
                <div>2.</div>
                <div>
                  <h5>
                    <a href="#" className="text-white bg-transparent">
                      {item.onlineShopping.title}
                    </a>
                  </h5>
                  <p>{item.onlineShopping.content}</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 my-3">
              <div className="d-flex">
                <div>3.</div>
                <div>
                  <h5>
                    <a href="#" className="text-white bg-transparent">
                      {item.exchange.title}
                    </a>
                  </h5>
                  <p>{item.exchange.content}</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 my-3">
              <div className="d-flex">
                <div className="px-2">4.</div>
                <div>
                  <h5>
                    <a href="#" className="text-white bg-transparent">
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
