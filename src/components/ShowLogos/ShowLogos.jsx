import React from "react";

const ShowLogos = (props) => {
  const renderLogos = (data) => {
    return data?.map((item, index) => {
      return (
        <div key={index} className="col-md-6 p-0 py-4 border">
          <img
            src={item}
            alt="logo"
            className="img-fluid align-middle align-items-middle"
          ></img>
        </div>
      );
    });
  };
  return <div className="row text-center m-0">{renderLogos(props.data)}</div>;
};

export default ShowLogos;
