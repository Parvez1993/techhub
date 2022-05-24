import React, { useEffect, useState } from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import Product from "../components/Product.js";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productActions.js";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate.js";
import Categories from "../components/Categories.js";
import TopProducts from "../components/TopProducts.js";
import { getLandingProducts } from "../redux/actions/landingActions.js";
import "./styles/Homepages.css";

function Homepages() {
  const { keyword, pageNo } = useParams();

  let pageNumber = pageNo ? pageNo : 1;

  const dispatch = useDispatch();

  const landingProducts = useSelector((state) => state.landing);

  const { landing } = landingProducts;

  const productList = useSelector((state) => state.productList);

  const { loading, error, products, pages, page } = productList;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    dispatch(getLandingProducts());
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  if (loading) {
    return <h2>Loading</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      {landing.length > 1 && products ? (
        <Carousel fade activeIndex={index} onSelect={handleSelect}>
          {landing.map((item, key) => {
            return (
              <Carousel.Item>
                <img
                  className="d-block w-100 fluid"
                  style={{ height: "500px", width: "auto", objectFit: "cover" }}
                  src={item.image}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <div className="swiper_box">
                    <h1>{item.name}</h1>
                    <h4>{item.description}</h4>
                    <p>{item.subDescription}</p>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      ) : (
        ""
      )}

      <Container>
        <TopProducts />
        <Categories />
        <Row>
          {products &&
            products.map((item, k) => {
              return (
                <Col key={k} className="my-5" sm={12} md={6} lg={4} xl={3}>
                  <Product product={item} />
                </Col>
              );
            })}
        </Row>
        <Paginate
          pages={pages} //3
          page={pageNumber} //1
          keyword={keyword ? keyword : ""} //keyword
        />
      </Container>
    </>
  );
}

export default Homepages;
