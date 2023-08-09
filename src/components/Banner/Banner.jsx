import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router";
const Banner = (props) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState();
  const showBanners = (data) => {
    return (
      <div>
        <Carousel
          useKeyboardArrows={true}
          autoPlay={true}
          showThumbs={false}
          infiniteLoop={true}
          interval={2000}
        >
          {data.map((each, index) => (
            <img
              src={each}
              key={index}
              alt={`banner ${index}`}
              className="img-fluid"
              style={{ maxHeight: 300, height: "100%" }}
            />
          ))}
        </Carousel>
      </div>
    );
  };
  return <>{showBanners(props.data)}</>;
};

export default Banner;
