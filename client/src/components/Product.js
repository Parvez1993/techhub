import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listCategory } from "../redux/actions/categoryActions";
import Loader from "./Loader";
import Ratings from "./Ratings";
import "./styles/Product.css";
function Product({ product, tag, bg }) {
  const { _id, image, name, rating, numReviews, price, category } = product;
  const categoryList = useSelector((state) => state.category);

  const { category: cat, loading } = categoryList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);

  return (
    <>
      {" "}
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <div className="product-card">
            <div className="badge">{tag}</div>
            <div className="product-tumb" style={{ background: `${bg}` }}>
              <img src={image} alt="" />
            </div>
            <div className="product-details">
              {cat.map((i, id) =>
                i._id === category ? (
                  <div key={id}>
                    <span className="product-catagory">{i.name}</span>
                  </div>
                ) : (
                  ""
                )
              )}

              <Link to={`/products/${_id}`}>
                <h4>{name} </h4>
              </Link>

              <div className="product-bottom-details">
                <div className="product-price">
                  <small>${price}</small>
                </div>
              </div>
              <div className="product-links">
                <Ratings ratings={rating} numberOfRatings={numReviews} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Product;
