import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import Product from "../components/Product";
import SearchBar from "../components/SearchBar";
import { listProducts } from "../redux/actions/productActions";

function ProductPage() {
  const { keyword, pageNo } = useParams();

  let pageNumber = pageNo ? pageNo : 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
      <Container>
        <div className="my-5">
          <SearchBar />
        </div>

        <Row>
          <Col lg={12}></Col>
          <Col lg={12}>
            {" "}
            <div className="text_deco">
              <h2 data-text="Products">Products</h2>
            </div>
            <Row className="justify-content-around flex-wrap gap-1">
              {products &&
                products.map((item, k) => {
                  return (
                    <Col key={k} className="my-1" sm={12} md={6} lg={3} xl={3}>
                      <Product product={item} />
                    </Col>
                  );
                })}
              <Paginate
                pages={pages} //3
                page={pageNumber} //1
                keyword={keyword ? keyword : ""} //keyword
              />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductPage;
