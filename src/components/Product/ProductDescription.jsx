import React from "react";
import { Tabs, TabPanel, TabList, Tab } from "react-tabs";

const ProductDescription = (props) => {
  const renderProductDetails = (productDetails, data) => {
    return data.map((item) => {
      return (
        <React.Fragment>
          <TabPanel
            style={{ textAlign: "justify", height: 300, overflowY: "scroll" }}
          >
            <div className="border p-4" style={{ textAlign: "justify" }}>
              <p>{productDetails?.productDescription?.title}</p>
              <br></br>

              {productDetails?.productDescription?.contents?.map((ele) => {
                return <p>{ele}</p>;
              })}
            </div>
          </TabPanel>
          <TabPanel
            key={item.id && item.title}
            style={{ textAlign: "justify", height: 300, overflowY: "scroll" }}
          >
            <div className="border p-4">
              <div>
                <h5>{item?.onlineShopping?.content}</h5>
                {item?.onlineShopping?.description?.map((ele) => {
                  return <p>{ele}</p>;
                })}
              </div>
            </div>
          </TabPanel>
          <TabPanel
            style={{ textAlign: "justify", height: 300, overflowY: "scroll" }}
          >
            <div className="border p-4">
              <h5>{item?.transportation?.content}</h5>
              {item?.transportation?.description.map((ele) => {
                return <p>{ele}</p>;
              })}
            </div>
          </TabPanel>
        </React.Fragment>
      );
    });
  };
  return (
    <Tabs selectedTabClassName="bg-content">
      <TabList
        style={{ backgroundColor: "#EBEBEB" }}
        className={"border d-table-row p-0 "}
      >
        <Tab>Thông tin sản phẩm</Tab>
        <Tab>Hướng dẫn mua hàng</Tab>
        <Tab>Chính sách vận chuyển</Tab>
      </TabList>
      {renderProductDetails(props.productDetails, props.data)}
    </Tabs>
  );
};

export default ProductDescription;
