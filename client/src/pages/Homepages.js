import React, { useEffect, useState } from "react";
import { Button, Carousel, Col, Container, Image, Row } from "react-bootstrap";
import Product from "../components/Product.js";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productActions.js";
import { Link, useParams } from "react-router-dom";
import Categories from "../components/Categories.js";
import TopProducts from "../components/TopProducts.js";
import { getLandingProducts } from "../redux/actions/landingActions.js";
import "./styles/Homepages.css";
import { listCategory } from "../redux/actions/categoryActions.js";
import LatestSpeakers from "../components/LatestSpeakers.js";
import LatestHeadPhones from "../components/LatestHeadPhones.js";
import LatestPhones from "../components/LatestPhones.js";

function Homepages() {
  const { keyword, pageNo } = useParams();

  let pageNumber = pageNo ? pageNo : 1;

  const dispatch = useDispatch();

  const landingProducts = useSelector((state) => state.landing);
  let productCategory = useSelector((state) => state.category);

  const { category: cat, loading: catLoading } = productCategory;

  const { landing } = landingProducts;

  const productList = useSelector((state) => state.productList);

  const { loading, error, products, pages, page } = productList;

  //get latest speakers
  const latestphones = useSelector((state) => state.speakers);
  const { loading: phonesLoad, products: phones } = latestphones;

  const latestheadphones = useSelector((state) => state.headphones);
  const { loading: headphonesLoad, products: headphones } = latestheadphones;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    dispatch(getLandingProducts());
    dispatch(listCategory());
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
          {landing.map((item, keys) => {
            return (
              <Carousel.Item key={keys}>
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

      <TopProducts />
      <div>
        <Categories />
      </div>
      <Image
        src="https://i.pinimg.com/originals/57/48/de/5748de0245ef4f31d8bae0d0b95d227f.jpg"
        alt="speaker"
        className=" w-100  my-3"
      />
      <Container>
        <LatestSpeakers />
      </Container>

      <Image
        src="https://images.squarespace-cdn.com/content/v1/5936edf620099eda1a45cbdf/1496786888928-WR6B8L72LODW1WT217HA/Samsung+S8+Banner.jpg?format=2500w"
        alt="speaker"
        className=" w-100 my-5"
      />
      <Container>
        <LatestPhones />
      </Container>

      <Image
        src="https://www.wafiapps.com/media/catalog/category/Headphones_banner.jpeg"
        alt="speaker"
        className=" w-100 my-3"
      />
      <Container>
        <LatestHeadPhones />
      </Container>

      <div style={{ background: "#fefefe" }}>
        <Container>
          <div className="text_deco">
            <h2 data-text="Products">Products</h2>
          </div>
          <Row className="justify-content-between flex-wrap gap-x-2">
            {products &&
              products.slice(0, 3).map((item, k) => (
                <Col className="my-1" key={k} sm={12} md={6} lg={4} xl={3}>
                  <Product product={item} tag="Sneak Peak" bg="#d6fff7" />
                </Col>
              ))}
            <div className="d-flex justify-content-center my-4">
              <Link to="/products">
                <Button
                  size="lg"
                  style={{ background: "#D51616", color: "#fff" }}
                >
                  View All Products
                </Button>
              </Link>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Homepages;
