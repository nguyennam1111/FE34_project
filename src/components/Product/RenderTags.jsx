import React from "react";
import { useSelector } from "react-redux";

const RenderTags = (props) => {
  const renderTags = (data, id) => {
    if (id) {
      return <div>{data.tags?.join(", ")}</div>;
    } else {
      return data?.map((item) => {
        return <div>{item.tags?.join(", ")}</div>;
      });
    }
  };

  return <div>{renderTags(props.data, props.id)}</div>;
};

export default RenderTags;
