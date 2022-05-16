import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Product from "../components/Product.js";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productActions.js";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate.js";
function Homepages() {
  const { keyword, pageNo } = useParams();

  let pageNumber = pageNo ? pageNo : 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  if (loading) {
    return <h2>Loading</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <>
      <Container>
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
