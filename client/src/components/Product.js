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
          <div class="product-card">
            <div class="badge">{tag}</div>
            <div class="product-tumb" style={{ background: `${bg}` }}>
              <img src={image} alt="" />
            </div>
            <div class="product-details">
              {cat.map((i, k) =>
                i._id === category ? (
                  <span key={k} class="product-catagory">
                    {i.name}
                  </span>
                ) : (
                  ""
                )
              )}

              <Link to={`/products/${_id}`}>
                <h4>{name} </h4>
              </Link>

              <div class="product-bottom-details">
                <div class="product-price">
                  <small>${price}</small>
                </div>
              </div>
              <div class="product-links">
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
