import React from "react";
import "./styleNewProduct.css";
import RenderProducts from "../Product/RenderProducts";
import { Link, useSearchParams } from "react-router-dom";
const ShowNewProducts = (props) => {
  const [searchParams] = useSearchParams();

  const catalogue = searchParams.get("catalogue");
  const renderNewProducts = (data, classCol) => {
    return (
      <div>
        <div className="row align-items-center m-0 mt-3">
          <div className="col-md-6 p-0 ">
            <h5 className="text-left m-0 text-highlight new-product-catalog">
              HÀNG MỚI VỀ !
            </h5>
          </div>
          <ul className="col-md-6 nav justify-content-md-end block-list new-product-catalog">
            <li className="nav-item">
              <Link
                to={"/Home?catalogue=boy&status=new"}
                className="nav-link active"
              >
                Bé Trai
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/Home?catalogue=girl&status=new"} className="nav-link">
                Bé Gái
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/Home?catalogue=accessory&status=new"}
                className="nav-link "
              >
                Phụ kiện
              </Link>
            </li>
          </ul>
        </div>
        <div className="row border  m-0">
          <RenderProducts
            data={data}
            classCol={classCol}
            handleProductDetails={props.handleProductDetails}
          />
        </div>
      </div>
    );
  };
  return <>{renderNewProducts(props.data, props.classCol)}</>;
};

export default ShowNewProducts;
