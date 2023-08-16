import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actGetAllNews } from "../../redux/feature/News/newsSlice";
import { Link } from "react-router-dom";

const News = () => {
  const { news } = useSelector((state) => state.news);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actGetAllNews());
  }, []);
  const renderNews = () => {
    return news?.map((item) => {
      return (
        <div className="row border-bottom py-3">
          <div className="col-md-4">
            <img
              src={item.img}
              alt={item.header}
              className="img-fluid  py-auto"
            ></img>
          </div>
          <div className="col-md-8">
            <h5>
              <Link to={`/News?title=${item.header}`}> {item.header}</Link>
            </h5>
            <div className="d-flex bg-light">
              <div>
                <i className="bi bi-calendar-check mr-2"></i>
                {item.createdAt}
              </div>
              <div className="ml-3">
                <i className="bi bi-person-fill"></i> <span>team FE34</span>
              </div>
            </div>

            <p className="text-justify">{item.title}</p>
          </div>
        </div>
      );
    });
  };

  return <div className="col-md-9">{renderNews()}</div>;
};

export default News;
