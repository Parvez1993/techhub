import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listCategory } from "../redux/actions/categoryActions";
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

  console.log(cat.find((i) => i._id === category));

  return (
    <>
      {" "}
      {loading ? (
        "loading"
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
  // <Card style={{ width: "18rem" }}>
  //   <Link to={`/products/${_id}`}>
  //     <Card.Img variant="top" src={image} />
  //   </Link>

  //   <Card.Body>
  //     <Card.Title>{name}</Card.Title>

  //     <Ratings ratings={rating} numberOfRatings={numReviews}></Ratings>
  //   </Card.Body>

  //   <Card.Body>
  //     <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>${price}</p>
  //   </Card.Body>
  // </Card>
}

export default Product;
